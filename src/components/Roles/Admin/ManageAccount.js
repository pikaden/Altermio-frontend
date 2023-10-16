import React, { useState } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Modal from "react-bootstrap/Modal";
import "./ManageAccount.css";
import axios from "axios";
import { useEffect } from "react";


const ManageAccount = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const localHost = "localhost:3000/v1/users";
  const [users, setUsers] = useState([]);
  let accessToken = localStorage.getItem("accessToken");


  const getUsers = async () => {
   await axios.get('http://localhost:3000/v1/users', {headers: {"Authorization" : `Bearer ${accessToken}`} }).then((response) => {
      
      console.log(response);
      setUsers(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const isModalOpen = () => {
    setModalIsOpen(false);
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  const handleUpdateAccount = () => {
    console.log("Update Account");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box height={100}>
      <h1>Manage Account</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email Verification</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div
                    className={`verification-badge ${user.verified ? "verified" : "not-verified"}`}
                  >
                    {user.verified ? "Verified" : "Not Verified"}
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user)}>
                    <KeyboardArrowRightIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal show={modalIsOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Flash Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Customer Name
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedUser?.firstName}
                                onChange={(e) => {
                                    setSelectedUser({ ...selectedUser, firstName: e.target.value });
                                }}
                                
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Phone Number
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedUser?.phoneNumber}
                                onChange={(e) => {
                                    setSelectedUser({ ...selectedUser, phoneNumber: e.target.value });
                                }}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Role
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedUser?.role}
                                onChange={(e) => {
                                    setSelectedUser({ ...selectedUser, role: e.target.value });
                                }}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Email Verification
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                defaultValue={selectedUser?.verified ? "Verified" : "Not Verified"}
                                onChange={(e) => {
                                    setSelectedUser({ ...selectedUser, verified: e.target.value });
                                }}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleUpdateAccount}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
    </Box>
  );
};

export default ManageAccount;
