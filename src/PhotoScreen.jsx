// PhotoScreen.jsx
/** @jsxImportSource react */
import React from "react";
import "./PhotoScreen.css";

function PhotoScreen({ onBack }) {
  return (
    <div className="photo-screen">
      <h1>📸 Log Your Meal</h1>
      <div className="photo-placeholder">
        <p>Coming soon: AI food recognition!</p>
        <img
          src="/images/photo-placeholder.png"
          alt="Photo Placeholder"
          className="placeholder-image"
        />
      </div>
      <p className="note">
        In the future, you’ll take a photo of your meal and get instant
        feedback. 🍎🥦🍗
      </p>
      <button className="back-button" onClick={onBack}>
        ⬅ Back
      </button>
    </div>
  );
}

export default PhotoScreen;
