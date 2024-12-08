import React from "react";
import { Link } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin";
import Footer from "../../components/Footer";
import "../../style/Login.css"; // Assuming you have a CSS file for styling
import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authSlice";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate("/HomeLogged");
    } catch (error) {
      console.log("Error Login", error);

      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  React.useEffect(() => {
    console.log(errorMessage);
  }, []);
  return (
    <>
      <NavbarLogin />

      <main>
        <div className="login-container">
          <h1>YGEntertainment Account</h1>
          <p>Log in YGEntertainment Account</p>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          <div className="links">
            <p>
              Forgot Password?{" "}
              <Link to="/Reset" className="Reset">
                Log In
              </Link>
            </p>
            <p>
              Don't have an account?{" "}
              <Link to="/Regis" className="regis">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
