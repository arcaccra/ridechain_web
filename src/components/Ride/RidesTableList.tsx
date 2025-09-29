import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Ride } from "@/interfaces/Ride";
import { format } from "date-fns";

const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
        case "completed":
            return <Badge className="bg-green-100 text-green-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Completed</Badge>
        case "in-progress":
            return <Badge className="bg-blue-100 text-blue-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">In Progress</Badge>
        case "cancelled":
            return <Badge className="bg-red-100 text-red-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Cancelled</Badge>
        case "scheduled":
            return <Badge className="bg-amber-100 text-amber-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Scheduled</Badge>
        case "documents submitted":
            return <Badge className="bg-purple-100 text-purple-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Documents Submitted</Badge>
        default:
            return <Badge className="bg-gray-100 text-gray-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">{status || 'N/A'}</Badge>
    }
}

const getInitials = (name?: string) => {
    if (!name) return '--';
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
        return 'Invalid date';
    }
};

const formatPrice = (price: string) => {
    const amount = parseFloat(price);
    if (isNaN(amount)) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GHS'
    }).format(amount);
};

interface RidesTableListProps {
    rides: Ride[];
    onManageClick?: (rideId: string) => void;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export function RidesTableList({ rides, onManageClick, currentPage = 1, totalPages = 1, onPageChange }: RidesTableListProps) {
    return (
        <div className="w-full bg-[#FAFAFA] flex flex-col">
            <div className="px-6 py-3">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">DRIVER</div>
                    <div className="col-span-2">VEHICLE</div>
                    <div className="col-span-2">SEATS</div>
                    <div className="col-span-2">PRICE/SEAT</div>
                    <div className="col-span-2">STATUS</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {rides.map((ride) => (
                        <div key={ride.uuid} className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-gray-50">
                            {/* Driver */}
                            <div className="col-span-3 flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={ride.driver?.user?.avatar} alt={ride.driver?.user?.full_name} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                        {getInitials(ride.driver?.user?.full_name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {ride.driver?.user?.full_name || 'N/A'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {ride.driver?.online ? '🟢 Online' : '⚪ Offline'}
                                    </p>
                                </div>
                            </div>

                            {/* Vehicle */}
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">{ride.driver?.vehicle_type || 'N/A'}</p>
                                <p className="text-xs text-gray-500">{ride.driver?.vehicle_plate_number || 'N/A'}</p>
                            </div>

                            {/* Seats */}
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">
                                    {ride.seats_available} seats available
                                </p>
                                <p className="text-xs text-gray-500">
                                    {ride.pick_up?.name || 'N/A'} → {ride.drop_off?.name || 'N/A'}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">
                                    {formatPrice(ride.price_per_seat)}
                                </p>
                                <p className="text-xs text-gray-500">per seat</p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                {getStatusBadge(ride.status || '')}
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(ride.created_at)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage >= totalPages}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}