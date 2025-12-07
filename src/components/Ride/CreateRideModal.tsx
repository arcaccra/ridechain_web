import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { LocationSearch, Location } from "./LocationSearch";
import api from "@/lib/axios";
import { toast } from "sonner";

interface CreateRideModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRideCreated?: () => void;
}

export function CreateRideModal({ open, onOpenChange, onRideCreated }: CreateRideModalProps) {
    const [loading, setLoading] = useState(false);
    const [pickup, setPickup] = useState<Location | null>(null);
    const [dropoff, setDropoff] = useState<Location | null>(null);
    const [departureTime, setDepartureTime] = useState("");
    const [price, setPrice] = useState("");
    const [seats, setSeats] = useState("3");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!pickup || !dropoff) {
            toast.error("Please select both pickup and dropoff locations");
            return;
        }

        if (!departureTime) {
            toast.error("Please select a departure time");
            return;
        }

        if (!price) {
            toast.error("Please enter a price");
            return;
        }

        try {
            setLoading(true);
            await api.post("/rides_apis/rides/", {
                pick_up: pickup.id,
                drop_off: dropoff.id,
                departure_time: new Date(departureTime).toISOString(),
                seats_available: parseInt(seats),
                price_per_seat: price
            });
            
            toast.success("Ride created successfully");
            onOpenChange(false);
            if (onRideCreated) onRideCreated();
            
            // Reset form
            setPickup(null);
            setDropoff(null);
            setDepartureTime("");
            setPrice("");
            setSeats("3");
        } catch (error) {
            console.error("Error creating ride:", error);
            toast.error("Failed to create ride. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Trip</DialogTitle>
                    <DialogDescription>
                        Set up a new ride for passengers to book.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <LocationSearch 
                            label="Pickup Location" 
                            placeholder="Search pickup location..."
                            onSelect={setPickup}
                        />
                        {pickup && <p className="text-xs text-green-600">Selected: {pickup.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <LocationSearch 
                            label="Dropoff Location" 
                            placeholder="Search dropoff location..."
                            onSelect={setDropoff}
                        />
                        {dropoff && <p className="text-xs text-green-600">Selected: {dropoff.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="departure">Departure</Label>
                            <Input 
                                id="departure" 
                                type="datetime-local" 
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="seats">Seats</Label>
                            <Input 
                                id="seats" 
                                type="number" 
                                min="1" 
                                max="10" 
                                value={seats}
                                onChange={(e) => setSeats(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price per Seat (ADA)</Label>
                        <Input 
                            id="price" 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            placeholder="e.g. 15.50"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Trip
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
