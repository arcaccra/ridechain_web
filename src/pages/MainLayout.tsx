import {Sidebar} from "@/components/Sidebar.tsx";
import {Outlet} from "react-router-dom";

export const MainLayout = () => (
    <div className="w-full h-screen flex">
        <Sidebar/>
        <div className="w-[80%]">
            <Outlet />
        </div>
    </div>
);
