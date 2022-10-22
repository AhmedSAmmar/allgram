import * as React from "react";

// Material UI
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material/";
import { logoutUser } from "../api/userAuth";
import { useSelector } from "react-redux";

// Create Component
function NavBar() {
  const { fullname } = useSelector((state) => state.currentUser.value.user);

  const logout = () => {
    logoutUser();
  };
  // JSX
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, mx: "10px" }}
          >
            Allgram
          </Typography>
          <Typography sx={{ mr: "20px" }}>{fullname}</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
