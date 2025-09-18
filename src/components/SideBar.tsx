import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Products", path: "/products" },
    { name: "Users", path: "/users" },
    { name: "Orders", path: "/orders" },
    { name: "Payments", path: "/payments" },
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4 flex flex-col space-y-2">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-500 text-white px-3 py-2 rounded"
              : "text-gray-700 hover:bg-gray-200 px-3 py-2 rounded"
          }
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  );
}
