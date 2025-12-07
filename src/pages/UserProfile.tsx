import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Phone, MapPin, Wallet, Globe, Copy, Eye, EyeOff, Edit, Car, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import type { IWallet } from "@/interfaces/Wallet";
import type { IRide, IUser } from "@/interfaces/User";
import { PulsingIcon } from "@/components/ui/PulsingIcon";
import { format } from 'date-fns';
import { CreateRideModal } from "@/components/Ride/CreateRideModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserProfile() {
    const { user } = useAuth();
    const [wallet, setWallet] = useState<IWallet | null>(null);
    const [walletLoading, setWalletLoading] = useState(true);
    const [showFullAddress, setShowFullAddress] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [rides, setRides] = useState<IRide[]>([]);
    const [userProfile, setUserProfile] = useState<IUser | null>(user);
    const [createRideOpen, setCreateRideOpen] = useState(false);

    // Fetch wallet data
    useEffect(() => {
        const fetchWallet = async () => {
            if (!user?.id) {
                setWalletLoading(false);
                return;
            }

            try {
                const response = await api.get('/accounts/wallets/');
                
                if (!response.data) {
                    setWallet(null);
                    return;
                }

                const userWallet = Array.isArray(response.data) 
                    ? response.data.find((w: IWallet) => w?.user?.id === user.id)
                    : response.data;
                
                // Validate wallet structure to prevent crashes
                if (userWallet && userWallet.balance && userWallet.address) {
                    setWallet(userWallet);
                } else {
                    console.warn("Invalid wallet data found, setting to null");
                    setWallet(null);
                }
            } catch (error) {
                console.error('Error fetching wallet:', error);
                setWallet(null);
            } finally {
                setWalletLoading(false);
            }
        };

        fetchWallet();
    }, [user?.id]);

    // Fetch user rides
    useEffect(() => {
        const fetchRides = async () => {
            if (!user?.id) return;

            try {
                const response = await api.get(`/accounts/users/${user.id}/`);
                if (response.data) {
                    // Update local profile state with fresh data
                    setUserProfile(response.data);
                    
                    if (response.data.user_rides) {
                        setRides(response.data.user_rides);
                    }
                }
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        };

        fetchRides();
    }, [user?.id]);

    const refreshRides = async () => {
        if (!user?.id) return;
        try {
            const response = await api.get(`/accounts/users/${user.id}/`);
            if (response.data) {
                setUserProfile(response.data); // Keep profile in sync
                
                if (response.data.user_rides) {
                    setRides(response.data.user_rides);
                }
            }
        } catch (error) {
            console.error('Error refreshing rides:', error);
        }
    };

    const truncateAddress = (address: string) => {
        if (!address) return '';
        if (showFullAddress) return address;
        return `${address.slice(0, 12)}...${address.slice(-8)}`;
    };

    const copyAddress = async () => {
        if (!wallet?.address) return;
        try {
            await navigator.clipboard.writeText(wallet.address);
            setCopiedAddress(true);
            setTimeout(() => setCopiedAddress(false), 2000);
        } catch (error) {
            console.error('Failed to copy address:', error);
        }
    };

    if (!user) {
        return <div className="p-8">Please log in to view your profile.</div>;
    }

    const formatLocation = (location?: [number, number] | null) => {
        if (!location || !Array.isArray(location)) return 'Not set';
        return `${location[0].toFixed(6)}, ${location[1].toFixed(6)}`;
    };

    const getDriverStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Approved</Badge>;
            case 'documents submitted':
                return <Badge className="bg-blue-100 text-blue-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Documents Submitted</Badge>;
            case 'pending':
                return <Badge className="bg-amber-100 text-amber-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Pending</Badge>;
            case 'rejected':
                return <Badge className="bg-red-100 text-red-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Rejected</Badge>;
            default:
                return <Badge className="bg-gray-100 text-gray-700 border-0 px-3 py-1 rounded-full text-sm font-medium">{status || 'N/A'}</Badge>;
        }
    };

    const getRideStatusBadge = (status: string, withPulse = false) => {
        const statusLower = status?.toLowerCase();
        
        if (statusLower === 'requested') {
            return (
                <div className="flex items-center gap-2">
                    {withPulse && <PulsingIcon color="bg-amber-500" size={3} />}
                    <Badge className="bg-amber-100 text-amber-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Requested</Badge>
                </div>
            );
        }
        
        if (statusLower === 'in progress' || statusLower === 'in_progress') {
            return (
                <div className="flex items-center gap-2">
                    {withPulse && <PulsingIcon color="bg-green-500" size={3} />}
                    <Badge className="bg-green-100 text-green-700 border-0 px-3 py-1 rounded-full text-sm font-medium">In Progress</Badge>
                </div>
            );
        }
        
        if (statusLower === 'completed') {
            return <Badge className="bg-blue-100 text-blue-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Completed</Badge>;
        }
        
        if (statusLower === 'cancelled') {
            return <Badge className="bg-red-100 text-red-700 border-0 px-3 py-1 rounded-full text-sm font-medium">Cancelled</Badge>;
        }
        
        return <Badge className="bg-gray-100 text-gray-700 border-0 px-3 py-1 rounded-full text-sm font-medium">{status || 'N/A'}</Badge>;
    };

    const formatDateTime = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return format(new Date(dateString), 'MMM d, yyyy h:mm a');
        } catch {
            return 'Invalid date';
        }
    };

    const activeRides = rides.filter(ride => 
        ride.status.toLowerCase() === 'requested' || 
        ride.status.toLowerCase() === 'in progress' ||
        ride.status.toLowerCase() === 'in_progress'
    );
    
    const rideHistory = rides.filter(ride => 
        ride.status.toLowerCase() !== 'requested' && 
        ride.status.toLowerCase() !== 'in progress' &&
        ride.status.toLowerCase() !== 'in_progress'
    );

    return (
        <div className="h-screen bg-gray-50 p-8 flex flex-col overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
                {/* Header */}
                <div className="mb-6 flex-shrink-0">
                    <h1 className="text-3xl font-semibold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account and wallet</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 flex-1 overflow-hidden">
                    {/* Left Sidebar - Profile Card & Personal Info */}
                    <div className="lg:col-span-1 space-y-6 overflow-y-auto">
                        {/* Profile Card */}
                        <Card className="border border-gray-200 bg-white rounded-3xl overflow-hidden py-0">
                            <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-50" />
                            <CardContent className="pt-0 pb-8">
                                <div className="flex flex-col items-center -mt-12">
                                    <div className="relative">
                                        <Avatar className="w-24 h-24 border-4 border-white">
                                            <AvatarImage src={user.avatar} alt={user.full_name} />
                                            <AvatarFallback className="text-3xl bg-gray-900 text-white">
                                                {user.full_name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                            <Edit className="w-3.5 h-3.5 text-gray-600" />
                                        </button>
                                    </div>
                                    <h2 className="text-xl font-semibold mt-4 text-center text-gray-900">{user.full_name}</h2>
                                    <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                                    
                                    <Button className="mt-6 w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl">
                                        Edit Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Personal Information */}
                        <Card className="border border-gray-200 bg-white rounded-3xl py-0">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-600" />
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                <User className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-blue-600 font-medium mb-0.5">Full Name</p>
                                                <p className="font-medium text-gray-900 truncate">{user.full_name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                                <Mail className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-indigo-600 font-medium mb-0.5">Email</p>
                                                <p className="font-medium text-gray-900 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {user.phone_number && (
                                        <div className="p-4 rounded-2xl bg-green-50/50 border border-green-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                    <Phone className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-green-600 font-medium mb-0.5">Phone</p>
                                                    <p className="font-medium text-gray-900">{user.phone_number}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {user.country && (
                                        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                                    <Globe className="w-5 h-5 text-amber-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-amber-600 font-medium mb-0.5">Country</p>
                                                    <p className="font-medium text-gray-900">{user.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {user.current_location && (
                                        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                                                    <MapPin className="w-5 h-5 text-rose-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-rose-600 font-medium mb-0.5">Current Location</p>
                                                    <p className="font-medium text-gray-900 text-sm">{formatLocation(user.current_location)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Content - Wallet, Driver Info & Rides */}
                    <div className="lg:col-span-2 space-y-6 overflow-y-auto">
                        {/* Wallet Card */}
                        <Card className="border border-gray-200 bg-white rounded-3xl overflow-hidden py-0">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                                        <Wallet className="w-5 h-5 text-gray-600" />
                                        Cardano Wallet
                                    </h3>
                                    <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                        Testnet
                                    </div>
                                </div>

                                {walletLoading ? (
                                    <div className="text-center py-12">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                        <p className="mt-4 text-gray-500">Loading wallet...</p>
                                    </div>
                                ) : wallet ? (
                                    <div className="space-y-4">
                                        {/* Balance */}
                                        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
                                            <p className="text-gray-500 text-sm mb-2">Total Balance</p>
                                            <p className="text-3xl font-mono font-semibold mb-2 text-gray-900">
                                                ₳ {wallet.balance.ada.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {wallet.balance.lovelace.toLocaleString()} Lovelace
                                            </p>
                                        </div>

                                        {/* Address */}
                                        <div className="bg-gray-50 rounded-3xl p-4 border border-gray-200">
                                            <p className="text-gray-500 text-sm mb-3">Wallet Address</p>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 text-xs font-mono bg-white border border-gray-200 p-3 rounded-2xl break-all text-gray-700">
                                                    {truncateAddress(wallet.address)}
                                                </code>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setShowFullAddress(!showFullAddress)}
                                                    className="shrink-0 hover:bg-gray-100 text-gray-600 rounded-xl"
                                                >
                                                    {showFullAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={copyAddress}
                                                    className="shrink-0 hover:bg-gray-100 text-gray-600 rounded-xl"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            {copiedAddress && (
                                                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                                    Address copied!
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-3 mt-6">
                                            <Button className="bg-gray-900 text-white hover:bg-gray-800 font-medium rounded-2xl">
                                                Add Funds
                                            </Button>
                                            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-2xl">
                                                Withdraw
                                            </Button>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                                                <p className="text-gray-500 text-xs mb-1">Total Spent</p>
                                                <p className="text-xl font-semibold text-gray-900">₳ 0.00</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                                                <p className="text-gray-500 text-xs mb-1">Total Rides</p>
                                                <p className="text-xl font-semibold text-gray-900">0</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-600">No wallet found</p>
                                        <p className="text-gray-400 text-sm mt-2">Connect your Cardano wallet to get started</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Driver Status */}
                        {userProfile?.driver && (
                            <Card className="border border-gray-200 bg-white rounded-3xl py-0">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <Car className="w-5 h-5 text-violet-600" />
                                            Driver Information
                                        </h3>
                                        <Button 
                                            size="sm" 
                                            onClick={() => setCreateRideOpen(true)}
                                            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
                                        >
                                            Create Trip
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">Status</span>
                                            {getDriverStatusBadge(userProfile.driver.status)}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 rounded-2xl bg-violet-50/50 border border-violet-100">
                                                <p className="text-xs text-violet-600 font-medium mb-1">Vehicle Type</p>
                                                <p className="text-sm font-medium text-gray-900">{userProfile.driver.vehicle_type}</p>
                                            </div>
                                            <div className="p-3 rounded-2xl bg-violet-50/50 border border-violet-100">
                                                <p className="text-xs text-violet-600 font-medium mb-1">Vehicle Color</p>
                                                <p className="text-sm font-medium text-gray-900">{userProfile.driver.vehicle_color}</p>
                                            </div>
                                            <div className="p-3 rounded-2xl bg-violet-50/50 border border-violet-100">
                                                <p className="text-xs text-violet-600 font-medium mb-1">Plate Number</p>
                                                <p className="text-sm font-medium text-gray-900">{userProfile.driver.vehicle_plate_number}</p>
                                            </div>
                                            <div className="p-3 rounded-2xl bg-violet-50/50 border border-violet-100">
                                                <p className="text-xs text-violet-600 font-medium mb-1">ID Type</p>
                                                <p className="text-sm font-medium text-gray-900">{userProfile.driver.id_type?.replace('_', ' ') || 'N/A'}</p>
                                            </div>
                                        </div>

                                        {userProfile.driver.vehicle_image && (
                                            <div>
                                                <p className="text-xs text-gray-500 mb-2">Vehicle Image</p>
                                                <img 
                                                    src={`https://app.arcaccra.com${userProfile.driver.vehicle_image}`} 
                                                    alt="Vehicle" 
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Tabs defaultValue="active" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1 rounded-xl">
                                <TabsTrigger 
                                    value="active"
                                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                >
                                    Active Rides ({activeRides.length})
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="history"
                                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                >
                                    Ride History ({rideHistory.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="active">
                                {/* Active Rides */}
                                {activeRides.length > 0 ? (
                                    <Card className="border border-gray-200 bg-white rounded-3xl py-0">
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center gap-2">
                                                <PulsingIcon color="bg-green-500" size={3} />
                                                Active Rides
                                            </h3>
                                            <div className="space-y-3">
                                                {activeRides.map((ride) => (
                                                    <div key={ride.uuid} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={ride.driver.user?.avatar} alt={ride.driver.user?.full_name} />
                                                                    <AvatarFallback className="bg-violet-100 text-violet-600 text-xs font-medium">
                                                                        {ride.driver.user?.full_name?.charAt(0).toUpperCase()}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-semibold text-gray-900 text-xs">{ride.driver.user?.full_name || 'Unknown Driver'}</p>
                                                                    <p className="text-[10px] text-gray-500">{ride.driver.vehicle_type} - {ride.driver.vehicle_color}</p>
                                                                </div>
                                                            </div>
                                                            {getRideStatusBadge(ride.status, true)}
                                                        </div>

                                                        <div className="space-y-1.5 mb-2">
                                                            <div className="flex items-start gap-1.5">
                                                                <MapPin className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-medium text-gray-900">{ride.pick_up.name}</p>
                                                                    <p className="text-[10px] text-gray-500">Pickup</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-start gap-1.5">
                                                                <MapPin className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-medium text-gray-900">{ride.drop_off.name}</p>
                                                                    <p className="text-[10px] text-gray-500">Dropoff</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="h-3 w-3 text-gray-400" />
                                                                <div>
                                                                    <p className="text-[10px] text-gray-500">Departure</p>
                                                                    <p className="text-xs font-medium text-gray-900">{formatDateTime(ride.departure_time || '')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <Wallet className="h-3 w-3 text-gray-400" />
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Price</p>
                                                                    <p className="text-sm font-medium text-violet-600">₳{ride.price_per_seat}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
                                        <p className="text-gray-500 text-sm">No active rides found</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="history">
                                {/* Ride History */}
                                {rideHistory.length > 0 ? (
                                    <Card className="border border-gray-200 bg-white rounded-3xl py-0">
                                        <CardContent className="p-6">
                                            <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-gray-600" />
                                                Ride History
                                            </h3>
                                            <div className="space-y-4">
                                                {rideHistory.map((ride) => (
                                                    <div key={ride.uuid} className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className="h-10 w-10">
                                                                    <AvatarImage src={ride.driver.user?.avatar} alt={ride.driver.user?.full_name} />
                                                                    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
                                                                        {ride.driver.user?.full_name?.charAt(0).toUpperCase()}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-semibold text-gray-900 text-sm">{ride.driver.user?.full_name || 'Unknown Driver'}</p>
                                                                    <p className="text-xs text-gray-500">{ride.driver.vehicle_type} - {ride.driver.vehicle_color}</p>
                                                                </div>
                                                            </div>
                                                            {getRideStatusBadge(ride.status, false)}
                                                        </div>

                                                        <div className="space-y-2 mb-3">
                                                            <div className="flex items-start gap-2">
                                                                <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900">{ride.pick_up.name}</p>
                                                                    <p className="text-xs text-gray-500">Pickup</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <MapPin className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900">{ride.drop_off.name}</p>
                                                                    <p className="text-xs text-gray-500">Dropoff</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-gray-400" />
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Departure</p>
                                                                    <p className="text-sm font-medium text-gray-900">{formatDateTime(ride.departure_time || '')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Wallet className="h-4 w-4 text-gray-400" />
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Price</p>
                                                                    <p className="text-sm font-medium text-gray-600">₳{ride.price_per_seat}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
                                        <p className="text-gray-500 text-sm">No ride history found</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            
            <CreateRideModal 
                open={createRideOpen} 
                onOpenChange={setCreateRideOpen}
                onRideCreated={refreshRides}
            />
        </div>
    );
}
