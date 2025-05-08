import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase"; // Firebase auth reference

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear previous success messages

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/"), 1500); // Redirect to Home after successful signup
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Logged in successfully!");
        setTimeout(() => navigate("/"), 1500); // Redirect to Home after successful login
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignup ? "Create Account" : "Login to Your Account"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <div className="toggle">
          <span>{isSignup ? "Already have an account?" : "Don't have an account?"}</span>
          <a href="#" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
