import { Link } from "react-router-dom";
import axios from "axios";
import "./User.css";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

const User = (props) => {
  const [image, setImage] = useState("");
  const [cmts, setComments] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      await axios
        .get(`http://localhost:3000/v1/images/${props.user.avatar}`)
        .then((res) => {
          const img = res.data;
          setImage(img.image);
        })
        .catch((err) => console.log(err));
    };
    const fetchComment = async (comments) => {
      await axios
        .get(`http://localhost:3000/v1/comments/${comments}`)
        .then((res) => {
          const comment = res.data;
          setComments((s) => [...s, comment]);
        })
        .catch((err) => console.log(err));
    };
    fetchImage();
    const cmt = props.user.comments;
    cmt.forEach((element) => {
      fetchComment(element);
    });
  }, []);
  return (
    <Container style={{ flexDirection: "row", display: "flex" }}>
      <Box style={{ width: 650, marginRight: 20 }}>
        <Typography variant="h2" textAlign={"center"}>
          User Information
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
              User Name: {props.user.firstName} {props.user.lastName}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">Email: {props.user.email}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">Phone Number: </Typography>
            <Typography variant="body2">{props.user.phoneNumber}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="body2">
              Address: {props.user.address}
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
          {cmts.map((value) => (
            <ListItem key={value._id}>
              <ListItemText primary={`${value.content}`} />
              <Typography variant="body2">Ratings: {value.rating}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default User;
