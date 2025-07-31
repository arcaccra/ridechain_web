"use client"
import {useState} from "react"
import type IDriver from "@/interfaces/Driver.ts"
import {useNavigate} from "react-router-dom";
import DriversTableList from "@/components/Driver/DriversTableList.tsx";
import StatisticsCard from "@/components/StatisticsCard.tsx";
import useFetchData from "@/hooks/useFetchData.tsx";

export default function DriverManagement() {
    const [selectedDriver, setSelectedDriver] = useState<IDriver | null>(null)

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

    const {data, isLoading, isError} = useFetchData(`/apis/accounts/drivers/`, ["drivers"],
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }, true, 1000 * 60 * 60 * 3
    )

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {(isError as any).message}</div>
    if (!data) return <div>Error: No data</div>

    const allDrivers: IDriver[] = data || [];
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
                                        statValue={allDrivers.length.toString()} timeFrame={"Monthly"}
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
                                        statValue={allDrivers.filter(d => d.online).length.toString()} timeFrame={"24h"}
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
