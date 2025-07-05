import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ride } from "@/interfaces/Ride";
import { Button } from "@/components/ui/button";

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

const getStatusBadge = (status: string) => {
    switch (status) {
        case "completed":
            return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Completed</Badge>
        case "in-progress":
            return <Badge className="bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100">In Progress</Badge>
        case "cancelled":
            return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">Cancelled</Badge>
        case "scheduled":
            return (
                <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">Scheduled</Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export function RidesTableList() {
  return (
    <div className="px-4 sm:px-6 flex-grow flex flex-col overflow-hidden">
        <div className="rounded-lg border border-slate-200 flex flex-col overflow-hidden h-full">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50 border-none">
                  <TableHead className="w-[20%] text-slate-700 font-medium py-2">Ride ID</TableHead>
                  <TableHead className="w-[25%] text-slate-700 font-medium py-2">Participants</TableHead>
                  <TableHead className="w-[25%] text-slate-700 font-medium py-2">Route</TableHead>
                  <TableHead className="w-[15%] text-slate-700 font-medium py-2">Status</TableHead>
                  <TableHead className="w-[15%] text-right text-slate-700 font-medium py-2">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto flex-grow">
                {rides.map((ride) => (
                  <TableRow key={ride.id} className="hover:bg-slate-50 border-slate-200">
                    <TableCell className="w-[20%] py-2.5 font-medium text-slate-800 text-sm">{ride.id}</TableCell>
                    <TableCell className="w-[25%] py-2.5">
                        <div>
                            <p className="text-sm text-slate-800">{`Driver: ${ride.driverName}`}</p>
                            <p className="text-xs text-slate-500">{`Passenger: ${ride.passengerName}`}</p>
                        </div>
                    </TableCell>
                    <TableCell className="w-[25%] py-2.5">
                        <div>
                            <p className="text-sm text-slate-800">{`${ride.startLocation} to ${ride.endLocation}`}</p>
                            <p className="text-xs text-slate-500">{ride.startTime}</p>
                        </div>
                    </TableCell>
                    <TableCell className="w-[15%] hidden md:table-cell py-2.5">
                        {getStatusBadge(ride.status)}
                    </TableCell>
                    <TableCell className="w-[15%] text-right py-2.5">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium"
                        >
                            Manage
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    </div>
  );
}
