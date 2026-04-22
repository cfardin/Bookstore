import { useEffect, useState } from "react";
import api from "../services/api"; 

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.get("/books");
      setBooks(res.data.slice(0, 4)); // show only 4
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-slate-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-indigo-400">
          Featured Books
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-slate-900 p-4 rounded-xl hover:scale-105 transition"
            >
              <img
                src={book.image}
                className="w-full h-52 object-cover rounded"
              />

              <h3 className="mt-3 font-semibold">{book.bookName}</h3>
              <p className="text-sm text-slate-400">{book.author}</p>

              <p className="text-indigo-400 mt-2">
                ৳{book.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}