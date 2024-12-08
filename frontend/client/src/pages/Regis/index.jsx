import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin";
import Footer from "../../components/Footer";
import "../../style/Regis.css";

import axiosInstance from "../../../axiosInstance";

function Regis() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/register", values);
      // Handle successful registration (e.g., navigate to login or show a success message)
      console.log(response.data);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Registration error:", error);
    }
  };
  return (
    <>
      <NavbarLogin />

      <main>
        <div className="login-container">
          <h1>YGEntertainment Account</h1>
          <p>Sign Up YGEntertainment Account</p>

          <form onSubmit={handlesubmit}>
            <label htmlFor="name">Fullname</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Fullname"
              onChange={handleChange}
              required
            />

            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phonenumber"
              placeholder="Enter Phone Number"
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          <div className="links">
            <p>
              Already have an account?{" "}
              <Link to="/Login" className="Login">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Regis;
