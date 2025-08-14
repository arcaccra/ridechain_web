import {
    Car,
    Shield,
    FileText,
    Clock,
    Phone,
    Mail,
    Calendar,
    MapPin
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import IDriver from "@/interfaces/Driver.ts";
import {useParams} from "react-router-dom";
import useFetchData from "@/hooks/useFetchData.tsx";

function getStatusBadge(status: string) {
    switch (status) {
        case "Approved":
            return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Approved</Badge>
        case "Under Review":
            return <Badge className="bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100">Under Review</Badge>
        case "Rejected":
            return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">Rejected</Badge>
        case "Documents Submitted":
            return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">Documents Submitted</Badge>
        default:
            return <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">{status}</Badge>
    }
}

export default function DriverDetail() {
    const {id} = useParams();
    const { data: driver, isLoading, isError, error } = useFetchData<IDriver>(`/apis/accounts/drivers/${id}/`, ["driver", id]);

    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (isError) return <div className="flex items-center justify-center h-screen">Error: {(error as any).message}</div>;
    if (!driver) return <div className="flex items-center justify-center h-screen">No driver data found.</div>;


    return (
        <div className="h-screen overflow-auto bg-slate-50 p-4">
            <div className="max-w-7xl mx-auto pb-6">
                {/* Header Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Profile Card */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="pb-2 px-4">
                            <CardTitle className="text-lg font-bold text-slate-800">Driver Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 border border-slate-200">
                                    <AvatarImage src={driver.user.avatar} alt={driver.user.full_name} />
                                    <AvatarFallback className="bg-slate-100 text-slate-700">{driver.user.full_name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">{driver.user.full_name}</h2>
                                    <p className="text-sm text-slate-500">Driver ID: {driver.id}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="pb-2 px-4">
                            <CardTitle className="text-lg font-bold text-slate-800">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 px-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Email</p>
                                    <p className="text-slate-800">{driver.user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Phone</p>
                                    <p className="text-slate-800">{driver.user.phone_number}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Address</p>
                                    <p className="text-slate-800">{"--"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Information */}
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="pb-2 px-4">
                            <CardTitle className="text-lg font-bold text-slate-800">Account Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 px-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Joined Date</p>
                                    <p className="text-slate-800">{new Date(driver.date_created).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">KYC Status</p>
                                    <div className="mt-1">{getStatusBadge(driver.kyc_status)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Last Updated</p>
                                    <p className="text-slate-800">{new Date(driver.date_updated).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Vehicle Information */}
                <Card className="shadow-sm border-slate-200 mb-4">
                    <CardHeader className="px-4 py-3">
                        <CardTitle className="text-lg font-bold text-slate-800">Vehicle Information</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 py-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-500">Vehicle</label>
                                <div className="flex items-center gap-2">
                                    <Car className="h-5 w-5 text-slate-400" />
                                    <span className="text-slate-800">{driver.vehicle_type}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-500">License Plate</label>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-slate-400" />
                                    <span className="text-slate-800">{driver.vehicle_plate_number}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}