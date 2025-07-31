import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Ride } from "@/interfaces/Ride";
import { format } from "date-fns";

const getStatusBadge = (status: string) => {
    switch (status) {
        case "completed":
            return <Badge className="bg-green-100 text-green-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Completed</Badge>
        case "in-progress":
            return <Badge className="bg-blue-100 text-blue-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">In Progress</Badge>
        case "cancelled":
            return <Badge className="bg-red-100 text-red-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Cancelled</Badge>
        case "scheduled":
            return <Badge className="bg-amber-100 text-amber-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Scheduled</Badge>
        default:
            return <Badge className="bg-gray-100 text-gray-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">{status}</Badge>
    }
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
};

const calculateDuration = (start: string, end: string) => {
    if (!start) return 'N/A';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} min`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
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
                <div className="grid grid-cols-12 gap-4 pb-3  border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-4">DRIVER</div>
                    <div className="col-span-3">RIDER</div>
                    <div className="col-span-2">DURATION</div>
                    <div className="col-span-2">STATUS</div>
                    <div className="col-span-1"></div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {rides.map((ride) => (
                        <div key={ride.id} className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-gray-50">
                            {/* Driver */}
                            <div className="col-span-4 flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={ride.driverName} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                        {getInitials(ride.driverName)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{ride.driverName}</p>
                                    <p className="text-xs text-gray-500">{formatDate(ride.startTime)}</p>
                                </div>
                            </div>

                            {/* Rider */}
                            <div className="col-span-3">
                                <p className="text-sm font-medium text-gray-900">{ride.passengerName}</p>
                                <p className="text-xs text-gray-500">{ride.startLocation}</p>
                            </div>

                            {/* Duration */}
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">{calculateDuration(ride.startTime, ride.endTime)}</p>
                                <p className="text-xs text-gray-500">{ride.endTime ? 'Completed' : 'In progress'}</p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                {getStatusBadge(ride.status)}
                            </div>

                            {/* Actions */}
                            <div className="col-span-1">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-gray-500 hover:text-gray-700 text-xs"
                                    onClick={() => onManageClick?.(ride.id)}
                                >
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-gray-500 hover:text-gray-700 px-2"
                                disabled={currentPage === 1}
                                onClick={() => onPageChange && onPageChange(currentPage - 1)}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                <span className="text-sm">Back</span>
                            </Button>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <Button
                                            key={page}
                                            variant={page === currentPage ? "default" : "outline"}
                                            size="sm"
                                            className={`h-8 w-8 p-0 text-sm ${
                                                page === currentPage
                                                    ? "bg-black text-white hover:bg-black/90"
                                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                            }`}
                                            onClick={() => onPageChange && onPageChange(page)}
                                        >
                                            {page}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-gray-500 hover:text-gray-700 px-2"
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange && onPageChange(currentPage + 1)}
                        >
                            <span className="text-sm">Next</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}