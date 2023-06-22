import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setLoggedIn } from "../../store/authSlice";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();

  const api = axios.create({
    baseURL: "http://localhost:4002",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let isValid = true;

    setUsernameError("");
    setPasswordError("");
    setLoginError("");

    if (!username) {
      setUsernameError("Please enter your username");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please enter your password");
      isValid = false;
    }

    if (isValid) {
      const requestBody = {
        username: username,
        password: password,
      };

      try {
        const response = await api.post("/auth/login", requestBody);
        if (response) {
          dispatch(setLoggedIn(true));
          navigate("/home");
        }
      } catch (error) {
        // Handle login error
        console.error("Error occurred during login:", error);
        setLoginError("Invalid Username or password");
      }
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3">
        <div className="card auth">
          <div className="card-body auth-card">
            <div className="auth-avatar">
              <img
                src="https://pluspng.com/img-png/user-png-icon-account-avatar-human-male-man-men-people-person-download-svg-download-png-edit-icon-512.png"
                alt="user"
                className="user-image"
              />
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <div className="error">{usernameError}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
              <div className="text-center">
                <input type="submit" className="btn btn-my" value="Login" />
              </div>
              {loginError && <div className="error">{loginError}</div>}
            </form>
            <div className="text-center sign-up">
              Don`t have an account ?{" "}
              <a href="/signup" onClick={handleSignup}>
                Sign Up
              </a>{" "}
              here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
