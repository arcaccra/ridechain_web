import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/Register';
import { MainLayout } from '../pages/MainLayout';
import DriverManagement from '../pages/DriverManagement';
import RidesManagement from '../pages/RidesManagement';
import PaymentsManagement from '../pages/PaymentsManagement';
import DriverDetail from '../pages/DriverDetail';
import UsersManagement from '../pages/UsersManagement';
import RideSearch from '../pages/RideSearch';
import BookingPage from '../pages/BookingPage';
import Dashboard from './Dashboard';
import UserProfile from '../pages/UserProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="drivers" element={<DriverManagement />} />
        <Route path="drivers/:id" element={<DriverDetail />} />
        <Route path="rides" element={<RidesManagement />} />
        <Route path="payments" element={<PaymentsManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="search" element={<RideSearch />} />
        <Route path="book/:rideId" element={<BookingPage />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
