import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchProvider from "../../Context/SearchProvider";
import WishItemsProvider from "../../Context/WishItemsProvider";
import CartItemsProvider from "../../Context/CartItemsProvider";

const UserLayout = () => {
    return (
        <CartItemsProvider>
            <WishItemsProvider>
                <SearchProvider>
                    <Header />
                    <Outlet />
                    <Footer />
                </SearchProvider>
            </WishItemsProvider>
        </CartItemsProvider>
    )
}

export default UserLayout;