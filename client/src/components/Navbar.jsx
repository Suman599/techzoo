import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ user, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      backgroundColor: "#4B0082",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      flexWrap: "wrap",
    },
    brand: {
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    links: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      width: "100%",
      marginTop: "10px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      margin: "5px 0",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      margin: "5px 0",
    },
    hamburger: {
      fontSize: "24px",
      cursor: "pointer",
      display: "block",
    },
    desktopLinks: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>TechZoo</div>

      {isMobile ? (
        <>
          <div style={styles.hamburger} onClick={toggleMenu}>
            ☰
          </div>
          {menuOpen && (
            <div style={styles.links}>
              <Link to="/" style={styles.link}>Home</Link>
              {isAdmin && <Link to="/admin" style={styles.link}>Admin</Link>}
              {user ? (
                <button
                  onClick={handleLogout}
                  style={styles.button}
                >
                  Logout
                </button>
              ) : (
                <Link to="/auth" style={styles.link}>Login / Signup</Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={styles.desktopLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          {isAdmin && <Link to="/admin" style={styles.link}>Admin</Link>}
          {user ? (
            <button
              onClick={handleLogout}
              style={styles.button}
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" style={styles.link}>Login / Signup</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
