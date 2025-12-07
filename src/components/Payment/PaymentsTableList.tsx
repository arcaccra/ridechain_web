import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Payment } from "@/interfaces/Payment";
import { Button } from "@/components/ui/button";

const payments: Payment[] = [
    {
        id: "PAY001",
        rideId: "RIDE001",
        driverName: "Kwame Appiah",
        passengerName: "Ama Serwaa",
        amount: 25.00,
        date: "2024-07-26",
        status: "completed",
    },
    {
        id: "PAY002",
        rideId: "RIDE002",
        driverName: "Kofi Mensah",
        passengerName: "Yaw Donkor",
        amount: 30.00,
        date: "2024-07-26",
        status: "pending",
    },
    {
        id: "PAY003",
        rideId: "RIDE004",
        driverName: "Yaw Asante",
        passengerName: "Kojo Williams",
        amount: 35.00,
        date: "2024-07-25",
        status: "failed",
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "completed":
            return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Completed</Badge>
        case "pending":
            return <Badge className="bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100">Pending</Badge>
        case "failed":
            return <Badge className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">Failed</Badge>
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export function PaymentsTableList() {
  return (
    <div className="px-4 sm:px-6 flex-grow flex flex-col overflow-hidden">
        <div className="rounded-lg border border-slate-200 flex flex-col overflow-hidden h-full">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50 border-none">
                  <TableHead className="w-[20%] text-slate-700 font-medium py-2">Payment ID</TableHead>
                  <TableHead className="w-[25%] text-slate-700 font-medium py-2">Participants</TableHead>
                  <TableHead className="w-[20%] text-slate-700 font-medium py-2">Date</TableHead>
                  <TableHead className="w-[15%] text-slate-700 font-medium py-2">Status</TableHead>
                  <TableHead className="w-[20%] text-right text-slate-700 font-medium py-2">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto flex-grow">
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50 border-slate-200">
                    <TableCell className="w-[20%] py-2.5 font-medium text-slate-800 text-sm">{payment.id}</TableCell>
                    <TableCell className="w-[25%] py-2.5">
                        <div>
                            <p className="text-sm text-slate-800">{`Driver: ${payment.driverName}`}</p>
                            <p className="text-xs text-slate-500">{`Passenger: ${payment.passengerName}`}</p>
                        </div>
                    </TableCell>
                    <TableCell className="w-[20%] py-2.5 text-sm text-slate-800">{payment.date}</TableCell>
                    <TableCell className="w-[15%] hidden md:table-cell py-2.5">
                        {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell className="w-[20%] text-right py-2.5 font-medium text-slate-800 text-sm">{`₳ ${payment.amount.toFixed(2)}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    </div>
  );
}
