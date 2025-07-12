import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import IDriver from "@/interfaces/Driver.ts";
import {Badge} from "@/components/ui/badge.tsx";

interface IProps {
    drivers: IDriver[]
    onManageClick: (driver: IDriver) => void;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}


export default function DriversTableList({drivers, onManageClick, currentPage, totalPages, onPageChange}: IProps) {
    return (
        <div className="w-full bg-white">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Drivers Table</h2>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="col-span-5">DRIVER</div>
                    <div className="col-span-3">VEHICLE INFO</div>
                    <div className="col-span-2">STATUS</div>
                    <div className="col-span-1">LAST UPDATED</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {drivers.map((driver) => (
                        <div key={driver.id} className="grid grid-cols-12 gap-4 py-4 items-center hover:bg-gray-50">
                            {/* Driver */}
                            <div className="col-span-5 flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                        {driver.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                                    <p className="text-xs text-gray-500">{driver.email}</p>
                                </div>
                            </div>

                            {/* Vehicle Info */}
                            <div className="col-span-3">
                                <p className="text-sm font-medium text-gray-900">{driver.vehicle}</p>
                                <p className="text-xs text-gray-500">{driver.licensePlate}</p>
                            </div>

                            {/* Status */}
                            <div className="col-span-2">
                                <Badge
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 ${
                                        driver.kycStatus === "Approved" 
                                            ? "bg-green-100 text-green-700" 
                                            : driver.kycStatus === "Under Review"
                                                ? "bg-blue-100 text-blue-700"
                                                : driver.kycStatus === "Rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : driver.kycStatus === "Documents Submitted"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {driver.kycStatus}
                                </Badge>
                            </div>

                            {/* Last Updated */}
                            <div className="col-span-1">
                                <p className="text-sm text-gray-900">{driver.lastUpdated}</p>
                            </div>

                            {/* Actions */}
                            <div className="col-span-1">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-gray-500 hover:text-gray-700 text-xs"
                                    onClick={() => onManageClick(driver)}
                                >
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages && (
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
                                {[1, 2, 3, 4, 5].map((page) => (
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
    )
}
