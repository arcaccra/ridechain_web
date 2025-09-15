import {DashboardOverview} from "@/components/Dashboard/DashboardOverview.tsx";
import {RideVolumeOverview} from "@/components/Dashboard/RideVolumeOverview.tsx";
import { Ride } from "@/interfaces/Ride";
import {RidesTableList} from "@/components/Ride/RidesTableList.tsx";

const rides: Ride[] = [
  {
    uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
    driver: {
      id: 1,
      user: { full_name: "Kwame Appiah", avatar: "" },
      vehicle_plate_number: "GR-1234-23",
      vehicle_type: "Toyota Corolla",
      vehicle_color: "Blue",
      online: true,
    },
    pick_up: { id: 1, name: "Accra Mall", latitude: 5.620, longitude: -0.169 },
    drop_off: { id: 2, name: "East Legon", latitude: 5.639, longitude: -0.163 },
    seats_available: 3,
    price_per_seat: "25.00",
    created_at: "2024-07-26T10:00:00Z",
    status: "completed",
  },
  {
    uuid: "d2a50b74-0e5f-4f2b-8f2a-2c4b8a7b9e0a",
    driver: {
      id: 2,
      user: { full_name: "Kofi Mensah", avatar: "" },
      vehicle_plate_number: "GE-5678-24",
      vehicle_type: "Hyundai i10",
      vehicle_color: "White",
      online: false,
    },
    pick_up: { id: 3, name: "Circle", latitude: 5.57, longitude: -0.21 },
    drop_off: { id: 4, name: "Osu", latitude: 5.56, longitude: -0.17 },
    seats_available: 2,
    price_per_seat: "30.00",
    created_at: "2024-07-26T11:00:00Z",
    status: "in-progress",
  },
  {
    uuid: "4e7b5a3b-6c1d-4a9a-9b4a-8a3f3b1b2c3d",
    driver: {
      id: 3,
      user: { full_name: "Adwoa Boateng", avatar: "" },
      vehicle_plate_number: "GT-9012-24",
      vehicle_type: "Kia Picanto",
      vehicle_color: "Red",
      online: true,
    },
    pick_up: { id: 5, name: "Labadi", latitude: 5.57, longitude: -0.13 },
    drop_off: { id: 6, name: "Airport", latitude: 5.61, longitude: -0.17 },
    seats_available: 4,
    price_per_seat: "40.00",
    created_at: "2024-07-27T09:00:00Z",
    status: "scheduled",
  },
  {
    uuid: "8f6a2d1c-7b8e-4c2a-9e1d-5f4a3b2c1d0e",
    driver: {
      id: 4,
      user: { full_name: "Yaw Asante", avatar: "" },
      vehicle_plate_number: "GS-3456-23",
      vehicle_type: "Nissan Versa",
      vehicle_color: "Silver",
      online: false,
    },
    pick_up: { id: 7, name: "Spintex", latitude: 5.64, longitude: -0.11 },
    drop_off: { id: 8, name: "Tema", latitude: 5.67, longitude: -0.01 },
    seats_available: 1,
    price_per_seat: "35.00",
    created_at: "2024-07-25T14:00:00Z",
    status: "cancelled",
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
