import { motion } from 'framer-motion';
import { MapPin, Clock, Wallet } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import type { IRide } from '@/interfaces/User';

interface ActiveRideCardProps {
    ride: IRide;
    onClick?: () => void;
}

export function ActiveRideCard({ ride, onClick }: ActiveRideCardProps) {
    const isInProgress = ride.status.toLowerCase() === 'in progress' || ride.status.toLowerCase() === 'in_progress';

    const formatTime = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'h:mm a');
        } catch {
            return 'Invalid';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-md mb-4 cursor-pointer"
            onClick={onClick}
        >
            <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-4">
                    {/* Header: Driver Info & Status */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                    <AvatarImage 
                                        src={ride.driver.user?.avatar ? `https://app.arcaccra.com${ride.driver.user.avatar}` : undefined} 
                                        alt={ride.driver.user?.full_name} 
                                    />
                                    <AvatarFallback className="bg-violet-100 text-violet-600">
                                        {ride.driver.user?.full_name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                {isInProgress && (
                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white animate-pulse" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{ride.driver.user?.full_name}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="font-medium text-gray-700">{ride.driver.vehicle_color} {ride.driver.vehicle_type}</span>
                                    <span>•</span>
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-mono">{ride.driver.vehicle_plate_number}</span>
                                </p>
                            </div>
                        </div>
                        <Badge 
                            variant={isInProgress ? "default" : "secondary"}
                            className={`${isInProgress ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'} text-white border-none`}
                        >
                            {isInProgress ? 'En Route' : 'Requested'}
                        </Badge>
                    </div>

                    {/* Route Animation */}
                    <div className="relative pt-4 pb-1 px-2 mb-4 bg-gray-50/50 rounded-xl border border-gray-100 overflow-hidden">
                        <div className="flex justify-between items-center relative z-0 mb-3">
                            {/* Pickup */}
                            <div className="flex flex-col items-start max-w-[40%]">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="p-1.5 bg-green-100 rounded-full text-green-600">
                                        <MapPin className="w-3 h-3" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</span>
                                </div>
                                <p className="text-xs font-semibold text-gray-900 truncate w-full pl-1">{ride.pick_up.name}</p>
                                <p className="text-[10px] text-gray-500 pl-1">{formatTime(ride.departure_time)}</p>
                            </div>

                            {/* Dropoff */}
                            <div className="flex flex-col items-end max-w-[40%]">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</span>
                                    <div className="p-1.5 bg-red-100 rounded-full text-red-600">
                                        <MapPin className="w-3 h-3" />
                                    </div>
                                </div>
                                <p className="text-xs font-semibold text-gray-900 truncate w-full text-right pr-1">{ride.drop_off.name}</p>
                                <p className="text-[10px] text-gray-500 pr-1">Est. 20m</p>
                            </div>
                        </div>

                        {/* Animated Bottom Border */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                            <motion.div
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 2, 
                                    ease: "linear",
                                    repeatDelay: 0.5 
                                }}
                            />
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Wallet className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-sm font-bold text-gray-900">₳{ride.price_per_seat}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-xs text-gray-600">
                                    {isInProgress ? 'Arriving soon' : 'Waiting for driver'}
                                </span>
                            </div>
                        </div>
                        
                        {ride.driver.vehicle_image && (
                            <div className="h-8 w-12 rounded overflow-hidden border border-gray-100">
                                <img 
                                    src={ride.driver.vehicle_image} 
                                    alt="Car" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
