import React from "react";
import SellIcon from '@mui/icons-material/Sell';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
function PostProductHeader() {

  return (
    <div>
      <Link
        sx={{
          color: "black"
        }}
        to='/products/create'
      >
        <SellIcon color="black" size="large" sx={{ width: "35px" }} />
      </Link>
    </div>
  );
}

export default PostProductHeader;