import React, { useState } from "react";
import Button from "@mui/material/Button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Notification from "./Notification";

const DEFAULT_NOTIFICATIONS = [
  {
    image:
      "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago"
  },
  {
    image:
      "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification two.",
    detailPage: "/events",
    receivedTime: "1d ago"
  }
];

function NotificationMenu() {
  const [data, setData] = useState(DEFAULT_NOTIFICATIONS);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}
        sx={
            {
                color: "black"
            }   
        }
      >
        <NotificationsIcon color="black" size="large" sx={{ width: "35px" }} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Notification notifications={data} />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default NotificationMenu;