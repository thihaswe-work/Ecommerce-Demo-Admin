import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/SideBar";

export default function AuthLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
