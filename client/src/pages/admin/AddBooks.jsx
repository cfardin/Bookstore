import { useState } from "react";
import api from "../../services/api";

export default function AddBook() {
  const [form, setForm] = useState({
    bookName: "",
    author: "",
    image: "",
    review: "",
    totalPages: "",
    rating: "",
    category: "",
    tags: "",
    publisher: "",
    yearOfPublishing: "",
    price: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/admin/books", form);
      alert("Book added successfully!");

      setForm({
        bookName: "",
        author: "",
        image: "",
        review: "",
        totalPages: "",
        rating: "",
        category: "",
        tags: "",
        publisher: "",
        yearOfPublishing: "",
        price:""
      });
    } catch (err) {
      console.log(err);
      alert("Error adding book");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">Add New Book</h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4 max-w-4xl"
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-3 bg-slate-900 rounded border border-slate-700"
          />
        ))}

        <button
          type="submit"
          className="md:col-span-2 bg-green-600 hover:bg-green-700 py-3 rounded-lg"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
