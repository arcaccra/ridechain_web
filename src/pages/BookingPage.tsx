import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { FloatingToast } from '@/components/ui/floating-toast';

interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface Driver {
    id: number;
    user: {
        id: number;
        full_name: string;
        avatar: string;
    };
    vehicle_plate_number: string;
    vehicle_type: string;
    vehicle_color: string;
}

interface Ride {
    uuid: string;
    driver: Driver;
    pick_up: Location;
    drop_off: Location;
    seats_available: number;
    price_per_seat: string;
    departure_time?: string;
    arrival_time?: string;
    status: string;
}

interface BookingResponse {
    id: number;
    ride_id: string;
    qrcode_uuid: string;
    qr_code: string;
    date_booked: string;
}

export default function BookingPage() {
    const { rideId } = useParams<{ rideId: string }>();
    const navigate = useNavigate();
    const [ride, setRide] = useState<Ride | null>(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState<BookingResponse | null>(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRide = async () => {
            try {
                const response = await api.get(`/rides_apis/rides/${rideId}/`);
                setRide(response.data);
            } catch (err) {
                console.error('Error fetching ride:', err);
                setError('Failed to load ride details.');
            } finally {
                setLoading(false);
            }
        };

        if (rideId) {
            fetchRide();
        }
    }, [rideId]);

    const handleBookRide = async () => {
        if (!ride) return;
        setBookingLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await api.post(`/rides_apis/rides/${ride.uuid}/book/`);
            setBooking(response.data);
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Error booking ride:', err);
            // Extract error message from API response
            const data = err.response?.data;
            const errorMessage = data?.detail || 
                                 data?.message || 
                                 data?.error ||
                                 (typeof data === 'string' ? data : null) ||
                                 'Failed to book ride. Please try again.';
            setError(errorMessage);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full min-h-[50vh]">Loading ride details...</div>;
    }

    // If ride failed to load entirely, we might still want a full page error or redirect
    if (!ride && !loading) {
         return (
            <div className="container mx-auto p-6 max-w-2xl">
                <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                    <CardContent className="pt-6 text-center text-red-600 dark:text-red-400">
                        <p>Failed to load ride details.</p>
                        <Button variant="outline" className="mt-4" onClick={() => navigate('/search')}>
                            Back to Search
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!ride) return null;

    if (booking) {
        return (
            <div className="container mx-auto p-6 max-w-2xl">
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl text-green-700 dark:text-green-400">Booking Confirmed!</CardTitle>
                        <CardDescription>Your ride has been successfully booked.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <img src={booking.qr_code} alt="Booking QR Code" className="w-48 h-48 object-contain" />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-sm text-muted-foreground">Booking ID</p>
                            <p className="font-mono font-medium">{booking.qrcode_uuid}</p>
                        </div>
                        <div className="w-full border-t pt-4">
                            <h3 className="font-medium mb-2">Ride Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Driver</p>
                                    <p>{ride.driver.user.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Vehicle</p>
                                    <p>{ride.driver.vehicle_color} {ride.driver.vehicle_type}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Pickup</p>
                                    <p>{ride.pick_up.name}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Dropoff</p>
                                    <p>{ride.drop_off.name}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center gap-4">
                        <Button variant="outline" onClick={() => navigate('/search')}>
                            Book Another Ride
                        </Button>
                        <Button onClick={() => navigate('/rides')}>
                            View My Rides
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-2xl space-y-6 relative">
            {/* Error Toast */}
            <FloatingToast 
                message={error} 
                type="error" 
                isVisible={!!error} 
                onClose={() => setError(null)}
            />

            <Button variant="ghost" className="pl-0 hover:bg-transparent" onClick={() => navigate('/search')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl">Confirm Booking</CardTitle>
                            <CardDescription>Review ride details before booking</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                            ₳ {ride.price_per_seat}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Driver Info */}
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                            <img 
                                src={ride.driver.user.avatar || "https://github.com/shadcn.png"} 
                                alt={ride.driver.user.full_name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium">{ride.driver.user.full_name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {ride.driver.vehicle_color} {ride.driver.vehicle_type} • {ride.driver.vehicle_plate_number}
                            </p>
                        </div>
                    </div>

                    {/* Route Info */}
                    <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                        <div className="relative">
                            <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-background" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                                <p className="font-medium text-lg">{ride.pick_up.name}</p>
                                {ride.departure_time && (
                                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(new Date(ride.departure_time), 'PPP p')}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-background" />
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Dropoff Location</p>
                                <p className="font-medium text-lg">{ride.drop_off.name}</p>
                                {ride.arrival_time && (
                                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(new Date(ride.arrival_time), 'PPP p')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Seats Available</span>
                        </div>
                        <span className="font-medium">{ride.seats_available}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleBookRide} disabled={bookingLoading}>
                        {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
