import {ChevronDown} from "lucide-react";

interface IStatisticsCardProps {
    cardTitle: string;
    statLabel: string;
    statValue: string;
    timeFrame?: string;
    statComponent?: React.ReactNode;
}
export default function StatisticsCard({cardTitle, statLabel, statValue, timeFrame, statComponent}: IStatisticsCardProps) {
    return  <div className="bg-[#1E1E1E] rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">{cardTitle}</h3>
            {timeFrame && <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                <span className="text-xs">{timeFrame}</span>
                <ChevronDown className="w-3 h-3 ml-1" />
            </div>}
        </div>
        <div className="text-3xl font-bold mb-1">{statValue}</div>
        <div className="text-sm text-gray-400 mb-6">{statLabel}</div>
        {statComponent ?? null}
        </div>
}