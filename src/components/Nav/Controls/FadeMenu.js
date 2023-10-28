import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user");
  const user = JSON.parse(currentUser);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    setAnchorEl(null);
    navigate("/account/login");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigate("/account/login")
  }

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/account/me")
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "black",
        }}
      >
        <PersonOutlineIcon color="black" size="large" sx={{ width: "35px" }} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {!user && (
          <>
            <MenuItem onClick={handleLogin}>
              <LoginIcon sx={{ mr: 1 }} />
              Login
            </MenuItem>
          </>
        )}
        {user && (
          <>
            <MenuItem onClick={handleProfile}>
              <SettingsIcon sx={{ mr: 1 }} />
              My Account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HistoryIcon sx={{ mr: 1 }} />
              Order List
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
