export interface IRating {
    id: number;
    passenger: {
        id: number;
        avatar: string | null;
        full_name: string;
        email: string;
        country: string;
        current_location: [number, number];
        phone_number: string;
    };
    ride: string; // UUID matches IRide.uuid
    score: number;
    impression_option: string;
    comment: string;
    date_rated: string;
    created_at: string;
    updated_at: string;
}
