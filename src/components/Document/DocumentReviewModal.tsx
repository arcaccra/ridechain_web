import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {IDocument} from "@/interfaces/Document.ts";

export default function DocumentReviewModal({ document, isOpen, onClose }: {
    document: IDocument | undefined;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [reviewNotes, setReviewNotes] = useState(document?.notes || "");

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose() }>
            <DialogContent className="max-w-3xl border-0">
                <DialogHeader>
                    <DialogTitle>Review {"Title"}</DialogTitle>
                    <DialogDescription>
                        Submitted on {document?.date}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="relative aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={document?.url}
                            alt={"title"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Review Notes</Label>
                        <Textarea
                            className="bg-gray-100 border-0"
                            id="notes"
                            placeholder="Add your review notes here..."
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={4}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <div className="flex justify-between w-full">
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="destructive" onClick={() => {}}>
                                <ThumbsDown className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                            <Button variant="outline">
                                <ThumbsUp className="h-4 w-4 mr-2" onClick={()=>{}} />
                                Approve
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}