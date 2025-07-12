"use client"

import {useState} from "react"
import type IDriver from "@/interfaces/Driver.ts"
import {useNavigate} from "react-router-dom";
import DriversTableList from "@/components/Driver/DriversTableList.tsx";
import StatisticsCard from "@/components/StatisticsCard.tsx";

const allDrivers: IDriver[] = [
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



export default function DriverManagement() {
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
            idCard: {status: "", date: "", url: "", notes: ""},
            driverLicense: {status: "", date: "", url: "", notes: ""},
            vehicleRegistration: {status: "", date: "", url: "", notes: ""},
            insuranceDocument: {status: "", date: "", url: "", notes: ""},
        },
    })

    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedTimeframe, setSelectedTimeframe] = useState("This Month")
    const [selectedActiveTimeframe, setSelectedActiveTimeframe] = useState("Today")
    const [chartData] = useState([25, 40, 30, 45, 35, 55, 40, 60, 35, 45, 50, 40])
    const navigate = useNavigate();


    // Function to generate avatar background color based on name
    const generateAvatar = (name: string) => {
        const colors = [
            "bg-blue-500", "bg-red-500", "bg-green-500",
            "bg-yellow-500", "bg-purple-500", "bg-pink-500",
            "bg-indigo-500", "bg-teal-500"
        ];

        // Simple hash function to get consistent color for the same name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        return colors[Math.abs(hash) % colors.length];
    };

    const handleManageDriver = (driver: IDriver) => {
        setSelectedDriver(driver);
        localStorage.setItem("selectedDriver", JSON.stringify(driver));
        navigate(`/drivers/${driver.id}`);
    }

    // Calculate pagination
    const totalPages = Math.ceil(allDrivers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentDrivers = allDrivers.slice(startIndex, endIndex)

    return (
        <div className="flex-1 p-8">
            <div className="flex gap-6">
                {/* Drivers Overview Section */}
                <div className="w-80">
                    <div className="bg-gray-50 p-6 rounded-3xl">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Drivers Overview</h2>

                        {/* Total Drivers Card */}
                        <StatisticsCard cardTitle={"Total Drivers"}
                                        statLabel={"All Registered Drivers"}
                                        statValue={"1,245"} timeFrame={"Monthly"}
                                        statComponent={<div className="relative w-28 h-28 mx-auto">
                                            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="45"
                                                    fill="none"
                                                    stroke="#374151"
                                                    strokeWidth="6"
                                                />
                                                <circle
                                                    cx="60"
                                                    cy="60"
                                                    r="45"
                                                    fill="none"
                                                    stroke="#FFFFFF"
                                                    strokeWidth="6"
                                                    strokeDasharray={`${72 * 2 * Math.PI * 45 / 100} ${2 * Math.PI * 45}`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-2xl font-bold">72%</span>
                                            </div>
                                        </div>
                                        }/>

                        {/* Active Drivers Card */}
                        <StatisticsCard cardTitle={"Active Drivers"}
                                        statLabel={"Currently Online"}
                                        statValue={"312"} timeFrame={"24h"}
                                        statComponent={<div className="h-16 flex items-end justify-between">
                                            {chartData.map((value, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-green-500 rounded-t"
                                                    style={{
                                                        height: `${(value - 40) * 2}px`,
                                                        width: '3px'
                                                    }}
                                                />
                                            ))}
                                        </div>}/>

                        <StatisticsCard cardTitle={"Total Rides"} statLabel={"Completed this month"}
                                        statValue={"1,245"}/>
                    </div>
                </div>

                {/* Drivers Table Section */}
                <div className="flex-1">
                    <div className="bg-gray-50 px-6 py-3 rounded-3xl">

                        <DriversTableList 
                            drivers={currentDrivers} 
                            onManageClick={handleManageDriver}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
