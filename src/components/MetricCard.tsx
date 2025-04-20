import {ArrowUpRight, X} from "lucide-react";
import {Card, CardContent} from "./ui/card";

interface MetricCardProps {
    title: string;
    value: number | string;
    change: string;
    icon: React.ReactNode;
}

export default function MetricCard({ title, value, change, icon}: MetricCardProps) {
    const isNegative = change.startsWith("-");
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-500">{title}</p>
                        <p className="text-2xl font-bold mt-1">{value}</p>
                        <div className={`flex items-center mt-2 text-xs ${isNegative ? "text-red-500" : "text-green-500"}`}>
                            {isNegative ? <X className="h-3 w-3 mr-1" /> : <ArrowUpRight className="h-3 w-3 mr-1" />}
                            <span>{change} from last month</span>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-md">{icon}</div>
                </div>
            </CardContent>
        </Card>
    )
}