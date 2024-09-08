import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link style={{ width: "50px", height: "50px" }} to="/" >
            <img src={logo} style={{ width: "50px", height: "50px" }}></img>
          </Link>
        </div>
        <div className="icon-container" onClick={toggleMenu}>
          {isOpen ? <FaTimes style={{ width: "30px", height: "30px" }} /> : <FaBars style={{ width: "30px", height: "30px" }} />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/">
              <div onClick={toggleMenu} className="nav-links">Home</div>
            </Link>
          </li>
          <li onClick={toggleMenu} className="nav-item">
            <Link to="/byCountry">
              <div className="nav-links">Country</div>
            </Link>
          </li>
          <li onClick={toggleMenu} className="nav-item">
            <Link to="/byCapital">
              <div className="nav-links">Capital</div>
            </Link>
          </li>
          <li onClick={toggleMenu} className="nav-item">
            <Link to="/byFlags">
              <div className="nav-links">Flags</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
