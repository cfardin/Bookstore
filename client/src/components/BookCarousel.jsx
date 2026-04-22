import { useEffect, useState } from "react";
import api from "../services/api";

export default function BookCarousel() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div className="bg-slate-900 text-white py-12">
      <h2 className="text-2xl font-bold mb-6 px-6 text-indigo-400">
        Trending Books 🔥
      </h2>

      <div className="flex gap-4 overflow-x-auto px-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="min-w-[180px] bg-slate-800 p-3 rounded-lg"
          >
            <img
              src={book.image}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="mt-2 text-sm font-semibold">{book.bookName}</h3>

            <p className="text-indigo-400 text-sm">৳{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
