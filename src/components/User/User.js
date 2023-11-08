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
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const User = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      await axios
        .get(`http://localhost:3000/v1/images/${props.user.results.avatar}`)
        .then((res) => {
          const img = res.data;
          setImage(img.image);
        })
        .catch((err) => console.log(err));
    };
    fetchImage();
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
              User Name: {props.user.results.firstName} {props.user.results.lastName}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">Email: {props.user.results.email}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">Phone Number: </Typography>
            <Typography variant="body2">{props.user.results.phoneNumber}</Typography>
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
        <Typography variant="h2" textAlign={"center"}>
          Comments
        </Typography>
        <Divider />
        <List>
          {props.user.results.comments.map((value) => (
            <ListItem key={value._id}>
              <ListItemText primary={`${value.content}`} />
              <Typography variant="body2">Rating: {value.rating}</Typography>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Container>
  );
};

export default User;
