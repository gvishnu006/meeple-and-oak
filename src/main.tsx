import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tokens.css";
import "./styles/type.css";
import "./styles/shake.css";
import "./styles/shelf.css";
import "./styles/site.css";
import "./styles/home.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
