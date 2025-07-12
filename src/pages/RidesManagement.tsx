import { RidesTableList } from "@/components/Ride/RidesTableList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function RidesManagement() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rides Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Ride
        </Button>
      </div>
      <RidesTableList />
    </div>
  );
}