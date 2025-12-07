import { UsersTableList } from "@/components/User/UsersTableList";
import type { IUserTable } from "@/interfaces/User";
import { useState } from "react";

// Dummy user data (kept for local testing; router now uses UsersManagement)
const dummyUsers: IUserTable[] = [];

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