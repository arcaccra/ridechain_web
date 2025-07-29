import './App.css';
import AppRoutes from './components/Router';
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;