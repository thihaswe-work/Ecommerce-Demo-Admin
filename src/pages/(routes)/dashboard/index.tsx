import { useAuthStore } from "@/store/authStore";

const DashboardPage = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full bg-amber-500">
      <h1 className="text-2xl font-bold ">Dashboard</h1>
      <p>Welcome, {user?.name || "User"}!</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
