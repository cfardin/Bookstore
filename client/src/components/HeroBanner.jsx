import React from "react";
export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        
        {/* TEXT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Your Next Favorite Book 📚
          </h1>
          <p className="text-slate-300 mb-6">
            হাজারো বইয়ের মধ্যে খুঁজে নিন আপনার পছন্দের বই। সহজে অর্ডার করুন, দ্রুত ডেলিভারি পান।
          </p>

          <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg">
            Browse Books
          </button>
        </div>

        {/* IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}