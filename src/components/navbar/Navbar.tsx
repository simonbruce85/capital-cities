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
        <Link to="/" >
          <img src={logo} style={{width:"80px", height:"80px"}}></img>
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/">
              <div onClick={toggleMenu} className="nav-links">Home</div>
            </Link>
          </li>
          <li onClick={toggleMenu} className="nav-item">
            <Link to="/byCountry">
              <div className="nav-links">By Country</div>
            </Link>
          </li>
          {/* <li onClick={toggleMenu} className="nav-item">
            <Link to="/byCountry">
              <div className="nav-links">By Capital</div>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
