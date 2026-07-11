import React, { useState } from "react";
import { AppBar, Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";
import { useUser } from '../context/UserContext';

function Header() {
  const { user, login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
          {user?.email || "Guest"}
        </Typography>

        <Stack
          direction={"row"}
          spacing={1}
        >
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color="inherit"
            component={"button"}
            onClick={() => login(email, password)}
          >
            Login
          </Button>
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
  );
}

export default Header;
