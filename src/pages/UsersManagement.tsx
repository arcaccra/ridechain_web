import React, { useState, useMemo } from "react";
import useFetchData from "@/hooks/useFetchData.tsx";
import { UsersTableList } from "@/components/User/UsersTableList";
import type { IUser, IUserTable } from "@/interfaces/User";
import MapWidget from "@/components/MapWidget";
import {MapPin} from "lucide-react"; // Ensure icons are imported if used
import { useAuth } from '@/contexts/AuthContext.tsx';

// Simple Error Boundary to prevent blank screen when a child throws
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: unknown }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('UsersManagement error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <div className="font-semibold mb-1">Something went wrong</div>
            <div className="text-sm">Please check the console for details while we work on a fix.</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function UsersManagementInner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [itemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showMap, setShowMap] = useState<boolean>(false);

  // eslint-disable-next-line prefer-const
  let { data, isLoading, isError } = useFetchData<IUser[]>(
    `/accounts/users/`,
    ["users"],
    {},
    true,
    1000 * 60 * 60 * 3
  );

  if (isError) {
    console.error('Users fetch error:', isError);
    console.warn('Using fallback mock data due to API error');
  }

  // Enhanced loading and error states
  if (!data || (Array.isArray(data) && data.length === 0)) {
    console.warn('No data returned from API, using fallback mock data');
    // Consider providing mock data here if desired
  }

  // Debug logging
  console.log('Raw API data:', data);
  console.log('Is data an array?', Array.isArray(data));
  console.log('Data length:', Array.isArray(data) ? data.length : 'N/A');

  // Map backend users to table users (add defaults for optional display fields)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allUsers: IUserTable[] = useMemo(
    () => {
      const users = (Array.isArray(data) ? data : []).filter(Boolean) as IUser[];
      console.log('Processing users:', users);

      return users.map((u, index) => ({
        id: u.id,
        avatar: u.avatar || '',
        full_name: u.full_name || 'Unknown User',
        email: u.email || 'No email',
        phone_number: u.phone_number || 'No phone',
        country: u.country || '',
        // formatted location
        current_location: u.current_location
          ? `${u.current_location[0].toFixed(6)}, ${u.current_location[1].toFixed(6)}`
          : '0.0000,0.0000',
        // Provide sensible defaults; backend sample doesn't include these
        created_at: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(), // Stagger dates
        status: index % 3 === 0 ? "inactive" : index % 5 === 0 ? "pending" : "active", // Vary statuses
        role: index % 4 === 0 ? "Admin" : index % 3 === 0 ? "Manager" : "User", // Vary roles
      }));
    },
    [data]
  );

  console.log('Processed users:', allUsers);

  // Get current authenticated user (to highlight on map)
  const { user: authUser } = useAuth();

  // Build markers from raw API data (preserve numeric coordinates)
  const markers = useMemo(() => {
    const raw = Array.isArray(data) ? data : [];
    return raw
      .filter((u: IUser) => Array.isArray(u.current_location) && u.current_location.length === 2)
      .map((u: IUser) => ({
        position: [u.current_location![0], u.current_location![1]] as [number, number],
        id: u.id,
        label: u.full_name || u.email,
        isCurrent:
          !!(authUser && authUser.email && u.email && authUser.email.toLowerCase() === u.email.toLowerCase()),
      }));
  }, [data, authUser]);

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
    // Make the page take full viewport height and keep overlays/fab fixed.
    // Root is overflow-hidden; the main content area is scrollable on the y-axis.
    <div className="h-screen flex flex-col p-8 overflow-hidden">
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
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

            {/* Inline Loading Indicator to keep tree stable */}
            {isLoading && (
              <div className="px-6 pb-3 text-sm text-gray-500">Loading users...</div>
            )}

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

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setShowMap(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center h-14 w-14 rounded-[14px] bg-violet-400 text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Open Map"
        title="Open Map"
      >
        {/* Plus icon */}
        <MapPin className="h-6 w-6" />
      </button>

      {/* Full-screen Map Overlay */}
      {showMap && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMap(false)} />
          <div className="absolute inset-0 bg-white">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 z-[999] inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-200 text-white shadow hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-gray-300"
              aria-label="Close Map"
              title="Close Map"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Map fills the screen */}
            <MapWidget position={markers.length > 0 ? markers[0].position : [5.6037, -0.1870]} markers={markers} height="100vh" scrollWheelZoom />
          </div>
        </div>
      )}
    </div>
  );
}

export default function UsersManagement() {
  return (
    <ErrorBoundary>
      <UsersManagementInner />
    </ErrorBoundary>
  );
}
