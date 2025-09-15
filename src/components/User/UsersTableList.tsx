import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { IUser } from "@/interfaces/Driver";

const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
        case "active":
            return <Badge className="bg-green-100 text-green-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Active</Badge>
        case "inactive":
            return <Badge className="bg-red-100 text-red-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Inactive</Badge>
        case "pending":
            return <Badge className="bg-amber-100 text-amber-700 border-0 px-2.5 py-1 rounded-full text-xs font-medium">Pending</Badge>
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
    } catch {
        return 'Invalid date';
    }
};

// Extended user interface with additional properties for the table
export interface User extends IUser {
    created_at?: string;
    status?: 'active' | 'inactive' | 'pending' | string;
    role?: string;
}

interface UsersTableListProps {
    users: User[];
    onManageClick?: (userId: number) => void;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export function UsersTableList({ users, onManageClick, currentPage = 1, totalPages = 1, onPageChange }: UsersTableListProps) {
    return (
        <div className="w-full bg-[#FAFAFA] flex flex-col">
            <div className="px-6 py-3">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">USER</div>
                    <div className="col-span-3">EMAIL</div>
                    <div className="col-span-2">PHONE</div>
                    <div className="col-span-2">ROLE</div>
                    <div className="col-span-2">STATUS</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <div key={user.id} className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-gray-50">
                            {/* User */}
                            <div className="col-span-3 flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} alt={user.full_name} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                        {getInitials(user.full_name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {user.full_name || 'N/A'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ID: {user.id}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="col-span-3">
                                <p className="text-sm font-medium text-gray-900">{user.email || 'N/A'}</p>
                            </div>

                            {/* Phone */}
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.phone_number || 'N/A'}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.role || 'User'}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                {getStatusBadge(user.status || 'active')}
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(user.created_at || '')}
                                </p>
                                {onManageClick && (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="ml-2"
                                        onClick={() => onManageClick(user.id)}
                                    >
                                        Manage
                                    </Button>
                                )}
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