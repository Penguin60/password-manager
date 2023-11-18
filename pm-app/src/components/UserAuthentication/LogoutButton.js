import { Avatar, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

const LogoutButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOutHandler = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar sx={{bgcolor: "#2F7C31"}}> {firebase.auth().currentUser.email.charAt(0).toUpperCase()} </Avatar>
      </IconButton>
      <Menu
      sx={{ mt: '55px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={signOutHandler}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default LogoutButton;
