import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBook();
  }, [id]);

  // ADD TO CART
  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        book_id: book.id,
        title: book.bookName,
        image: book.image,
      });

      alert("Added to cart");
    } catch (err) {
      console.log(err.response || err);
      alert("Login required");
    }
  };

  // ORDER
  const placeOrder = async () => {
    try {
      setOrdering(true);

      const res = await api.post("/orders", {
        book_id: book.id,
        title: book.bookName,
      });

      console.log("ORDER RESPONSE:", res.data);
      alert("Order placed!");
    } catch (err) {
      console.log("ORDER ERROR:", err.response || err);
      alert("Login required or error");
    } finally {
      setOrdering(false);
    }
  };

  if (!book) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <img src={book.image} className="w-full rounded-xl object-cover" />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-indigo-400">
            {book.bookName}
          </h1>

          <p className="text-slate-300">
            <b>Author:</b> {book.author}
          </p>

          <p className="text-slate-400">{book.review}</p>
          <p className="text-3xl font-bold text-indigo-400">৳ {book.price}</p>

          <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
            <p>⭐ Rating: {book.rating}</p>
            <p>📚 Pages: {book.totalPages}</p>
            <p>🏷 Category: {book.category}</p>
            <p>📅 Year: {book.yearOfPublishing}</p>
          </div>

          <p className="text-slate-300">🏢 Publisher: {book.publisher}</p>

          <div className="flex gap-2 flex-wrap">
            {(book.tags || "").split(",").map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-600 px-3 py-1 rounded-full text-sm"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-5">
            <button
              onClick={addToCart}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={placeOrder}
              disabled={ordering}
              className={`px-6 py-2 rounded-lg ${
                ordering ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {ordering ? "Ordering..." : "Order Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
