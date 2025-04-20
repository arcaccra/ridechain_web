import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Car} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import IDriver from "@/interfaces/Driver.ts";
import {Badge} from "@/components/ui/badge.tsx";

interface IProps {
    drivers: IDriver[]
    onManageClick: (driver: IDriver) => void;
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Approved":
            return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Approved</Badge>
        case "Under Review":
            return <Badge className="bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100">Under Review</Badge>
        case "Rejected":
            return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">Rejected</Badge>
        case "Documents Submitted":
            return (
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">Documents Submitted</Badge>
            )
        case "Pending Submission":
            return (
                <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">Pending Submission</Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export default function DriversTableList({drivers, onManageClick}: IProps) {
    return (
        <div className="px-4 sm:px-6 flex-grow flex flex-col overflow-hidden">
            <div className="rounded-lg border border-slate-200 flex flex-col overflow-hidden h-full">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="hover:bg-slate-50 border-none">
                            <TableHead className="w-[30%] text-slate-700 font-medium py-2">Driver</TableHead>
                            <TableHead className="w-[25%] text-slate-700 font-medium py-2">Vehicle Info</TableHead>
                            <TableHead className="w-[15%] text-slate-700 font-medium py-2">Status</TableHead>
                            <TableHead className="w-[15%] text-slate-700 font-medium py-2">Last Updated</TableHead>
                            <TableHead className="w-[15%] text-right text-slate-700 font-medium py-2">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="overflow-y-auto flex-grow">
                        {drivers.map((driver) => (
                            <TableRow key={driver.id} className="hover:bg-slate-50 border-slate-200">
                                <TableCell className="w-[30%] py-2.5">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 border border-slate-200">
                                            <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                                            <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                                                {driver.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">{driver.name}</p>
                                            <p className="text-xs text-slate-500">{driver.email}</p>
                                            <div className="md:hidden mt-1">{getStatusBadge(driver.kycStatus)}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="w-[25%] py-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-slate-100 p-1.5 rounded-full">
                                            <Car className="h-3.5 w-3.5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-800">{driver.vehicle}</p>
                                            <p className="text-xs text-slate-500">{driver.licensePlate}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="w-[15%] hidden md:table-cell py-2.5">
                                    {getStatusBadge(driver.kycStatus)}
                                </TableCell>
                                <TableCell className="w-[15%] hidden sm:table-cell py-2.5 text-slate-600 text-sm">
                                    {driver.lastUpdated}
                                </TableCell>
                                <TableCell className="w-[15%] text-right py-2.5">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium"
                                        onClick={() => onManageClick(driver)}
                                    >
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}