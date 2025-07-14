import { Sidebar } from "@/components/Sidebar.tsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import { useAuth } from "@/contexts/AuthContext.tsx";

export const MainLayout = () => {
    const location = useLocation();
    const { token } = useAuth();
    const noLayoutPages = ['/login', '/register'];
    const shouldShowLayout = !noLayoutPages.includes(location.pathname);

    if (!token && shouldShowLayout) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <div className="w-full flex">
            {shouldShowLayout && <ErrorBoundary><Sidebar /></ErrorBoundary>}
            <div className={shouldShowLayout ? "w-[80%]" : "w-full"}>
                <Outlet />
            </div>
        </div>
    );
};