import {IDocument} from "@/interfaces/Document.ts";

export default interface IDriver {
    id: string;
    name: string;
    email: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
    joinDate: string;
    kycStatus: string;
    lastUpdated: string;
    avatar: string;
    documents: {
        [key: string]: IDocument;
    };
}