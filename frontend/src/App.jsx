import { useEffect } from "react";
import "./App.css";
import AddResourceForm from "./components/AddResourceForm";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import Resources from "./components/Resources";
import Header from "./components/Header";
import { useUser } from "./context/UserContext";

function App() {
  const BACKEND = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    async function wakeBackend() {
      await fetch(BACKEND);
    }
    wakeBackend();
  }, []);
  const { user } = useUser();
  return (
    <>
      <main>
        <section>
          <Header />
          <Typography variant="h2">{user?.username}</Typography>
          <Routes>
            <Route
              path="/"
              element={<h1>Hello</h1>}
            />
            <Route
              path="/resources"
              element={<Resources />}
            />
            <Route
              path="/new"
              element={<AddResourceForm />}
            />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
