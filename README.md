# Simple Book Store Web App

A minimalistic full-stack bookstore application.

## Proejct Overview

The Full-Stack Bookstore Management System is a modern web-based application designed to provide a seamless platform for browsing, purchasing, and managing books online. This system integrates a responsive frontend interface with a robust backend server and a structured relational database to deliver efficient and reliable bookstore operations.
Built using React for the frontend, Node.js with Express for the backend, and MySQL/MariaDB for database management, the system demonstrates the implementation of full-stack development principles. The backend handles API routing, business logic, and database communication, while the frontend provides dynamic user interaction.

## Group Details:
GROUP NUMBER : 2 
COURSE NAME : DATABASE MANAGEMENT SYSTEMS LAB
INSTRUCTOR : Md. Fahmidur Rahman Sakib, Senior Lecturer, Department of Computer Science and Engineering, Metropolitan University, Sylhet.

### Team Members ###

1. Fahin Ahmed Ayon, ID: 241-115-043, ROLE: BACKEND implementation (Api Integration and Routing)
2. Fardin Chowdhury, ID: 241-115-048, ROLE: FRONTEND implementation
3. Shafiil Ahmed Sadat, ID: 241-115-013, ROLE: Database Design and ER Diagram
4. Simanto Chandra Kor, ID: 241-115-047, ROLE: Database Design and ER Diagrm

### OBJECTIVE ###

The objective of this project is to design and develop a full-stack web-based bookstore system that enables users to browse, search, and purchase books efficiently while providing administrators with tools to manage books, users, and orders. The project aims to demonstrate the integration of frontend, backend, and database technologies, implement secure user authentication, and apply proper database design using ER modeling to ensure efficient data management and system reliability.

FUNCTIONALITIES:

ER DIAGRAM:
![image alt](https://github.com/cfardin/Bookstore/blob/837609d71fcfc4b53956a2e18b7929e1c4269997/ER.jpeg)


## Prerequisites
- **XAMPP** (or any MariaDB/MySQL server)
- **Node.js** (v14 or later)
- **npm**

## Setup Instructions

### 1. Database Setup (XAMPP/phpMyAdmin)
1. Open XAMPP Control Panel and start **Apache** and **MySQL**.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Click on the **SQL** tab.
4. Copy the contents of `db/schema.sql` and paste them into the SQL box.
5. Click **Go** to create the `bookstore` database and tables.

### 2. Backend Setup
1. Open a terminal in the `server` folder.
2. Run:
   ```bash
   npm install
   node server.js
   ```
3. The server will start on [http://localhost:5000](http://localhost:5000).

### 3. Frontend Setup
1. Open a terminal in the `client` folder.
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. The app will be available at [http://localhost:5173](http://localhost:5173).

## How to Test
1. **Register**: Go to the Register page and create an account. The first user registered automatically becomes an **Admin**.
2. **Search Books**: On the home page, search for a book (e.g., "JavaScript").
3. **Buy Book**: Click "Buy Book" (requires login).
4. **View Orders**: Go to "My Orders" to see your purchases and cancel them.
5. **Admin Panel**: If logged in as the first user, click "Admin" to see all users and all orders.

## Project Structure
- `server/`: Express backend with routes and middleware.
- `client/`: Simple React frontend using Vite.
- `db/`: SQL schema for the database.
