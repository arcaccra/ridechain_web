import './App.css'
import {Sidebar} from "@/components/Sidebar.tsx";
import DriverKycDetail from "@/components/KYC/DriverKycDetail.tsx";
// import Dashboard from "@/components/Dashboard.tsx";
// import DriverKycManagement from "@/pages/driver-management.tsc.tsx";
// import AdminLoginPage from "./pages/login.tsx";

function App() {
  return (
    <>
      {/*<AdminLoginPage/>*/}
        <div className="w-full flex">
            <Sidebar/>
            <div className="w-[80%]">
                <DriverKycDetail/>
            </div>
        </div>
    </>
  )
}

export default App
