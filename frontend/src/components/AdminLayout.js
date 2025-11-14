import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-orange-500 mb-6">
            🕉 ISKCON Admin
          </h2>
          <nav className="flex flex-col gap-3">
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-orange-500"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/events"
              className="text-gray-700 hover:text-orange-500"
            >
              Manage Events
            </Link>
            <Link
              to="/admin/transactions"
              className="text-gray-700 hover:text-orange-500"
            >
              Transactions
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
