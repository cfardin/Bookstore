const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const { isAdmin, isAuthenticated } = require("../middleware/authMiddleware");

router.use(isAdmin);

// ADD BOOK

console.log("✅ ADMIN ROUTES LOADED");
router.post("/books", async (req, res) => {
  const {
    title,
    author,
    image,
    review,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = req.body;

  try {
    await db.query(
      `
      INSERT INTO books 
      (title, author, image, review, totalPages, rating, category, tags, publisher, yearOfPublishing)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        title,
        author,
        image,
        review,
        totalPages,
        rating,
        category,
        tags,
        publisher,
        yearOfPublishing,
      ],
    );

    res.json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [books] = await db.query("SELECT COUNT(*) AS totalBooks FROM books");
    const [orders] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders",
    );

    console.log("ekHane aisi");
    const [revenue] = await db.query(`
      SELECT COALESCE(SUM(b.price * oi.quantity), 0) AS totalRevenue
      FROM order_items oi
      JOIN books b ON oi.book_id = b.id
    `);

    const [users] = await db.query("SELECT COUNT(*) AS totalUsers FROM users");

    res.json({
      totalBooks: books[0].totalBooks,
      totalOrders: orders[0].totalOrders,
      totalUsers: users[0].totalUsers,
      totalRevenue: revenue[0].totalRevenue,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/books/bulk", async (req, res) => {
  const books = req.body;

  try {
    const values = books.map((book) => [
      book.bookId,
      book.bookName,
      book.author,
      book.image,
      book.price,
      book.review,
      book.totalPages,
      book.rating,
      book.category,
      Array.isArray(book.tags) ? book.tags.join(",") : book.tags,
      book.publisher,
      book.yearOfPublishing,
    ]);
    await db.query(
      `INSERT INTO books 
  (bookName, author, image, review, totalPages, rating, category, tags, publisher, yearOfPublishing, price)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookName,
        author,
        image,
        review,
        totalPages,
        rating,
        category,
        tags,
        publisher,
        yearOfPublishing,
        price,
      ],
    );

    res.json({ message: "Books inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE BOOK
router.put("/books/:id", async (req, res) => {
  const { title, author, price, stock } = req.body;

  try {
    await db.query(
      "UPDATE books SET title=?, author=?, price=?, stock=? WHERE id=?",
      [title, author, price, stock, req.params.id],
    );
    res.json({ message: "Book updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE BOOK
router.delete("/books/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM books WHERE id=?", [req.params.id]);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orders", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id,
        o.user_id,
        o.status,
        o.created_at,
        u.name AS userName
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.id DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/books", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM books ORDER BY id DESC");

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/orders/:id/status", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    await db.query("UPDATE orders SET status=? WHERE id=?", [
      status,
      req.params.id,
    ]);

    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
