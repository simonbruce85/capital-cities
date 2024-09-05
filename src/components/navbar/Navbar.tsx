import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          MyLogo
        </a>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href="/" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links">
              By Capital
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-links">
              By Country
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links">
              By Currency
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-links">
              By Flag
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;