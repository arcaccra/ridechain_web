import SidebarItem from "@/components/SidebarItem.tsx";
import { BarChart3, CreditCard, Home, LogOut, MapPin, Settings, Users, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    // Helper to determine active state. Treat root (/) as exact match, others support nested routes
    const isPathActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname === path || location.pathname.startsWith(path + '/');
    }

    return (
        <div className="flex flex-col w-[20%] h-[100vh] bg-black text-white p-4">
            <div className="flex items-center gap-2 py-4 mb-6">
                {user ? (
                    <div 
                        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => navigate('/profile')}
                    >
                        <Avatar>
                            <AvatarImage src={user?.avatar} alt={user?.full_name} />
                            <AvatarFallback>{user?.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{user?.full_name}</p>
                            <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-2">
                        <Avatar>
                            <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">Guest</p>
                        </div>
                    </div>
                )}
            </div>

            <nav className="flex-1">
                <ul className="space-y-2 divide-y divide-white/10 space-y-4">
                    <SidebarItem icon={<Home />} label="Dashboard" path="/" isActive={isPathActive('/')} />
                    <SidebarItem icon={<Users />} label="Drivers" path="/drivers" isActive={isPathActive('/drivers')} />
                    <SidebarItem icon={<Search />} label="Search Rides" path="/search" isActive={isPathActive('/search')} />
                    <SidebarItem icon={<MapPin />} label="Rides" path="/rides" isActive={isPathActive('/rides')} />
                    <SidebarItem icon={<CreditCard />} label="Payments" path="/payments" isActive={isPathActive('/payments')} />
                    <SidebarItem icon={<BarChart3 />} label="Analytics" path="/analytics" isActive={isPathActive('/analytics')} />
                    <SidebarItem icon={<Users />} label="Users" path="/users" isActive={isPathActive('/users')} />
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center justify-between px-2">
                    <div onClick={handleLogout} className="cursor-pointer">
                        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer">
                            <LogOut className="h-5 w-5 text-red-400" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Settings placed at bottom and styled with color to stand out */}
                    <div className="ml-2">
                        <a href="/settings" className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-violet-300 bg-transparent hover:bg-white/5">
                            <Settings className="h-5 w-5 text-violet-300" />
                            <span className="text-violet-300">Settings</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}