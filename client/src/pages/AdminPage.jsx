import React, { useState } from "react";
import { db } from "../services/firebase"; // Firebase database reference
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore functions

const AdminPage = () => {
  const [issueNumber, setIssueNumber] = useState("");
  const [magazineUrl, setMagazineUrl] = useState("");
  const [issueMonth, setIssueMonth] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state to show progress

  const handleUpload = async (e) => {
    e.preventDefault();

    // Validation
    if (!issueNumber || !magazineUrl || !issueMonth) {
      setError("All fields are required!");
      return;
    }

    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      await addDoc(collection(db, "magazines"), {
        issueNumber,
        magazineUrl,
        issueMonth,
        timestamp: new Date(),
      });

      setSuccess("Magazine uploaded successfully!");
      setIssueNumber("");
      setMagazineUrl("");
      setIssueMonth("");
    } catch (err) {
      setError("Failed to upload magazine. Try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-heading">Upload New Magazine</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-group">
          <label htmlFor="issueNumber">Issue Number</label>
          <input
            type="text"
            id="issueNumber"
            placeholder="Enter Issue Number"
            value={issueNumber}
            onChange={(e) => setIssueNumber(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="magazineUrl">Magazine URL</label>
          <input
            type="text"
            id="magazineUrl"
            placeholder="Enter Magazine URL"
            value={magazineUrl}
            onChange={(e) => setMagazineUrl(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="issueMonth">Issue Month</label>
          <input
            type="text"
            id="issueMonth"
            placeholder="Enter Issue Month"
            value={issueMonth}
            onChange={(e) => setIssueMonth(e.target.value)}
            className="input-field"
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            "Upload Magazine"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
