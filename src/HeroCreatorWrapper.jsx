// src/HeroCreatorWrapper.jsx
import React from "react";
import FaceCreator from "./FaceCreator";
import "./HeroCreatorWrapper.css";

export default function HeroCreatorWrapper() {
  return (
    <div className="HeroCreatorWrapper">
      <div className="HeroIntro">
        <h1>Create Your Hero! ⚔️</h1>
        <p>Choose your look and begin your adventure!</p>
      </div>
      {/* FaceCreator renders ONLY the stage/picker — no extra title */}
      <FaceCreator />
    </div>
  );
}
