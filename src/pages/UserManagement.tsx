import { UsersTableList } from "@/components/User/UsersTableList";
import type { IUserTable } from "@/interfaces/User";
import { useState } from "react";

// Dummy user data (kept for local testing; router now uses UsersManagement)
const dummyUsers: IUserTable[] = [
    {
        id: 1,
        full_name: "John Doe",
        email: "john.doe@example.com",
        avatar: "",
        phone_number: "0556535321",
        status: "active",
        role: "Admin",
        created_at: "0244658796"
    },
    {
        id: 2,
        full_name: "Jane Smith",
        email: "jane.smith@example.com",
        avatar: "",
        phone_number: "0244658736",
        status: "active",
        role: "User",
        created_at: "2024-07-10T14:45:00Z"
    },
    {
        id: 3,
        full_name: "Robert Johnson",
        email: "robert.johnson@example.com",
        avatar: "",
        phone_number: "0244658888",
        status: "inactive",
        role: "User",
        created_at: "2024-06-25T09:15:00Z"
    },
    {
        id: 4,
        full_name: "Emily Davis",
        email: "emily.davis@example.com",
        avatar: "",
        phone_number: "0244658677",
        status: "pending",
        role: "Manager",
        created_at: "2024-08-01T11:20:00Z"
    },
    {
        id: 5,
        full_name: "Michael Wilson",
        email: "michael.wilson@example.com",
        avatar: "",
        phone_number: "0244658473",
        status: "active",
        role: "User",
        created_at: "2024-07-20T16:10:00Z"
    }
];

// Number of users per page
const USERS_PER_PAGE = 3;

export default function UserManagement() {
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate pagination
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = dummyUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
    const totalPages = Math.ceil(dummyUsers.length / USERS_PER_PAGE);

    return (
        <div className="flex-1 p-8 h-full">
            <div className="flex flex-col gap-6 h-full">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                </div>

                {/* Users Table Section */}
                <div className="bg-gray-50 px-6 py-3 rounded-3xl h-full">
                    <h2 className="text-lg font-semibold text-gray-900 p-6">All Users</h2>
                    <UsersTableList 
                        users={paginatedUsers} 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}