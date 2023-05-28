import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#87E0F1",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./rocket.png",
  fullDecal: "./galaxy-bg.jpg",
});

export default state;
