import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, DollarSign } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FloatingToast } from '@/components/ui/floating-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ActiveRideCard } from '@/components/Ride/ActiveRideCard';
import { RateRideModal } from '@/components/Ride/RateRideModal';
import type { IRide, ILocation } from '@/interfaces/User';
import type { IRating } from '@/interfaces/Rating';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Star } from 'lucide-react';

// Custom Icons
const pickupIcon = L.divIcon({
    className: '',
    html: `<div class="relative w-10 h-10 transition-transform hover:scale-110">
             <img src="/car.png" alt="Ride" class="w-full h-full object-contain drop-shadow-xl" />
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
});

const userLocationIcon = L.divIcon({
    className: '',
    html: `<div class="relative flex items-center justify-center w-6 h-6">
             <div class="absolute w-full h-full bg-blue-500/30 rounded-full animate-ping"></div>
             <div class="relative w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-md"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

// Helper to safely get location name
const getLocationName = (loc: number | ILocation | undefined) => {
    if (!loc) return 'Unknown';
    if (typeof loc === 'object' && 'name' in loc) return loc.name;
    return `Location ID: ${loc}`;
};

const getLocationCoords = (loc: number | ILocation | undefined): [number, number] | null => {
    if (typeof loc === 'object' && 'latitude' in loc && 'longitude' in loc) {
        return [loc.latitude, loc.longitude];
    }
    return null;
};

// Component to update map view when rides change
function MapUpdater({ rides }: { rides: IRide[] }) {
    const map = useMap();
    
    useEffect(() => {
        if (rides.length > 0) {
            const bounds = L.latLngBounds([]);
            let hasValidLoc = false;
            
            rides.forEach(ride => {
                const pickup = getLocationCoords(ride.pick_up);
                if (pickup) {
                    bounds.extend(pickup);
                    hasValidLoc = true;
                }
            });

            if (hasValidLoc) {
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
            }
        }
    }, [rides, map]);

    return null;
}

// Component to fly to user location
function UserLocationUpdater({ location }: { location: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (location) {
            map.flyTo(location, 15, { duration: 2 });
        }
    }, [location, map]);
    return null;
}

export default function RideSearch() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [pickupQuery, setPickupQuery] = useState('');
    const [dropoffQuery, setDropoffQuery] = useState('');
    const [pickupLocation, setPickupLocation] = useState<ILocation | null>(null);
    const [dropoffLocation, setDropoffLocation] = useState<ILocation | null>(null);
    
    const [pickupSuggestions, setPickupSuggestions] = useState<ILocation[]>([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState<ILocation[]>([]);
    
    const [rides, setRides] = useState<IRide[]>([]);
    const [activeUserRides, setActiveUserRides] = useState<IRide[]>([]);
    const [unratedRide, setUnratedRide] = useState<IRide | null>(null);
    const [ratingRide, setRatingRide] = useState<IRide | null>(null); // For the modal
    const [showUnratedPrompt, setShowUnratedPrompt] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    // Default center (Accra)
    const defaultCenter: [number, number] = [5.6037, -0.1870];

    // Fetch user location on mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, []);

    // Fetch user's active rides
    // Fetch user rides and ratings to check for unrated completed rides
    useEffect(() => {
        const checkUnratedRides = async () => {
            if (!user?.id) return;
            try {
                // 1. Fetch User Rides
                const ridesResponse = await api.get(`/accounts/users/${user.id}/`);
                let allRides: IRide[] = [];
                if (ridesResponse.data.user_rides) {
                    allRides = ridesResponse.data.user_rides;
                    
                    // Filter for Active Rides
                    const active = allRides.filter((ride: IRide) => {
                        const status = ride.status.toLowerCase();
                        return status === 'requested' || status === 'in progress' || status === 'in_progress';
                    }).sort((a: IRide, b: IRide) => {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    });
                    setActiveUserRides(active.length > 0 ? [active[0]] : []);
                }

                // 2. Fetch User Ratings
                const ratingsResponse = await api.get('/book_rate_apis/ratings/');
                let ratingsData: IRating[] = [];
                if (Array.isArray(ratingsResponse.data)) {
                    ratingsData = ratingsResponse.data;
                } else if (ratingsResponse.data && Array.isArray(ratingsResponse.data.results)) {
                    ratingsData = ratingsResponse.data.results;
                }
                const ratedRideIds = new Set(ratingsData.map(r => r.ride));

                // 3. Find Latest Unrated Completed Ride
                // Filter for completed rides that are NOT in ratedRideIds
                const unrated = allRides.filter(ride => 
                    ride.status.toLowerCase() === 'completed' && 
                    !ratedRideIds.has(ride.uuid)
                ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                if (unrated.length > 0) {
                    setUnratedRide(unrated[0]);
                    setShowUnratedPrompt(true);
                } else {
                    setUnratedRide(null);
                    setShowUnratedPrompt(false);
                }

            } catch (error) {
                console.error('Error checking unrated rides:', error);
            }
        };

        checkUnratedRides();
        // Poll for updates every 30 seconds
        const interval = setInterval(checkUnratedRides, 30000);
        return () => clearInterval(interval);
    }, [user?.id]);

    // Debounce search for locations
    useEffect(() => {
        const timer = setTimeout(() => {
            if (pickupQuery.length >= 2 && !pickupLocation) {
                fetchLocations(pickupQuery, setPickupSuggestions);
            } else {
                setPickupSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [pickupQuery, pickupLocation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (dropoffQuery.length >= 2 && !dropoffLocation) {
                fetchLocations(dropoffQuery, setDropoffSuggestions);
            } else {
                setDropoffSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [dropoffQuery, dropoffLocation]);

    const fetchLocations = async (query: string, setter: (locs: ILocation[]) => void) => {
        try {
            const response = await api.get(`/rides_apis/locations/search/?q=${encodeURIComponent(query)}`);
            setter(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setter([]);
        }
    };

    const handleSearchRides = async () => {
        setSearching(true);
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (pickupLocation) params.append('pick_up', pickupLocation.name);
            else if (pickupQuery) params.append('pick_up', pickupQuery);
            
            if (dropoffLocation) params.append('drop_off', dropoffLocation.name);
            else if (dropoffQuery) params.append('drop_off', dropoffQuery);

            const response = await api.get(`/rides_apis/rides/search/?${params.toString()}`);
            setRides(response.data);
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Error searching rides:', err);
            const data = err.response?.data;
            const errorMessage = data?.detail || 
                                 data?.message || 
                                 data?.error ||
                                 (typeof data === 'string' ? data : null) ||
                                 'Failed to search rides. Please try again.';
            setError(errorMessage);
            setRides([]);
        } finally {
            setLoading(false);
        }
    };
    const handleDismissPrompt = () => {
        setShowUnratedPrompt(false);
        // Optional: Save to localStorage to persist dismissal if needed
    };

    const handleRateSuccess = () => {
        setShowUnratedPrompt(false);
        setUnratedRide(null);
        setRatingRide(null);
        // Re-fetch logic will naturally pick up that it's now rated
    };

    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
            {/* Map Background */}
            <div className="absolute inset-0 z-0">
                <MapContainer 
                    center={defaultCenter} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <MapUpdater rides={rides} />
                    <UserLocationUpdater location={userLocation} />
                    
                    {userLocation && (
                        <Marker 
                            position={userLocation} 
                            icon={userLocationIcon}
                        >
                            <Popup>You are here</Popup>
                        </Marker>
                    )}

                    {rides.map((ride) => {
                        const coords = getLocationCoords(ride.pick_up);
                        if (!coords) return null;
                        
                        return (
                            <Marker 
                                key={ride.uuid} 
                                position={coords} 
                                icon={pickupIcon}
                            >
                                <Popup className="min-w-[300px]">
                                    <div className="p-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg">{ride.driver.user?.full_name}</h3>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                                    {ride.driver.vehicle_color} {ride.driver.vehicle_type}
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                                {ride.driver.vehicle_plate_number}
                                            </Badge>
                                        </div>
                                        
                                        <div className="space-y-2 my-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-green-500" />
                                                <span className="font-medium truncate">{getLocationName(ride.pick_up)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-red-500" />
                                                <span className="font-medium truncate">{getLocationName(ride.drop_off)}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            <div className="flex items-center gap-1.5 text-sm bg-gray-50 p-1.5 rounded">
                                                <Users className="h-3.5 w-3.5 text-gray-500" />
                                                <span>{ride.seats_available} seats</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm bg-gray-50 p-1.5 rounded">
                                                <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                                                <span>₳ {ride.price_per_seat}</span>
                                            </div>
                                        </div>

                                        <Button size="sm" className="w-full" onClick={() => navigate(`/book/${ride.uuid}`)}>
                                            Book Ride
                                        </Button>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            {/* Active Rides Overlay - Top Right */}
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end pointer-events-none space-y-4">
                <div className="pointer-events-auto">
                    <AnimatePresence>
                        {activeUserRides.map(ride => (
                            <ActiveRideCard 
                                key={ride.uuid} 
                                ride={ride} 
                                onClick={() => navigate(`/book/${ride.uuid}`)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Unrated Ride Prompt */}
                <div className="pointer-events-auto">
                    <AnimatePresence>
                        {showUnratedPrompt && unratedRide && (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                className="bg-white rounded-2xl shadow-xl border border-yellow-100 p-4 w-80 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-2">
                                    <button 
                                        onClick={handleDismissPrompt}
                                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                                        <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 text-sm">Rate your last ride</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            How was your ride with {unratedRide.driver.user?.full_name}?
                                        </p>
                                        
                                        <div className="mt-3 flex gap-2">
                                            <Button 
                                                size="sm" 
                                                className="w-full bg-gray-900 hover:bg-black text-white text-xs h-8 rounded-xl"
                                                onClick={() => setRatingRide(unratedRide)}
                                            >
                                                Rate Driver
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Search Overlay - Bottom Center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-3xl px-4">
                <Card className="border-none bg-white/50 backdrop-blur-md">
                    <CardContent className="">
                        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] items-end">
                            {/* Pickup Input */}
                            <div className="space-y-1.5 relative">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Pickup
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-focus-within:bg-green-500 transition-colors">
                                        <MapPin className="h-4 w-4 text-green-600 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <Input 
                                        placeholder="Current Location" 
                                        className="pl-12 h-12 border-gray-200 rounded-full focus:border-green-500 focus:ring-green-500 bg-white/50"
                                        value={pickupQuery}
                                        onChange={(e) => {
                                            setPickupQuery(e.target.value);
                                            setPickupLocation(null);
                                        }}
                                    />
                                </div>
                                {pickupSuggestions.length > 0 && (
                                    <div className="absolute bottom-full mb-2 w-full bg-white rounded-lg border shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                                        {pickupSuggestions.map(loc => (
                                            <div 
                                                key={loc.id}
                                                className="px-4 py-3 hover:bg-green-50 cursor-pointer text-sm flex items-center gap-3 border-b last:border-0"
                                                onClick={() => {
                                                    setPickupQuery(loc.name);
                                                    setPickupLocation(loc);
                                                    setPickupSuggestions([]);
                                                }}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{loc.name}</div>
                                                    <div className="text-xs text-gray-500">City, Region</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Dropoff Input */}
                            <div className="space-y-1.5 relative">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Dropoff
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center group-focus-within:bg-red-500 transition-colors">
                                        <MapPin className="h-4 w-4 text-red-600 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <Input 
                                        placeholder="Where to?" 
                                        className="pl-12 h-12 border-gray-200 rounded-full focus:border-red-500 focus:ring-red-500 bg-white/50"
                                        value={dropoffQuery}
                                        onChange={(e) => {
                                            setDropoffQuery(e.target.value);
                                            setDropoffLocation(null);
                                        }}
                                    />
                                </div>
                                {dropoffSuggestions.length > 0 && (
                                    <div className="absolute bottom-full mb-2 w-full bg-white rounded-lg border shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                                        {dropoffSuggestions.map(loc => (
                                            <div 
                                                key={loc.id}
                                                className="px-4 py-3 hover:bg-red-50 cursor-pointer text-sm flex items-center gap-3 border-b last:border-0"
                                                onClick={() => {
                                                    setDropoffQuery(loc.name);
                                                    setDropoffLocation(loc);
                                                    setDropoffSuggestions([]);
                                                }}
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                                    <MapPin className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{loc.name}</div>
                                                    <div className="text-xs text-gray-500">City, Region</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button 
                                onClick={handleSearchRides} 
                                disabled={loading} 
                                className="h-10 px-8 bg-gray-900 hover:bg-black text-white hover:shadow-xl transition-all"
                            >
                                {loading ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : (
                                    <Search className="mr-2 h-4 w-4" />
                                )}
                                Search
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Error or No Results Toast */}
            <FloatingToast 
                message={error || "No rides found in this area"} 
                type="error" 
                isVisible={!!error || (searching && rides.length === 0 && !loading)} 
                onClose={() => setError(null)}
            />

            <RateRideModal 
                ride={ratingRide}
                open={!!ratingRide}
                onClose={() => setRatingRide(null)}
                onRate={handleRateSuccess}
            />
        </div>
    );
}
