import { useEffect } from "react";
import Account from "../Account";
import "./MyAccount.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderHistory from "../../order/OrderHistory";

const MyAccount = () => {
  let accessToken = localStorage.getItem("accessToken");
  const [res, setRes] = useState({
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const getUserInformation = async () => {
      const response = await axios.get(
        `http://localhost:3000/v1/users/me/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            access_token: accessToken,
          },
        }
      );
      setRes(response.data);
    };
    getUserInformation();
  }, [accessToken]);
  return (
    <Account>
      <div className="order__history__container">
        <div className="order__history">
          <div className="order__history__header">Order History</div>
          <div className="order__history__detail">
            <OrderHistory></OrderHistory>
          </div>
        </div>
      </div>
      <div className="account__details__container">
        <div className="account__details__header">
          <div className="details__header">Account Details</div>
          <div className="logout__action">Logout</div>
        </div>
        <div className="account__details">
          <div className="account__holder__name">
            {res.firstName} {res.lastName}
          </div>
          <div className="account__holder__email">{res.email}</div>
          <div className="manage__account__action">
            <Link to="/account/manage">Manage account</Link>
          </div>
          <div className="manage__account__action">
            <Link to="/products/me?page=1">Manage products</Link>
          </div>
        </div>
      </div>
    </Account>
  );
};

export default MyAccount;
