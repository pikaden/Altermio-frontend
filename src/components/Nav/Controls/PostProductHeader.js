import React from "react";
import SellIcon from '@mui/icons-material/Sell';
import Button from "@mui/material/Button";
function PostProductHeader() {

    return (
      <div>
        <Button
          sx={
              {
                  color: "black"
              }   
          }
        >
          <SellIcon color="black" size="large" sx={{ width: "35px" }} />
        </Button>
      </div>
    );
  }

export default PostProductHeader;