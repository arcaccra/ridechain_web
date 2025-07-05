import './App.css'
import DriverDetail from "@/pages/DriverDetail.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "@/components/Dashboard.tsx";
import DriverManagement from "@/pages/DriverManagement.tsx";
import {MainLayout} from "@/pages/MainLayout.tsx";
import RidesManagement from "@/pages/RidesManagement.tsx";
import PaymentsManagement from "@/pages/PaymentsManagement.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: "/drivers",
                element: <DriverManagement/>,
            },
            {
                path: "/rides",
                element: <RidesManagement/>,
            },
            {
                path: "/payments",
                element: <PaymentsManagement/>,
            },
            {
                path: "/drivers/:id",
                element: <DriverDetail/>,
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;