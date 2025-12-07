import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Loader2, MapPin } from "lucide-react";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";

export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface LocationSearchProps {
    onSelect: (location: Location) => void;
    placeholder?: string;
    label?: string;
    className?: string;
}

export function LocationSearch({ onSelect, placeholder = "Search location...", label, className }: LocationSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // I'll implement a simple debounce here to be safe if hooks/useDebounce doesn't exist or verify it first.
    // Let's check hooks first in a separate 'ls' but for now I'll use standard useEffect timeout
    
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await api.get(`/rides_apis/locations/search/?q=${encodeURIComponent(query)}`);
                if (Array.isArray(response.data)) {
                    setResults(response.data);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error("Error searching locations:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Close results when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (location: Location) => {
        setQuery(location.name);
        setShowResults(false);
        onSelect(location);
    };

    return (
        <div ref={wrapperRef} className={cn("relative", className)}>
            {label && <label className="text-sm font-medium mb-1.5 block text-gray-700">{label}</label>}
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder={placeholder}
                    className="pl-9"
                />
                {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    </div>
                )}
            </div>

            {showResults && results.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white rounded-md border border-gray-200 shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1">
                        {results.map((location) => (
                            <li 
                                key={location.id}
                                onClick={() => handleSelect(location)}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-sm text-gray-700"
                            >
                                <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                <span>{location.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Simple utility for merging classnames if it doesn't exist in lib/utils
// But I saw there are UI components so it likely exists.
