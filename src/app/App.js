import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../routes/Home";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import CartItemsProvider from "../Context/CartItemsProvider";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import WishItemsProvider from "../Context/WishItemsProvider";
import DrawerNav from "../components/Nav/DrawerNav/DrawerNav";
import Checkout from "../components/Checkout/Checkout";
import SearchProvider from "../Context/SearchProvider";
import AdminPage from "../components/Roles/Admin/AdminPage";
import UserLayout from "../components/layouts/UserLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import ModeratorLayout from "../components/layouts/ModeratorLayout";
import CourierLayout from "../components/layouts/CourierLayout";
import ModeratorPage from "../components/Roles/Moderator/ModeratorPage";
import CourierPage from "../components/Roles/Courier/CourierPage";
import ContactUs from "../components/Nav/ContactUs/ContactUs";
import AboutUs from "../components/Nav/AboutUs/AboutUs";
import Chatpage from "../components/Pages/Chatpage";
import ChatLayout from "../components/layouts/ChatLayout";
import PostProduct from "../components/Nav/PostProduct/PostProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<AdminPage />} />
        </Route>

        <Route element={<ModeratorLayout />}>
          <Route path="/moderator" element={<ModeratorPage />} />
          <Route path="/*" element={<ModeratorPage />} />
        </Route>
        
        <Route path="/account">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/account">
            <Route path="me" element={<MyAccount />} />
            <Route path="manage" element={<ManageAccount />} />
          </Route>

          <Route path="/shop" element={<Shop />} />
          <Route path="/category">
            <Route path=":id" element={<CategoryView />} />
          </Route>
          <Route path="/products/create" element={<PostProduct />} />
          
          <Route path="/item">
            <Route path="/item/">
              <Route path=":id" element={<ItemView />} />
            </Route>

            <Route path="/item/men">
              <Route path=":id" element={<ItemView />} />
            </Route>
            <Route path="/item/women">
              <Route path=":id" element={<ItemView />} />
            </Route>
            <Route path="/item/kids">
              <Route path=":id" element={<ItemView />} />
            </Route>
            <Route path="/item/featured">
              <Route path=":id" element={<ItemView />} />
            </Route>
          </Route>

          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search/*" element={<SearchView />} />

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />

        </Route>

        <Route element={<ChatLayout />} >
          <Route path="/chats" element={<Chatpage />} />
        </Route>

        <Route element={<CourierLayout />}>
          <Route path="/courier" element={<CourierPage />} />
          <Route path="/*" element={<CourierPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
