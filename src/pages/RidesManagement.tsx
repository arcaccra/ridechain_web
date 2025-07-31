import { RidesTableList } from "@/components/Ride/RidesTableList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {Ride} from "@/interfaces/Ride.ts";
import {MapView} from "@/components/MapView.tsx";

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

export default function RidesManagement() {
  return (
    <div className="flex-1 p-8 h-full">
      <div className="flex gap-6 h-full">
          {/* Rides Table Section - 40% width */}
          <div className="w-[40%]">
              <div className="bg-gray-50 px-6 py-3 rounded-3xl h-full">
                  <h2 className="text-lg font-semibold text-gray-900 p-6">Real Time Rides</h2>
                  <RidesTableList rides={rides} />
              </div>
          </div>

        {/* Map View Section - 60% width */}
        <div className="w-[60%]">
          <div className="bg-gray-50 p-6 rounded-3xl h-full">
              <div className="h-full">
                <MapView />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
