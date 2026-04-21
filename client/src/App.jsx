import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import booksData from '../BooksData/Books.json';
import './App.css';

axios.defaults.withCredentials = true;
const API_BASE = 'http://localhost:5000/api';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/auth/register`, { name, email, password });
      alert('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Books = () => {
  const [query, setQuery] = useState('');
  // Map JSON data to match the expected structure for buyBook function
  const [books] = useState(booksData.map(b => ({
    ...b,
    id: b.bookId,
    title: b.bookName,
    thumbnail: b.image
  })));

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );

  const buyBook = async (book) => {
    try {
      await axios.post(`${API_BASE}/orders`, { book_id: book.id, title: book.title });
      alert('Order placed!');
    } catch (err) {
      alert('Please login to buy');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Books to freshen up your bookshelf</h1>
          <button className="view-list-btn">View The List</button>
        </div>
      </div>

      <h2 className="books-title">Books</h2>

      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search by title or author..." 
          value={query} 
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="modern-book-card">
            <div className="book-image-container">
              <img src={book.thumbnail} alt={book.title} />
            </div>
            <div className="book-tags">
              <span className="tag">Young Adult</span>
              <span className="tag">Identity</span>
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">By : {book.author}</p>
            </div>
            <div className="book-meta">
              <span>Fiction</span>
              <span>$5.00</span>
            </div>
            <button className="buy-btn-small" onClick={() => buyBook(book)}>Buy Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders/my-orders`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const cancelOrder = async (id) => {
    try {
      await axios.put(`${API_BASE}/orders/${id}/cancel`);
      fetchOrders();
    } catch (err) {
      alert('Cancel failed');
    }
  };

  return (
    <div className="container">
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.title}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'ordered' && <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>Cancel</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uRes = await axios.get(`${API_BASE}/admin/users`);
        const oRes = await axios.get(`${API_BASE}/admin/orders`);
        setUsers(uRes.data);
        setOrders(oRes.data);
      } catch (err) {
        alert('Admin access denied');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <h3>Users</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}
        </tbody>
      </table>
      <h3>All Orders</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>User</th><th>Book Title</th><th>Status</th></tr>
        </thead>
        <tbody>
          {orders.map(o => <tr key={o.id}><td>{o.id}</td><td>{o.user_name}</td><td>{o.title}</td><td>{o.status}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/auth/me`)
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await axios.get(`${API_BASE}/auth/logout`);
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Books</Link>
          {user ? (
            <>
              <Link to="/orders">My Orders</Link>
              {user.role === 'admin' && <Link to="/admin">Admin</Link>}
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;