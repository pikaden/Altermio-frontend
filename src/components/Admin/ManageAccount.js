import React, { useState } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Modal from "react-bootstrap/Modal";
import "./ManageAccount.css";


const ManageAccount = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const users = [
    {
      id: 1,
      name: "John Doe",
      phone: "555-555-5555",
      role: "Admin",
      verified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "555-555-5555",
      role: "User",
      verified: false,
    },
    {
      id: 3,
      name: "Bob Johnson",
      phone: "555-555-5555",
      role: "Shopper",
      verified: true,
    },
    {
      id: 4,
      name: "Alice Williams",
      phone: "555-555-5555",
      role: "User",
      verified: false,
    },
  ];

  return (
    <Box height={100}>
      <h1>Manage Account</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
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
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
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
                            <label className="col-md-4" htmlFor="frontHTML">
                                User ID
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="frontHTML"
                                value={selectedUser?.id}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Customer Name
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedUser?.name}
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
                                value={selectedUser?.phone}
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
                                value={selectedUser?.verified ? "Verified" : "Not Verified"}
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
