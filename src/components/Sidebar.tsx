import SidebarItem from "@/components/SidebarItem.tsx";
import {BarChart3, Car, Settings, Users, User, FileText} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {useLocation} from "react-router-dom";

export function Sidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className="w-1/6 h-full mx-6 my-3 p-6 bg-[#FAFAFA] flex flex-col rounded-3xl">
            <div className="p-6 border-gray-200">
                <h1 className="text-2xl font-bold text-center text-gray-900">Ridechain</h1>
            </div>

            <div className="h-full flex flex-col px-4 py-8 justify-between">
                <div className="h-[50%] flex flex-col justify-between">
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            <SidebarItem icon={<BarChart3 />} label="Dashboard" path="/" isActive={currentPath === "/"} />
                            <SidebarItem icon={<Car />} label="Rides" path="/rides" isActive={currentPath === "/rides"} />
                            <SidebarItem icon={<Users />} label="Drivers" path="/drivers" isActive={currentPath === "/drivers"} />
                            <SidebarItem icon={<User />} label="Users" path="/users" isActive={currentPath === "/users"} />
                            <SidebarItem icon={<FileText />} label="Reports" path="/reports" isActive={currentPath === "/reports"} />
                            <SidebarItem icon={<Settings />} label="Settings" path="/settings" isActive={currentPath === "/settings"} />
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-gray-100 mt-6">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                                <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Alfonso Botosh</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
