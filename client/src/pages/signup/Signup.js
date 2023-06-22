import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:4002",
  });

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    let isValid = true;

    setUsernameError("");
    setPasswordError("");
    setSignupError("");
    setSignupSuccess("");

    if (!username) {
      setUsernameError("Please set your username");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Please set your password");
      isValid = false;
    }

    if (isValid) {
      const requestBody = {
        username: username,
        password: password,
      };

      try {
        const response = await api.post("/auth/signup", requestBody);
        if (response) {
          setSignupSuccess('User successfully registered. Please login to continue!')
        }
      } catch (error) {
        // Handle login error
        console.error("Error occurred during login:", error);
        setSignupError("User already registered");
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
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
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Set your username"
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
                  placeholder="Set your password"
                />
                {passwordError && <div className="error">{passwordError}</div>}
              </div>
              <div className="text-center">
                <input type="submit" className="btn btn-my" value="Signup" />
              </div>
              {signupError && <div className="error">{signupError}</div>}
            </form>

            {signupSuccess && (<div className="text-center sign-up">
              You have successfully registered. Please {" "}
              <a href="/login" onClick={handleLogin}>
                Login
              </a>{" "}
            </div>)}
            {!signupSuccess && 
            (<div className="text-center sign-up">
              Already have an account ?{" "}
              <a href="/login" onClick={handleLogin}>
                Login
              </a>{" "}
              here.
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
