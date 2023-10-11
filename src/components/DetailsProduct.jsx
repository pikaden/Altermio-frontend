import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from "react";
import axios from "axios";
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Link,
} from "@mui/material";
import { useEffect } from "react";

const URL = "https://api.slingacademy.com/v1/sample-data/photos";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [images, setImage] = useState([]);

  useEffect(() => {
    async function getData() {
      let { data } = await axios.get(URL);
      setImage(data.photos);
      console.log(images);
    }
    getData();
  }, []);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Categories
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
          <Box>
            <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 25 }}>
              <Link underline="hover" color="inherit" href="/">
                MUI
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Core
              </Link>
              <Typography color="White">Breadcrumbs</Typography>
            </Breadcrumbs>
          </Box>
          <Container>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: 20 }}
            >
              <Grid item xs={5}>
                <ImageListItem sx={{ width: 400, height: 400 }} rowHeight={400}>
                  <img
                    src={
                      images[1].url
                    }
                    alt={"successfully"}
                    loading="lazy"
                    style={{
                      marginBottom: 25,
                      borderRadius: 23,
                    }}
                  />
                </ImageListItem>

                <ImageList
                  sx={{
                    width: 400,
                    height: 150,
                    gridAutoFlow: "column",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(160px,1fr)) !important",
                    gridAutoColumns: "minmax(160px, 1fr)",
                  }}
                  cols={5}
                  rowHeight={100}
                >
                  {images.map((item) => (
                    <ImageListItem key={item.url}>
                      <img
                        style={{
                          borderRadius: 7,
                        }}
                        srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid item xs={7}>
                <Typography component="h1" variant="h5">
                  Shop Name
                </Typography>
                <Typography
                  component="h1"
                  variant="h4"
                  style={{ fontWeight: "bold", marginBottom: 30 }}
                >
                  Product Name
                </Typography>
                <Typography
                  component="h1"
                  variant="h2"
                  style={{ fontWeight: "bold", marginBottom: 30 }}
                >
                  277$
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Description
                </Typography>
                <Typography component="h1" variant="h6" fontSize={15}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text. Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's standard dummy text. Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text.
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ShoppingCartIcon />}
                  style={{ marginTop: 20 }}
                  size="large"
                >
                  Add to card
                </Button>
                <IconButton size="large" style={{ marginTop: 20 }}>
                  <ChatIcon fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6">Report</Typography>
              </Grid>
            </Grid>
          </Container>
        </AppBar>
      </Box>
    </Container>
  );
}
