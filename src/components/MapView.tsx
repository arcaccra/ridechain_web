"use client"

const mapMarkers = [
    { x: 15, y: 12, value: "232,866" },
    { x: 85, y: 8, value: "376,139" },
    { x: 92, y: 15, value: "358,364" },
    { x: 78, y: 28, value: "616,840" },
    { x: 25, y: 35, value: "121,169" },
    { x: 45, y: 42, value: "1296,036" },
    { x: 52, y: 45, value: "96,787" },
    { x: 35, y: 52, value: "157,345" },
    { x: 88, y: 58, value: "20,914" },
    { x: 95, y: 62, value: "18,247" },
    { x: 28, y: 68, value: "1045,781" },
    { x: 42, y: 72, value: "1537,987" },
    { x: 48, y: 75, value: "1018,616" },
    { x: 65, y: 78, value: "139,770" },
    { x: 75, y: 82, value: "157,987" },
    { x: 82, y: 85, value: "1053,987" },
    { x: 18, y: 88, value: "304,588" },
    { x: 35, y: 92, value: "1046,668" },
]

const activeRides = [
    { x: 22, y: 18 },
    { x: 45, y: 25 },
    { x: 67, y: 32 },
    { x: 38, y: 45 },
    { x: 72, y: 52 },
    { x: 28, y: 58 },
    { x: 85, y: 65 },
    { x: 42, y: 72 },
    { x: 58, y: 78 },
    { x: 75, y: 85 },
    { x: 32, y: 88 },
    { x: 88, y: 92 },
    { x: 15, y: 35 },
    { x: 92, y: 42 },
    { x: 55, y: 48 },
    { x: 78, y: 55 },
    { x: 25, y: 62 },
    { x: 68, y: 68 },
    { x: 82, y: 75 },
    { x: 48, y: 82 },
    { x: 12, y: 25 },
    { x: 95, y: 35 },
    { x: 38, y: 55 },
    { x: 72, y: 65 },
    { x: 58, y: 38 },
    { x: 85, y: 48 },
    { x: 28, y: 75 },
    { x: 65, y: 85 },
]

export function MapView() {
    return (
        <div className="flex-1 relative bg-gray-900 overflow-hidden">
            {/* Street Grid Background */}
            <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.3" opacity="0.3" />
                        </pattern>
                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <rect width="100" height="100" fill="url(#smallGrid)" />
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#4B5563" strokeWidth="0.8" opacity="0.4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Major Streets */}
                    <g opacity="0.6">
                        <path d="M 0 150 L 1000 180" stroke="#6B7280" strokeWidth="3" />
                        <path d="M 0 300 L 1000 320" stroke="#6B7280" strokeWidth="2.5" />
                        <path d="M 0 450 L 1000 470" stroke="#6B7280" strokeWidth="3" />
                        <path d="M 0 600 L 1000 620" stroke="#6B7280" strokeWidth="2" />
                        <path d="M 0 750 L 1000 780" stroke="#6B7280" strokeWidth="2.5" />

                        <path d="M 120 0 L 140 1000" stroke="#6B7280" strokeWidth="2" />
                        <path d="M 280 0 L 300 1000" stroke="#6B7280" strokeWidth="3" />
                        <path d="M 450 0 L 470 1000" stroke="#6B7280" strokeWidth="2.5" />
                        <path d="M 620 0 L 640 1000" stroke="#6B7280" strokeWidth="2" />
                        <path d="M 780 0 L 800 1000" stroke="#6B7280" strokeWidth="2.5" />
                    </g>

                    {/* Diagonal Streets */}
                    <g opacity="0.4">
                        <path d="M 0 0 L 400 600" stroke="#6B7280" strokeWidth="2" />
                        <path d="M 600 0 L 1000 400" stroke="#6B7280" strokeWidth="1.5" />
                        <path d="M 200 1000 L 800 200" stroke="#6B7280" strokeWidth="1.8" />
                    </g>
                </svg>
            </div>

            {/* Map Markers with Values */}
            <div className="absolute inset-0">
                {mapMarkers.map((marker, index) => (
                    <div
                        key={index}
                        className="absolute text-xs font-mono text-green-400 font-medium bg-green-900/20 px-1.5 py-0.5 rounded backdrop-blur-sm"
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

            {/* Active Ride Dots */}
            <div className="absolute inset-0">
                {activeRides.map((ride, index) => (
                    <div
                        key={index}
                        className="absolute w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"
                        style={{
                            left: `${ride.x}%`,
                            top: `${ride.y}%`,
                            transform: "translate(-50%, -50%)",
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Additional Small Dots */}
            <div className="absolute inset-0">
                {Array.from({ length: 15 }).map((_, index) => (
                    <div
                        key={index}
                        className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60"
                        style={{
                            left: `${Math.random() * 95 + 2.5}%`,
                            top: `${Math.random() * 95 + 2.5}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
