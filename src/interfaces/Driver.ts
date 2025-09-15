// import {IDocument} from "@/interfaces/Document.ts";
import type { IUser } from "@/interfaces/User";

export default interface IDriver {
    id: number;
    user: IUser;
    id_type: string;
    id_number: string;
    vehicle_plate_number: string;
    vehicle_type: string;
    vehicle_color: string;
    date_created: string;
    date_updated: string;
    online: boolean;
    status: "Approved" | "Under Review" | "Rejected" | "Documents Submitted" | "Not Submitted";
}