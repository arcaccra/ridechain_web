import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'error' | 'success' | 'info';

interface FloatingToastProps {
    message: string | null;
    type?: ToastType;
    isVisible: boolean;
    onClose?: () => void;
    duration?: number;
}

export function FloatingToast({ 
    message, 
    type = 'info', 
    isVisible, 
    onClose, 
    duration = 5000 
}: FloatingToastProps) {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
        
        if (isVisible && duration > 0 && onClose) {
            const timer = setTimeout(() => {
                setShow(false);
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!show || !message) return null;

    const icons = {
        error: <AlertCircle className="w-4 h-4 text-white" />,
        success: <CheckCircle className="w-4 h-4 text-white" />,
        info: <Info className="w-4 h-4 text-white" />
    };

    // Using the style requested: rounded full, backdrop blur, shadow, top-center
    // Adapting colors based on type, but keeping the "pill" shape
    
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div 
                className={cn(
                    "px-6 py-3 rounded-full shadow-lg border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 transition-all duration-300",
                    type === 'error' ? "bg-red-500/90 text-white border-red-600" :
                    type === 'success' ? "bg-green-500/90 text-white border-green-600" :
                    "bg-white/90 text-foreground border-border backdrop-blur"
                )}
            >
                {type !== 'info' ? icons[type] : (
                    <div className={cn("w-2 h-2 rounded-full", type === 'info' ? "bg-red-500" : "bg-white")} />
                )}
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
}
