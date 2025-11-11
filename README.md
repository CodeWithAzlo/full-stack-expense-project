# Smart Expense Project

[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.x-blue)](https://reactjs.org/)

**Smart Expense** is a full-stack expense tracker application built with **React, Zustand, Vite, Express, MongoDB, JWT, and Bcrypt**.  
It allows users to track expenses and admins to manage users efficiently.

---

## Table of Contents
- [Smart Expense Project](#smart-expense-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [User](#user)
    - [Admin](#admin)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Installation \& Setup](#installation--setup)
    - [1. Backend](#1-backend)

---

## Features

### User
- Signup and login securely
- Add, view, and delete expenses
- User-specific dashboard

### Admin
- Manage users (view/delete)
- Access all user expenses

---

## Tech Stack

**Frontend**
- React
- Vite
- Zustand (state management)
- Axios (API calls with interceptors)
- TailwindCSS (optional styling)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- CORS and dotenv
- Morgan for logging requests

---

## Project Structure
```

smart-expense-project/
├─ backend/ # Express API with JWT auth
│ ├─ server.js
│ ├─ routes/
│ ├─ models/
│ ├─ controllers/
│ ├─ middleware/
│ └─ package.json
├─ frontend/ # React + Vite frontend
│ ├─ src/
│ ├─ public/
│ └─ package.json
└─ README.md # This file

```


---

## Installation & Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # configure your environment variables
npm run dev            # run backend in development mode

2. Frontend

cd frontend
npm install
npm run dev            # run frontend in development mode

3. Run Full Application

Start backend server: npm run dev in backend

Start frontend server: npm run dev in frontend

Open browser: http://localhost:5173 (or Vite's port)


Environment Variables

Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend .env
VITE_API_URL=http://localhost:5000/api


Usage

Signup/login as user or admin

Users can add, view, and delete their own expenses

Admins can manage users and view all expenses


Author

💖Azlan Shah
Email: codewithazlo@gmail.com

GitHub: https://github.com/codewithazlo