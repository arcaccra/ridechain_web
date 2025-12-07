import StatisticsCard from "@/components/StatisticsCard";
import {MapView} from "@/components/MapView.tsx";
import useSummaryData from '@/hooks/useSummaryData';

function Sparkline({ points = [] }: { points: number[] }) {
    if (!points || points.length === 0) return <svg className="w-24 h-6" />;
    const width = 120;
    const height = 36;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const step = width / (points.length - 1 || 1);
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - ((p - min) / range) * height}`).join(' ');
    return (
        <svg width={width} height={height} className="block">
            <path d={path} fill="none" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function DashboardOverview() {
    const { summary, loading } = useSummaryData();

    const usersSeries = summary?.usersByDay?.map(s => s.value) ?? [];
    const ridesSeries = summary?.ridesByDay?.map(s => s.value) ?? [];

    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Total Rides */}
                <StatisticsCard 
                    cardTitle="Total Rides"
                    statLabel="All time"
                    statValue={loading ? '—' : String(summary?.ridesCount ?? 0)}
                    timeFrame="This month"
                    statComponent={<div className="mt-2"><Sparkline points={ridesSeries} /></div>}
                />

                {/* Active Drivers */}
                <StatisticsCard 
                    cardTitle="Active Drivers"
                    statLabel="Currently Online"
                    statValue={loading ? '—' : String(summary?.approvedDrivers ?? 0)}
                    timeFrame="24h"
                />

                {/* Active Users */}
                <StatisticsCard 
                    cardTitle="Active Users"
                    statLabel="Last 7 days"
                    statValue={loading ? '—' : String(summary?.activeUsers ?? 0)}
                    timeFrame="Live"
                    statComponent={<div className="mt-2"><Sparkline points={usersSeries} /></div>}
                />
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden">
                    <MapView />
            </div>
        </div>
    )
}
