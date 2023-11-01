import { Navigate, Outlet } from "react-router-dom";
import ChatProvider from "../Pages/Provider/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";

const ChatLayout = () => {

    const currentUser = localStorage.getItem("user");

    const user = JSON.parse(currentUser)

    if (user) return (
        <div className='header__container'>
            <ChakraProvider>
                <ChatProvider>
                    <Outlet />
                </ChatProvider>
            </ChakraProvider>
        </div>
    )

    return (
        <Navigate to='/' />
    )
}

export default ChatLayout;