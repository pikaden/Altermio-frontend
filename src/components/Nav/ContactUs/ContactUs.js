import Control from "../Controls/Control";
import DrawerNav from "../DrawerNav/DrawerNav";
import NavBrand from "../Nav-Brand/Navbrand";
import Form from "../Search-Bar/Form";
import { Link } from "react-router-dom";
import "./ContactUs.css";
import { Box, TextField, Button } from "@mui/material";

const ContactUs = () => {
  return (
    <Box className="section">
      <Box className="container">
        <Box className="row">
          <Box className="col-md-12">
            <Box className="section-title">
              <h2 className="title">Contact Us</h2>
              <h4>
                Let us know what you think! In order to provide better service,
                please do not hesitate to give us your feedback. Thank you.
              </h4>
              <hr />
              <form id="contact-form">
                <Box className="form-group">
                  <Box className="row">
                    <Box className="col-md-6">
                      <TextField
                        id="standard-basic"
                        label="Name"
                        variant="outlined"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </Box>
                    <Box className="col-md-6">
                      <TextField
                        id="standard-basic"
                        label="Email"
                        variant="outlined"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="form-group">
                  <TextField
                    id="standard-basic"
                    label="Subject"
                    variant="outlined"
                    type="text"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box className="form-group">
                  <TextField
                    id="standard-basic"
                    label="Message"
                    variant="outlined"
                    type="text"
                    style={{ width: "100%" }}
                  />
                </Box>
                <Button variant="outlined" style={{marginBottom: 20}}>Submit</Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
