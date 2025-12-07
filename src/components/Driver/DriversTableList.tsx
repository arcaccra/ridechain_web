import React from 'react';
import { Check, Clock, X, FileText, Pencil, ChevronLeft, ChevronRight, Users, Truck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import IDriver from '@/interfaces/Driver.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';

interface IProps {
    drivers: IDriver[];
    onManageClick: (driver: IDriver) => void;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    statusFilter?: string;
    onStatusFilterChange?: (status: string) => void;
}

export default function DriversTableList({
    drivers = [],
    onManageClick,
    currentPage,
    totalPages,
    onPageChange,
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
}: IProps) {
    // Safety: ensure drivers is an array
    const list = Array.isArray(drivers) ? drivers : [];

    return (
        <div className="w-full bg-white">
            <div className="p-6">
                {/* Overview removed from table - rendered in the page sidebar instead */}

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Drivers Table</h2>
                    <div className="flex items-center space-x-4">
                        <Input
                            placeholder="Search drivers..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            className="w-64 border-0 bg-slate-100 focus:ring-0 focus:border-0 focus:ring-offset-0 text-sm"
                        />
                        <Select value={statusFilter} onValueChange={(value) => onStatusFilterChange && onStatusFilterChange(value)}>
                            <SelectTrigger className="w-48 border-0 bg-slate-100 focus:ring-0 focus:border-0 focus:ring-offset-0 text-sm">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-950 text-sm text-white shadow-lg rounded-lg">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Under Review">Under Review</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                                <SelectItem value="Documents Submitted">Documents Submitted</SelectItem>
                                <SelectItem value="Not Submitted">Not Submitted</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="text-[12px] text-slate-700 font-medium text-left">
                            <th className="text-left">Driver</th>
                            <th className="text-left">Vehicle Info.</th>
                            <th className="text-left">Status</th>
                            <th className="text-left">Last Updated</th>
                            <th className="text-left">Action</th>
                        </tr>
                        <tr className="h-8" />
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {list.map((driver) => (
                            <tr key={driver.id} className="hover:bg-gray-50">
                                <td className="text-left py-4">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={driver.user.avatar || `/placeholder.svg?height=40&width=40`} />
                                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                                {driver.user.full_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{driver.user.full_name}</p>
                                            <p className="text-xs text-gray-500">{driver.user.email}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-left py-4">
                                    <p className="text-sm font-medium text-gray-900">{driver.vehicle_type}</p>
                                    <p className="text-xs text-gray-500">{driver.vehicle_plate_number}</p>
                                </td>

                                <td className="text-left py-4">
                                    <Badge
                                        className={`text-xs px-2.5 py-1 rounded-full border-0 flex items-center gap-1 ${
                                            driver.status === 'Approved'
                                                ? 'bg-green-100 text-green-700'
                                                : driver.status === 'Under Review'
                                                ? 'bg-blue-100 text-blue-700'
                                                : driver.status === 'Rejected'
                                                ? 'bg-red-100 text-red-700'
                                                : driver.status === 'Documents Submitted'
                                                ? 'bg-amber-100 text-amber-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {driver.status === 'Approved' && <Check className="h-4 w-4" />}
                                        {driver.status === 'Under Review' && <Clock className="h-4 w-4" />}
                                        {driver.status === 'Rejected' && <X className="h-4 w-4" />}
                                        {driver.status === 'Documents Submitted' && <FileText className="h-4 w-4" />}
                                        {driver.status.split(' ').length > 1 ? driver.status.split(' ').pop() : driver.status}
                                    </Badge>
                                </td>

                                <td className="text-left py-4">
                                    <p className="text-sm text-gray-900">{new Date(driver.date_updated).toLocaleDateString()}</p>
                                </td>

                                <td className="text-left py-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 hover:text-gray-700 text-xs"
                                        onClick={() => onManageClick(driver)}
                                    >
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages && totalPages > 1 && (
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-500 hover:text-gray-700 px-2"
                                disabled={currentPage === 1}
                                onClick={() => onPageChange && onPageChange((currentPage || 1) - 1)}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                <span className="text-sm">Back</span>
                            </Button>
                            <div className="flex items-center space-x-1">
                                {[...Array(totalPages).keys()].map((page) => (
                                    <Button
                                        key={page + 1}
                                        variant={page + 1 === currentPage ? 'default' : 'outline'}
                                        size="sm"
                                        className={`h-8 w-8 p-0 text-sm ${
                                            page + 1 === currentPage
                                                ? 'bg-black text-white hover:bg-black/90'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                        onClick={() => onPageChange && onPageChange(page + 1)}
                                    >
                                        {page + 1}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 px-2"
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange && onPageChange((currentPage || 1) + 1)}
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
