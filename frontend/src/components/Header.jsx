import React from "react";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";
import { useUser } from '../context/UserContext';

function Header() {
  const { user, login } = useUser();

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
          {user?.username || "Guest"}
      
        </Typography>

        <Stack
          direction={"row"}
          spacing={1}
        >
          <Button
            color="inherit"
            component={"button"}
            onClick={() => login({ username: "lbens", name: "Lewis" })}
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
