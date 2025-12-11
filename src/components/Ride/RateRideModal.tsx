import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import api from "@/lib/axios";
import type { IRide } from "@/interfaces/User";

interface RateRideModalProps {
    ride: IRide | null;
    open: boolean;
    onClose: () => void;
    onRate: () => void;
}

export function RateRideModal({ ride, open, onClose, onRate }: RateRideModalProps) {
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!ride || score === 0) return;

        setLoading(true);
        try {
            await api.post('/book_rate_apis/ratings/', {
                ride: ride.uuid,
                score,
                comment,
                impression_option: ""
            });
            onRate();
            onClose();
            // Reset state
            setScore(0);
            setComment("");
        } catch (error) {
            console.error('Error submitting rating:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Rate your ride</DialogTitle>
                    <DialogDescription>
                        How was your trip with {ride?.driver?.user?.full_name}?
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-4">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                onClick={() => setScore(value)}
                                className="focus:outline-none transition-transform hover:scale-110"
                                type="button"
                            >
                                <Star
                                    className={`w-8 h-8 ${
                                        value <= score
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300 fill-gray-100"
                                    }`}
                                />
                            </button>
                        ))}
                    </div>
                    
                    <Textarea
                        placeholder="Tell us about your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full resize-none bg-gray-50 border-gray-200"
                        rows={4}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        disabled={score === 0 || loading}
                        className="bg-gray-900 text-white hover:bg-gray-800"
                    >
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
