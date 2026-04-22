import { Link, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-400">
        BookStore
      </Link>

      <div className="flex gap-6 text-sm text-slate-300 items-center">
        <Link to="/" className="hover:text-indigo-400">
          Home
        </Link>
        <Link to="/orders" className="hover:text-indigo-400">
          My Orders
        </Link>
        <Link to="/myCart" className="hover:text-indigo-400">
          My Cart
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-indigo-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-400">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-indigo-400">{user.name}</span>

            {user.role === "admin" && (
              <Link to="/addProduct" className="hover:text-indigo-400">
                Add Product
              </Link>
            )}
            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-indigo-400">
                Admin Dashboard
              </Link>
            )}

            <button onClick={logout} className="hover:text-red-400">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
