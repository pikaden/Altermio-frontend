import { Link } from "react-router-dom";
import axios from "axios";
import "./User.css";
import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { isEmpty } from "lodash";
import Login from "../Authentication/Login/Login";

const User = (props) => {
  const [value, setValue] = React.useState("1");
  const [image, setImage] = useState("");
  const [prod, setProduct] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchImage = async () => {
      await axios
        .get(`http://localhost:3000/v1/images/${props.user.results.avatar}`)
        .then((res) => {
          const img = res.data;
          if (img.image === null) {
            setImage({
              url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
            });
          } else {
            setImage(img.image);
          }
        })
        .catch((err) => console.log(err));
    };
    const fetchProducts = async () => {
      await axios
        .get(`http://localhost:3000/v1/products/user/${props.user.results.id}`)
        .then((res) => {
          // console.log(res.data);
          setProduct(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchImage();
    fetchProducts();
  }, []);
  return (
    <Container style={{ flexDirection: "row", display: "flex" }}>
      <Box style={{ width: 650, marginRight: 20 }}>
        <Typography variant="h2" textAlign={"center"}>
          User Informations
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <Avatar
              src={image.url}
              style={{ marginRight: 20, width: 160, height: 160 }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">
              User Name: {props.user.results.firstName}{" "}
              {props.user.results.lastName}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">
              Email: {props.user.results.email}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">Phone Number: </Typography>
            <Typography variant="body2">
              {props.user.results.phoneNumber}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">
              Address: {props.user.results.address}
            </Typography>
          </ListItem>
          <Divider />
        </List>
      </Box>
      <Box style={{ width: 500, justifyContent: "flex-end" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Comments" value="1" />
              <Tab label="Products" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <List>
              {props.user.results.comments.map((value) => (
                <ListItem key={value._id}>
                  <ListItemText primary={`${value.content}`} />
                  <Typography variant="body2">
                    Rating: {value.rating}
                  </Typography>
                  <Divider />
                </ListItem>
              ))}
            </List>
          </TabPanel>
          <TabPanel value="2">
            {prod.map((value) => (
              <ListItem key={value.id}>
                <ListItemButton href={`/item/${value.id}`} >
                  <ListItemText primary={`Product: ${value.name}`} />
                </ListItemButton>
                <Typography variant="body2">Price: {value.price}</Typography>
                <Divider />
              </ListItem>
            ))}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default User;
