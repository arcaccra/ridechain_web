import {CheckCircle, CreditCard, Users} from "lucide-react";
import MetricCard from "@/components/MetricCard.tsx";

export default function Dashboard () {
    return <div className="w-full p-5">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Admin</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Total Revenue" value="₳ 58,269.99" change="+12.5%" icon={<Users />} />
                <MetricCard title="Active Drivers" value="124" change="+4.3%" icon={<Users />} />
                <MetricCard title="Completed Rides" value="1,893" change="+18.2%" icon={<CheckCircle />} />
                <MetricCard
                    title="Avg. Ride Value"
                    value="₳ 55.60"
                    change="-2.1%"
                    icon={<CreditCard />}
                />
            </div>
        </div>
    </div>
}