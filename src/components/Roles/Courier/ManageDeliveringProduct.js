import React, { useState, useEffect } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";

import "../Admin/ManageProduct.css";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ManageDeliveringProduct() {
  let accessToken = localStorage.getItem("accessToken");
  const [ orders, setOrders] = useState([])
  const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        access_token: accessToken,
      },
    };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/order/deliveringOrder`,
        config
      );
      const data = response.data;
      setOrders(data)
    } catch (error) {
      console.error(error);
    }
  };
  const handleAccept = async (order) => {
    const response = await axios.post('http://localhost:3000/v1/order/courierDelivered', {
            orderId: order._id
        }, config)
        if (response.status === 200){
            const updatedOrders = orders.filter(obj => obj._id !== order._id);
            setOrders(updatedOrders)
            alert('Accept Successfully')
        }
  }
  useEffect(() => {
    fetchOrders()
  }, []);
  


  return (
    <Box height={100}>
    <TableContainer
      sx={
        {
          borderRadius: 2,
          boxShadow: 2,
          overflow: "hidden"
        }
      }>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}
              hover
            >
              <TableCell>{order.item.name}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                  <Button onClick={() => handleAccept(order)}>
                    <CheckCircleIcon />
                  </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  );
}

export default ManageDeliveringProduct;