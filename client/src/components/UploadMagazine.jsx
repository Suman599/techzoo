// src/pages/UploadMagazine.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UploadMagazine = () => {
  const [issueNumber, setIssueNumber] = useState('');
  const [issueMonth, setIssueMonth] = useState('');
  const [magazineFile, setMagazineFile] = useState(null);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setMagazineFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append('issueNumber', issueNumber);
    formData.append('issueMonth', issueMonth);
    formData.append('magazineFile', magazineFile);

    try {
      // Make a POST request to upload the magazine
      const response = await axios.post('/api/upload-magazine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Display success message
      setMessage(response.data.message);
    } catch (error) {
      // Display error message
      setMessage('Failed to upload magazine. Please try again.');
    }
  };

  return (
    <div className="admin-page">
      <h2>Upload Magazine</h2>
      {message && <p>{message}</p>} {/* Display success or error message */}

      <form className="upload-form" onSubmit={handleSubmit}>
        {/* Issue Number */}
        <div className="form-group">
          <label>Issue Number</label>
          <input
            type="text"
            value={issueNumber}
            onChange={(e) => setIssueNumber(e.target.value)}
            required
          />
        </div>

        {/* Issue Month */}
        <div className="form-group">
          <label>Issue Month</label>
          <input
            type="text"
            value={issueMonth}
            onChange={(e) => setIssueMonth(e.target.value)}
            required
          />
        </div>

        {/* Magazine File Upload */}
        <div className="form-group">
          <label>Magazine File</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadMagazine;
