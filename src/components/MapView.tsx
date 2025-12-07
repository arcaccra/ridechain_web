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



export function MapView() {
    return (
        <div className="h-full bg-[#2a2a2a] rounded-2xl p-0 overflow-hidden">
            <div className="h-full relative bg-gray-900">
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
                    {mapMarkers.map((marker, index) => (
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
    )
}
