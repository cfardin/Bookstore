import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BookDetails from "./pages/Books/BookDetails";
import MyOrders from "./pages/Orders/MyOrders";
import Cart from "./pages/cart/Cart";
import AddBook from "./pages/admin/AddBooks";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookDetails />} />{" "}
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/myCart" element={<Cart />} />
        <Route path="/addProduct" element={<AddBook />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </div>
  );
}
