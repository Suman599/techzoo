import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [magazines, setMagazines] = useState([]);

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
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#4B0082" }}>
        📰 Welcome to TechZoo Magazine
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {magazines.map((magazine, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "20px",
              width: "250px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ color: "#333" }}>
              Issue {magazine.issueNumber} - {magazine.issueMonth}
            </h3>
            <a
              href={magazine.magazineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "10px 20px",
                backgroundColor: "#4B0082",
                color: "white",
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
    </div>
  );
};

export default Home;
