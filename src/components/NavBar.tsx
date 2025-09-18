import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (clear token, call API, etc.)
    console.log("Logged out");
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">Admin Dashboard</div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-700 hover:text-blue-500"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
