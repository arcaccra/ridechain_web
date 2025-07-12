import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Settings,
} from "lucide-react";
import { HomeIcon, UserGroupIcon, TruckIcon, UsersIcon, ChartBarIcon, CogIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import {useLocation} from "react-router-dom";

const menuItems = [
  { icon: HomeIcon, label: "Dashboard", path: "/" },
  { icon: TruckIcon, label: "Rides", path: "/rides"},
  { icon: UserGroupIcon, label: "Drivers", path: "/drivers"},
  { icon: UsersIcon, label: "Users", path: "/users"},
  { icon: ChartBarIcon, label: "Reports", path: "/reports"},
];

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
      <div className="w-1/6 m-6 p-6 bg-[#FAFAFA] flex flex-col rounded-3xl">
        <div className="p-6 border-gray-200">
          <h1 className="text-2xl font-bold text-center text-gray-900">Ridechain</h1>
        </div>

        <div className="h-full flex flex-col px-4 py-8 space-evenly">
          <nav>
            {menuItems.map((item, index) => (
                <Button
                    key={index}
                    variant={item.path == currentPath ? "default" : "ghost"}
                    className={`w-full justify-start rounded-3xl h-12 ${
                        item.path == currentPath ? "bg-black text-white hover:bg-black/90" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    asChild
                >
                  <a href={item.path}>
                    <item.icon className="mr-3 w-4" />
                    {item.label}
                  </a>
                </Button>
            ))}
          </nav>

          <div className="mt-8">
            <p className="text-sm font-medium text-gray-500 mb-2">Setting</p>
            <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                asChild
            >
              <a href="/settings">
                <Settings className="mr-3 h-4 w-4" />
                Account
              </a>
            </Button>
          </div>

          <div className="p-4 border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
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
  )
}