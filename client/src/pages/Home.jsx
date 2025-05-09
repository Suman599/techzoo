import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [magazines, setMagazines] = useState([]);
  const [columns, setColumns] = useState(getGridColumns());

  function getGridColumns() {
    return window.innerWidth <= 768 ? 1 : 4;
  }

  useEffect(() => {
    const fetchMagazines = async () => {
      const querySnapshot = await getDocs(collection(db, "magazines"));
      const magazineList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMagazines(magazineList);
    };

    fetchMagazines();

    const handleResize = () => {
      setColumns(getGridColumns());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <header style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#4B0082", fontSize: "40px", marginBottom: "10px" }}>
          📰 TechZoo Magazine
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "18px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Explore the latest tech trends, innovations, and news through our
          monthly curated digital magazine.
        </p>
        <img
          src="logo.png"
          alt="Magazine"
          style={{ width: "80px", marginTop: "20px" }}
        />
      </header>

      {/* Magazine Cards */}
      <main
        style={{
          padding: "0 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "50px",
            justifyItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            paddingBottom: "60px",
          }}
        >
          {magazines.map((magazine, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                maxWidth: "320px",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3 style={{ color: "#222" }}>
                📘 Issue {magazine.issueNumber}
                {index === magazines.length - 1 && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#fff",
                      background: "#ff4081",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      marginLeft: "5px",
                    }}
                  >
                    New
                  </span>
                )}
              </h3>
              <p style={{ color: "#666", marginBottom: "20px" }}>
                {magazine.issueMonth}
              </p>
              <a
                href={magazine.magazineUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4B0082",
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View Magazine
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Feedback Button */}
      <button
        onClick={() =>
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSdD2RlQ-FyWGlDX-LbULCRKECJFyNcd5s_wHbSXFiZ_jBvtrg/viewform?usp=header",
            "_blank"
          )
        }
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4B0082",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          padding: "12px 18px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        💬 Feedback
      </button>

      {/* Footer */}
      <footer
        style={{
          marginTop: "40px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#4B0082",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} TechZoo Magazine | Designed by Suman Chakraborty
      </footer>
    </div>
  );
};

export default Home;
