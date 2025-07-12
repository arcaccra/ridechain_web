import {DashboardOverview} from "@/components/Dashboard/DashboardOverview.tsx";
import {RideVolumeOverview} from "@/components/Dashboard/RideVolumeOverview.tsx";
import {Ride} from "@/interfaces/Ride.ts";
import {RidesTableList} from "@/components/Ride/RidesTableList.tsx";

const rides: Ride[] = [
    {
        id: "RIDE001",
        driverName: "Kwame Appiah",
        passengerName: "Ama Serwaa",
        startLocation: "Accra Mall",
        endLocation: "East Legon",
        startTime: "2024-07-26 10:00",
        endTime: "2024-07-26 10:30",
        status: "completed",
        fare: 25.00,
    },
    {
        id: "RIDE002",
        driverName: "Kofi Mensah",
        passengerName: "Yaw Donkor",
        startLocation: "Circle",
        endLocation: "Osu",
        startTime: "2024-07-26 11:00",
        endTime: "2024-07-26 11:45",
        status: "in-progress",
        fare: 30.00,
    },
    {
        id: "RIDE003",
        driverName: "Adwoa Boateng",
        passengerName: "Esi Parker",
        startLocation: "Labadi",
        endLocation: "Airport",
        startTime: "2024-07-27 09:00",
        endTime: "",
        status: "scheduled",
        fare: 40.00,
    },
    {
        id: "RIDE004",
        driverName: "Yaw Asante",
        passengerName: "Kojo Williams",
        startLocation: "Spintex",
        endLocation: "Tema",
        startTime: "2024-07-25 14:00",
        endTime: "2024-07-25 14:15",
        status: "cancelled",
        fare: 35.00,
    },
];

export default function Dashboard () {
    return <div className="flex h-screen bg-white">
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex gap-3">
                <div className="flex-1 overflow-y-auto flex flex-col ">
                    <div className="m-6 p-6 bg-[#FAFAFA] rounded-3xl h-full space-y-6">
                        <DashboardOverview />
                        <RidesTableList rides={rides} />
                    </div>
                </div>
                <RideVolumeOverview/>
            </div>
        </div>
    </div>
}
