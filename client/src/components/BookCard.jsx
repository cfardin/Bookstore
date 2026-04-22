import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <img src={book.image} className="w-full h-52 object-cover" />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold text-indigo-400">
          {book.bookName || book.title}
        </h2>

        <p className="text-sm text-slate-400">{book.author}</p>

        <p className="text-xs text-slate-500">{book.category}</p>

        <p className="text-sm">⭐ {book.rating}</p>
        <p className="text-sm">
          <span className="font-bold text-lg"> ৳ </span> {book.price}
        </p>

        <p className="text-xs text-slate-400">{book.totalPages} pages</p>

        <Link to={`/book/${book.id}`}>
          <button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
