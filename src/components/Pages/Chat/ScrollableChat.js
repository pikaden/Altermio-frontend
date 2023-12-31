import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Provider/ChatProvider";
import { defaultImage } from "../../../Context/DefaultImage";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

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
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <Tooltip label={`${m.sender.firstName} ${m.sender.lastName}`} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={`${m.sender.firstName} ${m.sender.lastName}`}
                  src={imageUrl}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender.id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
