import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ResourceProvider } from "./context/ResourceContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
//
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ResourceProvider>
          <App />
        </ResourceProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
