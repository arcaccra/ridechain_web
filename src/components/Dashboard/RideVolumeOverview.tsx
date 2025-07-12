import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const rideVolumeData = [
    { avatar: "MS", value: 56 },
    { avatar: "JD", value: 64 },
    { avatar: "CG", value: 76 },
    { avatar: "LT", value: 78 },
    { avatar: "JC", value: 70 },
    { avatar: "MG", value: 37 },
]

const topRiders = [
    { name: "Jayton Donin", percentage: 71.5, avatar: "JD" },
    { name: "Craig George", percentage: 48.4, avatar: "CG" },
]

export function RideVolumeOverview() {
    return (
        <div className="w-96 m-6 p-6 bg-[#FAFAFA] rounded-3xl flex flex-col space-y-6">
            {/* Ride Volume */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Volume</h3>
                <div className="space-y-4">
                    {/* Scale */}
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>0</span>
                        <span>20</span>
                        <span>40</span>
                        <span>60</span>
                        <span>80</span>
                        <span>100</span>
                    </div>

                    {rideVolumeData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">{item.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 relative">
                                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gray-800 rounded-full transition-all duration-300"
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                                <span className="absolute right-2 top-0 text-xs font-medium text-white leading-6">{item.value}</span>
                            </div>
                        </div>
                    ))}

                    <div className="text-right text-xs text-gray-500 mt-4">2025</div>
                </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-[#2a2a2a] rounded-2xl p-6 text-white">
                <h3 className="text-sm font-normal text-gray-400 mb-4">Total Revenue</h3>
                <div className="text-sm text-gray-400 mb-4">This month</div>
                <div className="text-3xl font-bold mb-6">A 18,400</div>

                {/* Line Chart */}
                <div className="h-16 relative">
                    <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <path
                            d="M 0 40 Q 20 35 40 30 T 80 25 Q 100 20 120 15 T 160 20 Q 180 25 200 30"
                            stroke="white"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <circle cx="160" cy="20" r="4" fill="white" />
                    </svg>
                </div>
            </div>

            {/* Top Riders */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top Riders</h3>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {topRiders.map((rider, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                                    {rider.avatar}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">{rider.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{rider.percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-gray-800 rounded-full" style={{ width: `${rider.percentage}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
