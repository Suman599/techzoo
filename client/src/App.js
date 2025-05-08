// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import Auth from "./pages/auth"; // Combined Login/Signup
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";


function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminEmails = [
    "chakrabortysuman599@gmail.com",
    "surendranath.chakraborty.22@gmail.com",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAdmin(adminEmails.includes(currentUser.email));
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} isAdmin={isAdmin} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
          {isAdmin && (
            <Route path="/admin" element={<AdminPage />} />
          )}
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
