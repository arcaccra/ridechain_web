import StatisticsCard from "@/components/StatisticsCard";

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
            <div className="bg-[#2a2a2a] rounded-2xl p-0 mb-6 overflow-hidden">
                <div className="h-80 relative bg-gray-900">
                    {/* Map Background */}
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.3" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#mapGrid)" />

                            {/* Streets */}
                            <g opacity="0.4">
                                <path d="M 0 100 L 1000 120" stroke="#4B5563" strokeWidth="2" />
                                <path d="M 0 200 L 1000 210" stroke="#4B5563" strokeWidth="3" />
                                <path d="M 0 300 L 1000 290" stroke="#4B5563" strokeWidth="2" />
                                <path d="M 150 0 L 160 400" stroke="#4B5563" strokeWidth="2" />
                                <path d="M 400 0 L 420 400" stroke="#4B5563" strokeWidth="3" />
                                <path d="M 700 0 L 680 400" stroke="#4B5563" strokeWidth="2" />
                            </g>
                        </svg>
                    </div>

                    {/* Map Markers */}
                    <div className="absolute inset-0">
                        {[
                            { x: 15, y: 25, value: "159,317" },
                            { x: 35, y: 15, value: "234,891" },
                            { x: 55, y: 35, value: "178,456" },
                            { x: 75, y: 20, value: "298,123" },
                            { x: 25, y: 55, value: "145,678" },
                            { x: 65, y: 65, value: "267,890" },
                            { x: 85, y: 45, value: "189,234" },
                            { x: 45, y: 75, value: "156,789" },
                        ].map((marker, index) => (
                            <div
                                key={index}
                                className="absolute text-xs font-mono text-green-400 bg-green-900/20 px-2 py-1 rounded backdrop-blur-sm"
                                style={{
                                    left: `${marker.x}%`,
                                    top: `${marker.y}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                {marker.value}
                            </div>
                        ))}
                    </div>

                    {/* Active Dots */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 25 }).map((_, index) => (
                            <div
                                key={index}
                                className="absolute w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                style={{
                                    left: `${Math.random() * 90 + 5}%`,
                                    top: `${Math.random() * 80 + 10}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
