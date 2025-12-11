// src/faceAssets.js
const PUB = process.env.PUBLIC_URL || "";
const P = (s) => `${PUB}${s}`;

// Base body
export const BASE_BODY = P("/assets/face/base.png");

// -------- Parts (keep these exact names you already have on disk) --------
export const EYES = [
  "/assets/face/eyes/eyes_01.png",
  "/assets/face/eyes/eyes_02.png",
  "/assets/face/eyes/eyes_03.png",
  "/assets/face/eyes/eyes_04.png",
  "/assets/face/eyes/eyes_05.png",
  "/assets/face/eyes/eyes_06.png",
  "/assets/face/eyes/eyes_07.png",
  "/assets/face/eyes/eyes_08.png",
].map(P);

export const EYEBROWS = [
  "/assets/face/eyebrows/brows_01.png",
  "/assets/face/eyebrows/brows_02.png",
  "/assets/face/eyebrows/brows_03.png",
  "/assets/face/eyebrows/brows_04.png",
  "/assets/face/eyebrows/brows_05.png",
  "/assets/face/eyebrows/brows_06.png",
  "/assets/face/eyebrows/brows_07.png",
  "/assets/face/eyebrows/brows_08.png",
].map(P);

export const NOSES = [
  "/assets/face/noses/nose_01.png",
  "/assets/face/noses/nose_02.png",
  "/assets/face/noses/nose_03.png",
  "/assets/face/noses/nose_04.png",
  "/assets/face/noses/nose_05.png",
  "/assets/face/noses/nose_06.png",
  "/assets/face/noses/nose_07.png",
  "/assets/face/noses/nose_08.png",
].map(P);

export const MOUTHS = [
  "/assets/face/mouths/mouth_01.png",
  "/assets/face/mouths/mouth_02.png",
  "/assets/face/mouths/mouth_03.png",
  "/assets/face/mouths/mouth_04.png",
  "/assets/face/mouths/mouth_05.png",
  "/assets/face/mouths/mouth_06.png",
  "/assets/face/mouths/mouth_07.png",
  "/assets/face/mouths/mouth_08.png",
].map(P);

export const HAIR = [
  "/assets/face/hair/hair_01.png",
  "/assets/face/hair/hair_02.png",
  "/assets/face/hair/hair_03.png",
  "/assets/face/hair/hair_04.png",
  "/assets/face/hair/hair_05.png",
  "/assets/face/hair/hair_06.png",
  "/assets/face/hair/hair_07.png",
  "/assets/face/hair/hair_08.png",
].map(P);

// -------- UI icons (exact filenames from your /public/assets/ui folder) --------
export const UI = {
  back: P("/assets/ui/button_back.png"),
  eyesTab: P("/assets/ui/button_eyes.png"),
  browsTab: P("/assets/ui/button_eyecateg.png"), // eyebrows category
  noseTab: P("/assets/ui/button_nose.png"),
  mouthTab: P("/assets/ui/button_mouth.png"),
  hairTab: P("/assets/ui/button_haircateg.png"),
  settings: P("/assets/ui/button_settings.png"),
  nice: P("/assets/ui/button_nice.png"),
};
