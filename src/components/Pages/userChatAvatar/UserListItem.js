import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { defaultImage } from "../../../Context/DefaultImage";
import axios from "axios";

const UserListItem = ({ user, handleFunction }) => {

  const [imageUrl, setImageUrl] = useState();
  const defaultImageUrl = defaultImage;

  const fetchAvatar = async () => {
    // get image by id and return url
    await axios.get(`http://localhost:3000/v1/images/${user.avatar}`)
      .then(res => {
        const imageRes = res.data ?
          res.data.image.url :
          defaultImageUrl;
        setImageUrl(imageRes);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchAvatar();
  }, [imageUrl])

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={`${user.firstName + user.lastName}`}
        src={imageUrl}
      />
      <Box>
        <Text>{`${user.firstName + ' ' + user.lastName}`}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
