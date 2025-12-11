import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomeScreen from "./HomeScreen";
import MainScreen from "./MainScreen";
import FaceCreator from "./FaceCreator";
import CharacterScreen from "./CharacterScreen";
import CustomizeCharacterScreen from "./CustomizeCharacterScreen";
import FoodLog from "./FoodLog";
import QuestScreen from "./QuestScreen";
import GamesHubScreen from "./GamesHubScreen";
import MapScreen from "./MapScreen";
import RewardsScreen from "./RewardsScreen";
import SettingsScreen from "./SettingsScreen";

export default function App() {
  return (
    <Routes>
      {/* Start */}
      <Route path="/" element={<HomeScreen />} />

      {/* Onboarding */}
      <Route path="/create-hero" element={<FaceCreator />} />

      {/* Main Hub */}
      <Route path="/main" element={<MainScreen />} />

      {/* Feature screens */}
      <Route path="/quests" element={<QuestScreen />} />
      <Route path="/map" element={<MapScreen />} />
      <Route path="/rewards" element={<RewardsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />

      {/* ✅ Make sure these 3 routes exist */}
      <Route path="/food" element={<FoodLog />} />
      <Route path="/games" element={<GamesHubScreen />} />
      <Route path="/character" element={<CharacterScreen />} />

      {/* Customisation */}
      <Route
        path="/customize-character"
        element={<CustomizeCharacterScreen />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
