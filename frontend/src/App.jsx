import { useEffect } from "react";
import "./App.css";
import AddResourceForm from "./components/AddResourceForm";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import Resources from "./components/Resources";

function App() {
  const BACKEND = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    async function wakeBackend() {
      await fetch(BACKEND);
    }
    wakeBackend();
  }, []);

  return (
    <>
      <main>
        <section>
          <AppBar
            sx={{ mb: 2 }}
            position="static"
          >
            <Toolbar>
              <Typography
                sx={{ flexGrow: 1 }}
                component={"h3"}
                variant="h6"
              >
                Resource Library
              </Typography>

              <Stack
                direction={"row"}
                spacing={1}
              >
                <Button
                  color="inherit"
                  component={Link}
                  to="/new"
                >
                  Create
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/resources"
                >
                  Resources
                </Button>
              </Stack>
            </Toolbar>
          </AppBar>

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
