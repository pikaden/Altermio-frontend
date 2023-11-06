import { useEffect, useState } from "react";
import Account from "../Account";
import "./ManageAccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const ManageAccount = () => {
  const navigate = useNavigate();
  const BASEURL = "http://localhost:3000/v1/";
  let accessToken = localStorage.getItem("accessToken");

  const [coin, setCoin] = useState({
    coin: "",
  });

  const [addCoin, setAddCoin] = useState({
    amount: "",
    // bankCode: "NCB",
  });

  const [res, setRes] = useState({
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const getUserInformation = async () => {
      const response = await axios.get(`${BASEURL}users/me/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          access_token: accessToken,
        },
      });
      setRes(response.data);
    };
    const getUserWallet = async () => {
      const response = await axios.get(`${BASEURL}wallets/payment`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          access_token: accessToken,
        },
      });
      setCoin(response.data);
    };
    getUserInformation();
    getUserWallet();
  }, [accessToken]);
  const handleAddCoin = async () => {
    await axios
      .post(
        `${BASEURL}wallets/payment`,
        {
          amount: addCoin.amount,
          bankCode: "NCB",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            access_token: accessToken,
          },
        }
      )
      .then((response) => {
        // open _blank payment link
        window.open(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = async () => {
    const phoneNumber = res.phoneNumber;
    if (!/^(0[0-9]{9,11})\b/.test(phoneNumber)) {
      alert("Phone Number is not Valid");
      return;
    }
    await axios
      .patch(
        `${BASEURL}users/me/profile`,
        {
          address: res.address,
          email: res.email,
          firstName: res.firstName,
          lastName: res.lastName,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            access_token: accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Account>
      <Box>
        <Box style={{ marginBottom: 20, fontSize: 30 }}>Edit account</Box>
        <Box>
          <FormControl className="form" style={{ width: 800 }}>
            <Box>
              <TextField
                id="standard-basic"
                label="First name"
                variant="outlined"
                type="text"
                style={{ width: "100%" }}
                InputLabelProps={{ shrink: true }}
                value={res.firstName}
                onChange={(e) => setRes({ ...res, firstName: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                label="Last name"
                variant="outlined"
                type="text"
                value={res.lastName}
                InputLabelProps={{ shrink: true }}
                style={{ width: "100%" }}
                onChange={(e) => setRes({ ...res, lastName: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                label="Address"
                variant="outlined"
                type="text"
                value={res.address}
                InputLabelProps={{ shrink: true }}
                style={{ width: "100%" }}
                onChange={(e) => setRes({ ...res, address: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                label="Email"
                variant="outlined"
                type="text"
                value={res.email}
                InputLabelProps={{ shrink: true }}
                style={{ width: "100%" }}
                onChange={(e) => setRes({ ...res, email: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                id="standard-basic"
                label="Phone Number"
                variant="outlined"
                type="text"
                value={res.phoneNumber}
                InputLabelProps={{ shrink: true }}
                style={{ width: "100%" }}
                onChange={(e) =>
                  setRes({ ...res, phoneNumber: e.target.value })
                }
              />
            </Box>
            <Button
              variant="outlined"
              style={{ width: "40%" }}
              onClick={handleUpdateUser}
            >
              Save Changes
            </Button>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="Wallet"
          variant="standard"
          type="text"
          disabled="disabled"
          value={coin.coin}
          InputLabelProps={{ shrink: true }}
          style={{ width: "100%" }}
        />
      </Box>
      <FormControl>
        <Box>
          <TextField
            id="standard-basic"
            label="Add Coin"
            variant="standard"
            type="text"
            InputLabelProps={{ shrink: true }}
            style={{ width: "100%", marginBottom: 10 }}
            onChange={(e) => setAddCoin({ amount: e.target.value })}
          />
        </Box>
        <Box>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Bank Code"
            value={"NCB"}
            onChange={(e) =>
              setAddCoin({
                bankCode: e.target.value,
              })
            }
          >
            <MenuItem value={"NCB"}>NCB</MenuItem>
            {/* <MenuItem value={"TPBANK"}>TPBANK</MenuItem>
            <MenuItem value={"VIETINBANK"}>VIETINBANK</MenuItem> */}
          </Select>
        </Box>
        <Box>
          <Button
            variant="outlined"
            style={{ width: "100%", marginTop: 10 }}
            onClick={handleAddCoin}
          >
            Add Coin
          </Button>
        </Box>
      </FormControl>
    </Account>
  );
};

export default ManageAccount;
