import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">B</span>
        <div>
          <h2>Biblioteca Virtual</h2>
          <p>Gestão simples e elegante</p>
        </div>
      </div>

      <div className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/livros">Livros</Link>
      </div>
    </nav>
  );
}

export default Navbar;
