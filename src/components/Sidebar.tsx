import SidebarItem from "@/components/SidebarItem.tsx";
import {BarChart3, CreditCard, Home, MapPin, Settings, Users} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";

export function Sidebar() {
    return (
        <div className="flex flex-col w-[20%] h-[100vh] bg-black text-white p-4">
            <div className="flex items-center gap-2 py-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black font-bold">A</div>
                <h2 className="text-xl font-bold">ADA Admin</h2>
            </div>

            <nav className="flex-1">
                <ul className="space-y-2">
                    <SidebarItem icon={<Home />} label="Dashboard" path="/" isActive />
                    <SidebarItem icon={<Users />} label="Drivers" path="/drivers" />
                    <SidebarItem icon={<MapPin />} label="Rides" path="/rides" />
                    <SidebarItem icon={<CreditCard />} label="Payments" path="/payments" />
                    <SidebarItem icon={<BarChart3 />} label="Analytics" path="/analytics" />
                    <SidebarItem icon={<Settings />} label="Settings" path="/settings"/>
                    <SidebarItem icon={<Users />} label="Users" path="/users"/>
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 p-2">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-gray-400">admin@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}