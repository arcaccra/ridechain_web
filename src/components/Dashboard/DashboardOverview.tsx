import StatisticsCard from "@/components/StatisticsCard";
import {MapView} from "@/components/MapView.tsx";

export function DashboardOverview() {
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Total Rides */}
                <StatisticsCard 
                    cardTitle="Total Rides"
                    statLabel="Completed this month"
                    statValue="1,245"
                    timeFrame="This month"
                />

                {/* Active Drivers */}
                <StatisticsCard 
                    cardTitle="Active Drivers"
                    statLabel="Currently Online"
                    statValue="320"
                    timeFrame="24h"
                />

                {/* Active Users */}
                <StatisticsCard 
                    cardTitle="Active Users"
                    statLabel="Using the app now"
                    statValue="2,870"
                    timeFrame="Live"
                />
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden">
                    <MapView />
            </div>
        </div>
    )
}
