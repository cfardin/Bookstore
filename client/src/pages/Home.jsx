import { React, useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
import HeroBanner from "../components/HeroBanner";
import FeaturedBooks from "../components/FeaturedBooks";
import BookCarousel from "../components/BookCarousel";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";


export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <HeroBanner />
      <FeaturedBooks />
      <BookCarousel />
      <CTA />
      <Categories />

      <h2 className="text-2xl font-bold text-indigo-400 mb-6">
        Available Books
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <Testimonials />
      <CTA />
    </div>
  );
}
