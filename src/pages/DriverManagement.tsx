"use client"
import {useState} from "react"
import type IDriver from "@/interfaces/Driver.ts"
import {useNavigate} from "react-router-dom";
import DriversTableList from "@/components/Driver/DriversTableList.tsx";
import useFetchData from "@/hooks/useFetchData.tsx";
import StatisticsCard from "@/components/StatisticsCard";

export default function DriverManagement() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [itemsPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate();

    const handleManageDriver = (driver: IDriver) => {
        localStorage.setItem("selectedDriver", JSON.stringify(driver));
        navigate(`/drivers/${driver.id}`);
    }

    const {data, isLoading, isError} = useFetchData(`/accounts/drivers/`, ["drivers"],
        {}, true, 1000 * 60 * 60 * 3
    )

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: An error occurred</div>;
    if (!data) return <div>Error: No data</div>;

    const allDrivers: IDriver[] = Array.isArray(data) ? data : [];

    // Overview stats
    const totalDrivers = allDrivers.length;
    const approvedDrivers = allDrivers.filter(d => d.status === 'Approved').length;
    const underReviewDrivers = allDrivers.filter(d => d.status === 'Under Review').length;
    const rejectedDrivers = allDrivers.filter(d => d.status === 'Rejected').length;

    // Filter logic
    const filteredDrivers = allDrivers
        .filter(driver => statusFilter === "all" || driver.status?.toLowerCase() === statusFilter.toLowerCase())
        .filter(driver =>
            driver.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            driver.user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Pagination
    const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentDrivers = filteredDrivers.slice(startIndex, endIndex)

    return (
        <div className="flex-1 p-8">
            <div className="flex gap-6">
                {/* Drivers Overview Section */}
                <div className="w-80">
                    <div className="bg-gray-50 p-6 rounded-3xl">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Drivers Overview</h2>
                        <StatisticsCard cardTitle="Total Drivers" statValue={String(totalDrivers)} statLabel="Registered drivers" />
                        <StatisticsCard cardTitle="Approved" statValue={String(approvedDrivers)} statLabel="Drivers approved to operate" />
                        <StatisticsCard cardTitle="Under Review" statValue={String(underReviewDrivers)} statLabel="Drivers pending review" />
                        <StatisticsCard cardTitle="Rejected" statValue={String(rejectedDrivers)} statLabel="Drivers rejected" />
                    </div>
                </div>
                {/* Drivers Table Section */}
                <div className="flex-1">
                    <div className="bg-gray-50 px-6 py-3 rounded-3xl">
                        {/* Filters */}
                        <div className="flex gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="border rounded px-2 py-1"
                            />
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Approved">Approved</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <DriversTableList
                            drivers={currentDrivers}
                            onManageClick={handleManageDriver}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            statusFilter={statusFilter}
                            onStatusFilterChange={setStatusFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}