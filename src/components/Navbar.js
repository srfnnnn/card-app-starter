import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../photos/card-image.png";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="header">

      <Link to="/">
        <img
          className="logo"
          src={logo}
          alt="Card logo"
          title="Home"
        />
      </Link>

      <nav className="navbar">
          <NavLink to="/" className="nav">
          Home
          </NavLink>

          <NavLink to="/cards" className="nav">
          Cards
          </NavLink>

          {token ? (
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}

