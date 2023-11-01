import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "./Chat/Chatbox";
import MyChats from "./Chat/MyChats";
import SideDrawer from "./miscellaneous/SideDrawer";
import { ChatState } from "./Provider/ChatProvider";
import './Chatpage.css';

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    // console.log('aaa: ' + user),
    <div className="Chatpage">
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
