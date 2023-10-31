import "./AboutUs.css";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";

const AboutUs = () => {
  const [team, setTeam] = useState([
    {
      name: "Hung Le",
      title: "1",
      image:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/368441979_1505645200007839_3407134920052441376_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uLgZOMnzLCUAX8TtDQL&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdSg6dvP_2LNKy1GhrjZbf0_NKxQ0dQ33Ctxp5zWaKfCIQ&oe=6567C0E8",
    },
    {
      name: "Boom Le",
      title: "2",
      image:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/368441979_1505645200007839_3407134920052441376_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uLgZOMnzLCUAX8TtDQL&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdSg6dvP_2LNKy1GhrjZbf0_NKxQ0dQ33Ctxp5zWaKfCIQ&oe=6567C0E8",
    },
    {
      name: "Thang Le",
      title: "3",
      image:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/368441979_1505645200007839_3407134920052441376_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uLgZOMnzLCUAX8TtDQL&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdSg6dvP_2LNKy1GhrjZbf0_NKxQ0dQ33Ctxp5zWaKfCIQ&oe=6567C0E8",
    },
    {
      name: "Thanh Huynh",
      title: "4",
      image:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/368441979_1505645200007839_3407134920052441376_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uLgZOMnzLCUAX8TtDQL&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdSg6dvP_2LNKy1GhrjZbf0_NKxQ0dQ33Ctxp5zWaKfCIQ&oe=6567C0E8",
    },
    {
      name: "Nhan Pham",
      title: "5",
      image:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/368441979_1505645200007839_3407134920052441376_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=uLgZOMnzLCUAX8TtDQL&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdSg6dvP_2LNKy1GhrjZbf0_NKxQ0dQ33Ctxp5zWaKfCIQ&oe=6567C0E8",
    },
  ]);

  return (
    <Container maxWidth="md">
      <Typography variant="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        We are a team of five passionate individuals who believe in the power of
        second-hand shopping to reduce waste and make fashion more sustainable.
        That's why we created this website, where you can find a wide variety of
        high-quality second-hand items at affordable prices.
      </Typography>
      <Cards team={team} />
    </Container>
  );
};

const Cards = ({ team }) => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Our Team
      </Typography>
      {team.map((member, index) => (
        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <img src={member.image} alt={member.name} style={{width:300, height: 300}}/>
            <Typography variant="h3" gutterBottom>
              {member.name}
            </Typography>
            <Typography variant="body1">{member.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AboutUs;
