import {CheckCircle, CreditCard, DollarSign, Users} from "lucide-react";
import MetricCard from "@/components/MetricCard.tsx";

export default function MetricOverview () {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value="₳ 58,269.99" change="+12.5%" icon={<DollarSign />} />
        <MetricCard title="Active Drivers" value="124" change="+4.3%" icon={<Users />} />
        <MetricCard title="Completed Rides" value="1,893" change="+18.2%" icon={<CheckCircle />} />
        <MetricCard
            title="Avg. Ride Value"
            value="₳ 55.60"
            change="-2.1%"
            icon={<CreditCard />}
        />
    </div>
}