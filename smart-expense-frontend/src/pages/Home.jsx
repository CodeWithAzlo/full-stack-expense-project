import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">💰 Expense Tracker</h1>
        <p className="home-subtitle">
          Track your spending smartly, securely, and beautifully — all in one place.
        </p>
      </header>

      <div className="home-buttons">
        <Link to="/signup" className="home-btn signup-btn">
          📝 Sign Up
        </Link>
        <Link to="/login" className="home-btn login-btn">
          🔑 Login
        </Link>
      </div>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Smart Expense Tracker</p>
      </footer>
    </div>
  );
}
