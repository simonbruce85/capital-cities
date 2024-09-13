import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import { useAtom } from "jotai";
import { languageAtom } from "../utils/Atom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useAtom(languageAtom);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const goToHome = () => {
    setIsOpen(false);
  };

  const switchLanguages = () => {
    if (language == 0) {
      localStorage.setItem("language","1")
      setLanguage(1)
    } else {
      localStorage.setItem("language","0")
      setLanguage(0)
    }
    window.location.reload()
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link style={{ width: "50px", height: "50px" }} to="/" >
            <img src={logo} style={{ width: "50px", height: "50px" }} onClick={goToHome}></img>
          </Link>
        </div>
        <div className="icon-container" onClick={toggleMenu}>
          {isOpen ? <FaTimes style={{ width: "30px", height: "30px" }} /> : <FaBars style={{ width: "30px", height: "30px" }} />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li onClick={switchLanguages} className="nav-item">
              <div className="nav-links" style={{ display:"flex", justifyContent:"center"}}>{language == 0 ? "EN 🇺🇸" : "ES 🇪🇸"}</div>
          </li>
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
