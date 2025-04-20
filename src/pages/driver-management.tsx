"use client"

import { useState } from "react"
import { Car, Filter, Search, ChevronLeft, ChevronRight, Download, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DriverKycModal from "@/components/KYC/DriverKycModal.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import type IDriver from "@/interfaces/Driver.ts"

const drivers: IDriver[] = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        vehicle: "Toyota Camry (2020)",
        licensePlate: "ABC-1234",
        joinDate: "Jan 15, 2023",
        kycStatus: "Approved",
        lastUpdated: "Mar 10, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: {
                status: "Approved",
                date: "Feb 15, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Valid government ID",
            },
            driverLicense: {
                status: "Approved",
                date: "Feb 15, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "License valid until 2027",
            },
            vehicleRegistration: {
                status: "Approved",
                date: "Feb 16, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Registration up to date",
            },
            insuranceDocument: {
                status: "Approved",
                date: "Feb 16, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Full coverage insurance",
            },
        },
    },
    {
        id: "2",
        name: "Maria Rodriguez",
        email: "maria.r@example.com",
        phone: "+1 (555) 987-6543",
        vehicle: "Honda Civic (2019)",
        licensePlate: "XYZ-7890",
        joinDate: "Feb 5, 2023",
        kycStatus: "Under Review",
        lastUpdated: "Apr 12, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: {
                status: "Under Review",
                date: "Apr 10, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Pending verification",
            },
            driverLicense: {
                status: "Under Review",
                date: "Apr 10, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Pending verification",
            },
            vehicleRegistration: {
                status: "Under Review",
                date: "Apr 10, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Pending verification",
            },
            insuranceDocument: {
                status: "Under Review",
                date: "Apr 10, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Pending verification",
            },
        },
    },
    {
        id: "3",
        name: "David Chen",
        email: "david.c@example.com",
        phone: "+1 (555) 456-7890",
        vehicle: "Ford Escape (2021)",
        licensePlate: "DEF-5678",
        joinDate: "Mar 20, 2023",
        kycStatus: "Rejected",
        lastUpdated: "Apr 5, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: {
                status: "Approved",
                date: "Apr 2, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Valid government ID",
            },
            driverLicense: {
                status: "Rejected",
                date: "Apr 5, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "License expired",
            },
            vehicleRegistration: {
                status: "Approved",
                date: "Apr 2, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Registration valid",
            },
            insuranceDocument: {
                status: "Approved",
                date: "Apr 2, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Insurance valid",
            },
        },
    },
    {
        id: "4",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 234-5678",
        vehicle: "Hyundai Sonata (2018)",
        licensePlate: "GHI-9012",
        joinDate: "Feb 28, 2023",
        kycStatus: "Documents Submitted",
        lastUpdated: "Apr 15, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: {
                status: "Documents Submitted",
                date: "Apr 15, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Awaiting review",
            },
            driverLicense: {
                status: "Documents Submitted",
                date: "Apr 15, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Awaiting review",
            },
            vehicleRegistration: {
                status: "Documents Submitted",
                date: "Apr 15, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Awaiting review",
            },
            insuranceDocument: {
                status: "Documents Submitted",
                date: "Apr 15, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Awaiting review",
            },
        },
    },
    {
        id: "6",
        name: "Emily Wilson",
        email: "emily.w@example.com",
        phone: "+1 (555) 345-6789",
        vehicle: "Nissan Altima (2020)",
        licensePlate: "MNO-7890",
        joinDate: "Mar 15, 2023",
        kycStatus: "Approved",
        lastUpdated: "Apr 10, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: {
                status: "Approved",
                date: "Apr 8, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Valid government ID",
            },
            driverLicense: {
                status: "Approved",
                date: "Apr 8, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "License valid until 2025",
            },
            vehicleRegistration: {
                status: "Approved",
                date: "Apr 8, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Registration up to date",
            },
            insuranceDocument: {
                status: "Approved",
                date: "Apr 8, 2023",
                url: "/placeholder.svg?height=300&width=500",
                notes: "Full coverage insurance",
            },
        },
    },
]

// Add more drivers for demonstration
const moreDrivers = [
    {
        id: "7",
        name: "Alex Turner",
        email: "alex.t@example.com",
        phone: "+1 (555) 222-3333",
        vehicle: "Kia Sportage (2021)",
        licensePlate: "PQR-4567",
        joinDate: "Apr 5, 2023",
        kycStatus: "Approved",
        lastUpdated: "Apr 20, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Approved", date: "", url: "", notes: "" },
            driverLicense: { status: "Approved", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Approved", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Approved", date: "", url: "", notes: "" },
        },
    },
    {
        id: "8",
        name: "Jessica Lee",
        email: "jessica.l@example.com",
        phone: "+1 (555) 444-5555",
        vehicle: "Mazda CX-5 (2022)",
        licensePlate: "STU-7890",
        joinDate: "Mar 25, 2023",
        kycStatus: "Under Review",
        lastUpdated: "Apr 18, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Under Review", date: "", url: "", notes: "" },
            driverLicense: { status: "Under Review", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Under Review", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Under Review", date: "", url: "", notes: "" },
        },
    },
    {
        id: "9",
        name: "Robert Kim",
        email: "robert.k@example.com",
        phone: "+1 (555) 666-7777",
        vehicle: "Subaru Outback (2020)",
        licensePlate: "VWX-1234",
        joinDate: "Feb 10, 2023",
        kycStatus: "Documents Submitted",
        lastUpdated: "Apr 15, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Documents Submitted", date: "", url: "", notes: "" },
            driverLicense: { status: "Documents Submitted", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Documents Submitted", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Documents Submitted", date: "", url: "", notes: "" },
        },
    },
    {
        id: "10",
        name: "Olivia Martinez",
        email: "olivia.m@example.com",
        phone: "+1 (555) 888-9999",
        vehicle: "Volkswagen Tiguan (2021)",
        licensePlate: "YZA-5678",
        joinDate: "Mar 5, 2023",
        kycStatus: "Approved",
        lastUpdated: "Apr 12, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Approved", date: "", url: "", notes: "" },
            driverLicense: { status: "Approved", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Approved", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Approved", date: "", url: "", notes: "" },
        },
    },
    {
        id: "11",
        name: "William Taylor",
        email: "william.t@example.com",
        phone: "+1 (555) 111-2222",
        vehicle: "Jeep Cherokee (2019)",
        licensePlate: "BCD-9012",
        joinDate: "Jan 20, 2023",
        kycStatus: "Rejected",
        lastUpdated: "Mar 25, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Approved", date: "", url: "", notes: "" },
            driverLicense: { status: "Rejected", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Approved", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Approved", date: "", url: "", notes: "" },
        },
    },
    {
        id: "12",
        name: "Sophia Garcia",
        email: "sophia.g@example.com",
        phone: "+1 (555) 333-4444",
        vehicle: "Honda CR-V (2022)",
        licensePlate: "EFG-3456",
        joinDate: "Feb 15, 2023",
        kycStatus: "Approved",
        lastUpdated: "Apr 5, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Approved", date: "", url: "", notes: "" },
            driverLicense: { status: "Approved", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Approved", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Approved", date: "", url: "", notes: "" },
        },
    },
    {
        id: "13",
        name: "James Wilson",
        email: "james.w@example.com",
        phone: "+1 (555) 555-6666",
        vehicle: "Toyota RAV4 (2021)",
        licensePlate: "HIJ-7890",
        joinDate: "Mar 10, 2023",
        kycStatus: "Under Review",
        lastUpdated: "Apr 22, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Under Review", date: "", url: "", notes: "" },
            driverLicense: { status: "Under Review", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Under Review", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Under Review", date: "", url: "", notes: "" },
        },
    },
    {
        id: "14",
        name: "Emma Brown",
        email: "emma.b@example.com",
        phone: "+1 (555) 777-8888",
        vehicle: "Nissan Rogue (2020)",
        licensePlate: "KLM-1234",
        joinDate: "Feb 25, 2023",
        kycStatus: "Documents Submitted",
        lastUpdated: "Apr 18, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Documents Submitted", date: "", url: "", notes: "" },
            driverLicense: { status: "Documents Submitted", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Documents Submitted", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Documents Submitted", date: "", url: "", notes: "" },
        },
    },
    {
        id: "15",
        name: "Liam Davis",
        email: "liam.d@example.com",
        phone: "+1 (555) 999-0000",
        vehicle: "Ford Explorer (2021)",
        licensePlate: "NOP-5678",
        joinDate: "Apr 2, 2023",
        kycStatus: "Approved",
        lastUpdated: "Apr 25, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
        documents: {
            idCard: { status: "Approved", date: "", url: "", notes: "" },
            driverLicense: { status: "Approved", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "Approved", date: "", url: "", notes: "" },
            insuranceDocument: { status: "Approved", date: "", url: "", notes: "" },
        },
    },
]

// Combine the original drivers with more drivers
const allDrivers = [...drivers, ...moreDrivers]

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

export default function DriverKycManagement() {
    const [selectedDriver, setSelectedDriver] = useState<IDriver>({
        id: "",
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        licensePlate: "",
        joinDate: "",
        kycStatus: "",
        lastUpdated: "",
        avatar: "",
        documents: {
            idCard: { status: "", date: "", url: "", notes: "" },
            driverLicense: { status: "", date: "", url: "", notes: "" },
            vehicleRegistration: { status: "", date: "", url: "", notes: "" },
            insuranceDocument: { status: "", date: "", url: "", notes: "" },
        },
    })

    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)

    const handleManageDriver = (driver: IDriver) => {
        setSelectedDriver(driver);
        localStorage.setItem("selectedDriver", JSON.stringify(driver));
    }

    // Calculate pagination
    const totalPages = Math.ceil(allDrivers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentDrivers = allDrivers.slice(startIndex, endIndex)

    return (
        <div className="h-screen overflow-hidden bg-slate-50 p-4">
            <div className="max-w-7xl mx-auto h-full">
                <Card className="shadow-sm border-slate-200 h-full flex flex-col">
                    <CardHeader className="pb-3 px-4 sm:px-6 flex-shrink-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-800">Driver KYC Management</CardTitle>
                                <CardDescription className="text-slate-500 mt-0.5">
                                    Verify and manage driver documentation
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-slate-200 text-slate-700">
                                    <Download className="h-4 w-4 mr-1" />
                                    Export
                                </Button>
                                <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-white">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Driver
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="px-4 sm:px-6 py-3 flex-shrink-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Search drivers..."
                                    className="pl-10 h-9 border-slate-200 focus-visible:ring-slate-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 w-full sm:w-auto">
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-full sm:w-[180px] h-9 border-slate-200 focus:ring-slate-400">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="under-review">Under Review</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                        <SelectItem value="documents-submitted">Documents Submitted</SelectItem>
                                        <SelectItem value="pending-submission">Pending Submission</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                >
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Filter</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>

                    <div className="px-4 sm:px-6 flex-grow flex flex-col overflow-hidden">
                        <div className="rounded-lg border border-slate-200 flex flex-col overflow-hidden h-full">
                            <div className="bg-slate-50 border-b border-slate-200 flex-shrink-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-slate-50 border-none">
                                            <TableHead className="w-[250px] text-slate-700 font-medium py-2">Driver</TableHead>
                                            <TableHead className="text-slate-700 font-medium py-2">Vehicle Info</TableHead>
                                            <TableHead className="hidden md:table-cell text-slate-700 font-medium py-2">Status</TableHead>
                                            <TableHead className="hidden sm:table-cell text-slate-700 font-medium py-2">
                                                Last Updated
                                            </TableHead>
                                            <TableHead className="text-right text-slate-700 font-medium py-2">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                </Table>
                            </div>
                            <div className="overflow-y-auto flex-grow">
                                <Table>
                                    <TableBody>
                                        {currentDrivers.map((driver) => (
                                            <TableRow key={driver.id} className="hover:bg-slate-50 border-slate-200">
                                                <TableCell className="py-2.5">
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
                                                <TableCell className="py-2.5">
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
                                                <TableCell className="hidden md:table-cell py-2.5">
                                                    {getStatusBadge(driver.kycStatus)}
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell py-2.5 text-slate-600 text-sm">
                                                    {driver.lastUpdated}
                                                </TableCell>
                                                <TableCell className="text-right py-2.5">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-7 text-xs border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium"
                                                        onClick={() => handleManageDriver(driver)}
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
                    </div>

                    <CardFooter className="flex flex-col sm:flex-row justify-between items-center border-t border-slate-200 px-6 py-3 gap-3 flex-shrink-0">
                        <div className="text-sm text-slate-500 order-2 sm:order-1">
                            Showing {startIndex + 1}-{Math.min(endIndex, allDrivers.length)} of {allDrivers.length} drivers
                        </div>
                        <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                className="h-8 border-slate-200 text-slate-700 hover:bg-slate-50"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                className="h-8 border-slate-200 text-slate-700 hover:bg-slate-50"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
