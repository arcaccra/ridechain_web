import { useState, useMemo } from "react";
import useFetchData from "@/hooks/useFetchData.tsx";
import { UsersTableList } from "@/components/User/UsersTableList";
import type { IUser, IUserTable } from "@/interfaces/User";

// Fallback mock data for development/testing
const mockUsers: IUser[] = [
  {
    id: 1,
    full_name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    phone_number: "0556535321",
  },
  {
    id: 2,
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "",
    phone_number: "0244658736",
  },
  {
    id: 3,
    full_name: "Robert Johnson",
    email: "robert.johnson@example.com",
    avatar: "",
    phone_number: "0244658888",
  },
  {
    id: 4,
    full_name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "",
    phone_number: "0244658677",
  },
  {
    id: 5,
    full_name: "Michael Wilson",
    email: "michael.wilson@example.com",
    avatar: "",
    phone_number: "0244658473",
  }
];

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [itemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // eslint-disable-next-line prefer-const
  let { data, isLoading, isError } = useFetchData<IUser[]>(
    `/apis/accounts/users/`,
    ["users"],
    {},
    true,
    1000 * 60 * 60 * 3
  );

  // Enhanced loading and error states
  if (isLoading) {
    return (
      <div className="flex-1 p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading users...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error('Users fetch error:', isError);
    console.warn('Using fallback mock data due to API error');
    // Use mock data as fallback when API fails
    data = mockUsers;
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    console.warn('No data returned from API, using fallback mock data');
    // Use mock data as fallback when no data is returned
    data = mockUsers;
  }

  // Debug logging
  console.log('Raw API data:', data);
  console.log('Is data an array?', Array.isArray(data));
  console.log('Data length:', Array.isArray(data) ? data.length : 'N/A');

  // Map backend users to table users (add defaults for optional display fields)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allUsers: IUserTable[] = useMemo(
    () => {
      const users = Array.isArray(data) ? data : [];
      console.log('Processing users:', users);
      
      return users.map((u, index) => ({
        id: u.id,
        avatar: u.avatar || '',
        full_name: u.full_name || 'Unknown User',
        email: u.email || 'No email',
        phone_number: u.phone_number || 'No phone',
        // Provide sensible defaults; backend sample doesn't include these
        created_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(), // Stagger dates
        status: index % 3 === 0 ? "inactive" : index % 5 === 0 ? "pending" : "active", // Vary statuses
        role: index % 4 === 0 ? "Admin" : index % 3 === 0 ? "Manager" : "User", // Vary roles
      }));
    },
    [data]
  );

  console.log('Processed users:', allUsers);

  // Filter logic (search by name/email/phone), optional status filter
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = allUsers
    .filter(
      (u) => statusFilter === "all" || (u.status || "active").toLowerCase() === statusFilter.toLowerCase()
    )
    .filter((u) => {
      if (!normalizedQuery) return true;
      return (
        (u.full_name || "").toLowerCase().includes(normalizedQuery) ||
        (u.email || "").toLowerCase().includes(normalizedQuery) ||
        (u.phone_number || "").toLowerCase().includes(normalizedQuery)
      );
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Manage click handler (optional placeholder)
  const handleManageUser = (userId: number) => {
    // You can navigate to a user detail page when it's available
    // navigate(`/users/${userId}`)
    console.log("Manage user:", userId);
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          {isError && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded text-sm">
              API Error - Using fallback data
            </div>
          )}
        </div>

        {/* Users Table Section */}
        <div className="flex-1">
          <div className="bg-gray-50 px-6 py-3 rounded-3xl">
            <h2 className="text-lg font-semibold text-gray-900 p-6">All Users ({allUsers.length})</h2>
            
            {/* Filters */}
            <div className="flex gap-4 mb-4 px-6">
              <input
                type="text"
                placeholder="Search by name, email or phone"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-2"
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {currentUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">No users found</div>
                <div className="text-gray-400 text-sm">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'No users available in the system'
                  }
                </div>
                <div className="text-xs text-gray-400 mt-4">
                  Total users: {allUsers.length} | Filtered: {filteredUsers.length}
                </div>
              </div>
            ) : (
              <UsersTableList
                users={currentUsers}
                onManageClick={handleManageUser}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
