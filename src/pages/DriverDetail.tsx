import { useState } from 'react';
import {
    Car,
    Shield,
    Eye,
    FileText,
    IdCard,
    Check,
    Clock,
    X,
    HelpCircle,
    Phone,
    Mail,
    Calendar,
    MapPin
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { cn } from "@/lib/utils.ts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import DocumentReviewModal from "@/components/Document/DocumentReviewModal.tsx";
import {IDocument} from "@/interfaces/Document.ts";
import IDriver from "@/interfaces/Driver.ts";
import {useParams} from "react-router-dom";

function getStatusIcon(status: string) {
    switch (status) {
        case "Approved":
            return <Check className="h-5 w-5 text-emerald-700" />
        case "Under Review":
            return <Clock className="h-5 w-5 text-sky-700" />
        case "Rejected":
            return <X className="h-5 w-5 text-rose-700" />
        case "Documents Submitted":
            return <FileText className="h-5 w-5 text-amber-700" />
        default:
            return <HelpCircle className="h-5 w-5 text-slate-400" />
    }
}

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
    const [selectedDocument, setSelectedDocument] = useState<IDocument>();
    const [driver, setDriver] = useState<IDriver>(() => {
        if (typeof window != "undefined") {
            const driver = localStorage.getItem('selectedDriver');
            if(driver) {
                return JSON.parse(driver);
            }
            else return {};
        }
    });
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const {id} = useParams();

    function handleDocumentClick(doc: IDocument) {
        setSelectedDocument(doc);
        setIsReviewModalOpen(true);
    }

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
                                    <AvatarImage src={driver.avatar} alt={driver.name} />
                                    <AvatarFallback className="bg-slate-100 text-slate-700">{driver.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">{driver.name}</h2>
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
                                    <p className="text-slate-800">{driver.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Phone</p>
                                    <p className="text-slate-800">{driver.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Address</p>
                                    <p className="text-slate-800">{""}</p>
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
                                    <p className="text-slate-800">{driver.joinDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">KYC Status</p>
                                    <div className="mt-1">{getStatusBadge(driver.kycStatus)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Last Updated</p>
                                    <p className="text-slate-800">{driver.lastUpdated}</p>
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
                                    <span className="text-slate-800">{driver.vehicle}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-500">License Plate</label>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-slate-400" />
                                    <span className="text-slate-800">{driver.licensePlate}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Documents Table */}
                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="px-4 py-3">
                        <CardTitle className="text-lg font-bold text-slate-800">Document Verification</CardTitle>
                        <CardDescription className="text-slate-500">Review and manage driver's submitted documents</CardDescription>
                    </CardHeader>
                    <CardContent className="px-4">
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 border-b border-slate-200">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-slate-50 border-none">
                                            <TableHead className="text-slate-700 font-medium py-2">Document Type</TableHead>
                                            <TableHead className="text-slate-700 font-medium py-2">Status</TableHead>
                                            <TableHead className="hidden sm:table-cell text-slate-700 font-medium py-2">Submission Date</TableHead>
                                            <TableHead className="hidden md:table-cell text-slate-700 font-medium py-2">Notes</TableHead>
                                            <TableHead className="text-right text-slate-700 font-medium py-2">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                </Table>
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableBody>
                                        {Object.entries(driver.documents || {}).map(([key, doc]) => (
                                            <TableRow key={key} className="hover:bg-slate-50 border-slate-200">
                                                <TableCell className="font-medium text-slate-800">
                                                    <div className="flex items-center gap-2">
                                                        <IdCard className="h-4 w-4 text-slate-400" />
                                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(doc.status)}
                                                        <span className={cn(
                                                            "text-sm",
                                                            doc.status === "Approved" && "text-emerald-700",
                                                            doc.status === "Rejected" && "text-rose-700",
                                                            doc.status === "Under Review" && "text-sky-700",
                                                            doc.status === "Documents Submitted" && "text-amber-700",
                                                            doc.status === "" && "text-slate-500"
                                                        )}>
                                                            {doc.status || "Not Submitted"}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-slate-600 text-sm">{doc.date || "-"}</TableCell>
                                                <TableCell className="hidden md:table-cell max-w-[200px] truncate text-slate-600 text-sm">
                                                    {doc.notes || "No notes"}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-7 text-xs border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium"
                                                        onClick={() => handleDocumentClick(doc)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Review
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {isReviewModalOpen && (
                <DocumentReviewModal
                    document={selectedDocument}
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                />
            )}
        </div>
    );
}