import SidebarItem from "@/components/SidebarItem.tsx";
import { BarChart3, CreditCard, Home, LogOut, MapPin, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../contexts/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="flex flex-col w-[20%] h-[100vh] bg-black text-white p-4">
            <div className="flex items-center gap-2 py-4 mb-6">
                {user ? (
                    <div className="flex items-center gap-3 p-2">
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
                    <SidebarItem icon={<Home />} label="Dashboard" path="/" isActive />
                    <SidebarItem icon={<Users />} label="Drivers" path="/drivers" />
                    <SidebarItem icon={<MapPin />} label="Rides" path="/rides" />
                    <SidebarItem icon={<CreditCard />} label="Payments" path="/payments" />
                    <SidebarItem icon={<BarChart3 />} label="Analytics" path="/analytics" />
                    <SidebarItem icon={<Settings />} label="Settings" path="/settings" />
                    <SidebarItem icon={<Users />} label="Users" path="/users" />
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <div onClick={handleLogout} className="cursor-pointer">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer">
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}