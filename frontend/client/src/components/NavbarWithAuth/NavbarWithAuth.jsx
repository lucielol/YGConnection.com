import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./navbar_wa.css";
import Dropdown from "../Dropdown";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authSlice";

// Navbar for Logged-in Users
const NavbarLogged = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();

  const signout = () => dispatch(logout());

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    console.log("Dropdown Visible:", dropdownVisible); // Log perubahan state
  };

  return (
    <header className="navbar navbar-logged-with">
      <div className="logo-container">
        <img
          src="/images/img/logo_YG.png"
          alt="YG Entertainment Logo"
          className="logo"
        />
      </div>
      <nav>
        <Link to="/HomeLogged">Home</Link>
        <Link to="/product">Product</Link>
        <Link to="/community">Community</Link>
        <Link to="/AboutUsLogged">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <Link onClick={signout}>logout</Link>
      </nav>
      <button className="user-button" onClick={toggleDropdown}>
        <img src="img/profile.png" alt="User Icon" className="icon-img" />{" "}
        Nurzaba
      </button>
      {dropdownVisible && <Dropdown />}
    </header>
  );
};

// Navbar for Logged-out Users
const Navbar = () => {
  return (
    <header className="navbar-with">
      <div className="logo-container">
        <img
          src="/images/img/logo_YG.png"
          alt="YG Entertainment Logo"
          className="logo"
        />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/Login" className="login-button">
          Log In
        </Link>
      </nav>
    </header>
  );
};

// Main Navbar Component with Conditional Rendering (Logged in / Logged out)
const NavbarWithAuth = () => {
  const [isLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  return <div>{isLoggedIn ? <NavbarLogged /> : <Navbar />}</div>;
};

export default NavbarWithAuth;
