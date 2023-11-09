import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const host = "https://provinces.open-api.vn/api/";

export default function Register() {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState({
    code: "",
    stateName: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    code: "",
    stateName: "",
  });
  const [selectedWard, setSelectedWard] = useState({
    code: "",
    stateName: "",
  });

  useEffect(() => {
    axios.get(host + "?depth=1").then((response) => {
      setCities(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCity.code) {
      axios
        .get(host + "p/" + selectedCity.code + "?depth=2")
        .then((response) => {
          setDistricts(response.data.districts);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict.code) {
      axios
        .get(host + "d/" + selectedDistrict.code + "?depth=2")
        .then((response) => {
          setWards(response.data.wards);
        });
    }
  }, [selectedDistrict]);

  const handleCityChange = (event) => {
    setSelectedCity((state) => ({ ...state, code: event.target.value }));
    setSelectedCity((state) => ({
      ...state,
      stateName: cities.find((city) => city.code === event.target.value).name,
    }));
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict((state) => ({ ...state, code: event.target.value }));
    setSelectedDistrict((state) => ({
      ...state,
      stateName: districts.find(
        (district) => district.code === event.target.value
      ).name,
    }));
    setSelectedWard("");
  };

  const handleWardChange = (event) => {
    setSelectedWard((state) => ({ ...state, code: event.target.value }));
    setSelectedWard((state) => ({
      ...state,
      stateName: wards.find((wards) => wards.code === event.target.value).name,
    }));
  };

  const handleEmail = async (email) => {
    const response = await axios
      .post(`http://localhost:3000/v1/auth/check-email-taken`, {
        email: email,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data === true) {
            alert("Email is already Taken");
          }
        } else {
          return true;
        }
      })
      .catch((error) => {
        return true;
      });
  };

  const handleSubmit = async (event) => {
    const numberOrSpecialCharacterRegex = /[\d\W]/;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const repassword = data.get("repassword");
    const email = data.get("email");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    handleEmail(email);
    if (numberOrSpecialCharacterRegex.test(firstName)) {
      alert("First name is not valid with number, special character");
      event.preventDefault();
      return;
    }
    if (numberOrSpecialCharacterRegex.test(lastName)) {
      alert("Last name is not valid with number, special character");
      event.preventDefault();
      return;
    }
    if (password.length < 8) {
      alert("Password need to be atleast 8 characters");
      event.preventDefault();
      return;
    }
    if (!password.match(repassword)) {
      alert("Enter password need to be matched");
      event.preventDefault();
      return;
    }
    if (!emailRegex.test(email)) {  
      alert("Email is not valid");
      event.preventDefault();
      return;
    }
    const detailsaddress = data.get("detailsAddress");
    const address =
      detailsaddress +
      ", " +
      selectedWard.stateName +
      ", " +
      selectedDistrict.stateName +
      ", " +
      selectedCity.stateName;
    await axios
      .post(`http://localhost:3000/v1/auth/register`, {
        email: data.get("email"),
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phoneNumber: data.get("phoneNumber"),
        address: address,
      })
      .then((response) => {
        alert('Sign up successfully!');
        navigate('/account/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // onChange={(event) => handleEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Re-Enter Password"
                  type="password"
                  id="repassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">City</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCity.code}
                    label="City"
                    onChange={handleCityChange}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.code} value={city.code}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Disctrict
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedDistrict.code}
                    label="District"
                    onChange={handleDistrictChange}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district.code} value={district.code}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Ward</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedWard.code}
                    label="Age"
                    onChange={handleWardChange}
                  >
                    {wards.map((wards) => (
                      <MenuItem key={wards.code} value={wards.code}>
                        {wards.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="detailsAddress"
                  label="Detail Address"
                  name="detailsAddress"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#ff9c00" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    navigate("/account/login");
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
