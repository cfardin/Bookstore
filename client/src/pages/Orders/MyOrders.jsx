import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("order is here", orders);

  if (loading) {
    return <div className="text-white p-10">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-slate-400">No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900 p-4 rounded-lg border border-slate-800"
            >
              <h2 className="text-xl font-semibold">Book ID: {order.id}</h2>

              <p className="text-slate-400">Quantity: {order.quantity}</p>

              <p className="text-slate-400">
                Status: <span className="text-green-400">{order.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
