import { useEffect, useState } from "react";
import api from "../../services/api"; 

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await api.get("/admin/stats");
      const booksRes = await api.get("/admin/books");
      const ordersRes = await api.get("/admin/orders");

      setStats(statsRes.data);
      setBooks(booksRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-indigo-400 mb-8">
        Admin Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
          <p className="text-slate-400">Books</p>
          <h2 className="text-2xl text-indigo-400">{stats.totalBooks}</h2>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
          <p className="text-slate-400">Orders</p>
          <h2 className="text-2xl text-green-400">{stats.totalOrders}</h2>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
          <p className="text-slate-400">Users</p>
          <h2 className="text-2xl text-yellow-400">{stats.totalUsers}</h2>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
          <p className="text-slate-400">Revenue</p>
          <h2 className="text-2xl text-pink-400">
            ${stats.totalRevenue}
          </h2>
        </div>
      </div>

      {/* BOOKS TABLE */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-300">
          Books
        </h2>

        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
          {books.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center p-4 border-b border-slate-800"
            >
              <div>
                <p className="font-semibold">{b.bookName}</p>
                <p className="text-sm text-slate-400">$ {b.price}</p>
              </div>
              <span className="text-xs text-slate-500">{b.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-green-300">
          Orders
        </h2>

        <div className="bg-slate-900 rounded-xl border border-slate-800">
          {orders.map((o) => (
            <div
              key={o.id}
              className="flex justify-between items-center p-4 border-b border-slate-800"
            >
              <div>
                <p className="font-semibold">Order #{o.id}</p>
                <p className="text-sm text-slate-400">
                  User: {o.userName || o.user_id}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm px-3 py-1 rounded ${
                    o.status === "pending"
                      ? "bg-yellow-600"
                      : o.status === "delivered"
                      ? "bg-green-600"
                      : "bg-blue-600"
                  }`}
                >
                  {o.status}
                </span>

                <select
                  className="bg-slate-800 p-1 rounded"
                  onChange={(e) =>
                    updateStatus(o.id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}