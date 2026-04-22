import React from "react";
export default function Categories() {
  const categories = ["Fiction", "Fantasy", "Classic", "Religious"];

  return (
    <div className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-indigo-400">
          Available Categories
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-slate-800 p-6 rounded-xl hover:bg-indigo-600 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{cat}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}