import React, { useState, useEffect } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./ManageAccount.css";
import "./PaginateStyle.css"

const ManageAccount = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const localHost = "localhost:3000/v1/users";
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;
  const pageCount = Math.ceil(users.length / usersPerPage);
  let accessToken = localStorage.getItem("accessToken");
  // Validation functions for each field
  const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
  const isEmailValid = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  const isPhoneNumberValid = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  // State to store field validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const getUsers = async () => {
    await axios.get(`http://localhost:3000/v1/users`, { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((response) => {
        console.log(response);
        setUsers(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleUpdateAccount = async () => {
    const isValid = validateFields();
    if (isValid) {
      await axios.patch(`http://localhost:3000/v1/users/${selectedUser.id}`,
      {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        phoneNumber: selectedUser.phoneNumber,
        email: selectedUser.email
      }
    , { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((response) => {
        console.log(response);
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });

      setModalIsOpen(false);
    }
  };

    const handleDeleteAccount = async () => {
    await axios.delete(`http://localhost:3000/v1/users/${selectedUser.id}`, { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((response) => {
        console.log(response);
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });

      setModalIsOpen(false);
    };
      // Function to validate all fields
  const validateFields = () => {
    const errors = {};
    if (!isNameValid(selectedUser.firstName)) {
      errors.firstName = "First name should only contain letters and spaces.";
    }
    if (!isNameValid(selectedUser.lastName)) {
      errors.lastName = "Last name should only contain letters and spaces.";
    }
    if (!isEmailValid(selectedUser.email)) {
      errors.email = "Invalid email format.";
    }
    if (!isPhoneNumberValid(selectedUser.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format. It should be 10 digits.";
    }
    setValidationErrors(errors);
    console.log(validationErrors);

    // Return true if no errors, false if there are validation errors
    return Object.keys(errors).length === 0;
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

  const offset = currentPage * usersPerPage;
  const currentPageUsers = users.slice(offset, offset + usersPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getUsers();
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
        }
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Email Verification</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageUsers.map((user) => (
              <TableRow 
              hover
              key={user.id}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.email}</TableCell>
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
      <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}  // Added a container class
      subContainerClassName={"pagination li"}
      activeClassName={"active"}
      />

      <Modal show={modalIsOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Flash Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={selectedUser?.firstName}
              onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
            />
            {validationErrors.firstName && (
              <div style={
                {color: "red"}
              }>{validationErrors.firstName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={selectedUser?.lastName}
              onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
            />
            {validationErrors.lastName && (
              <div style={
                {color: "red"}
              }>{validationErrors.lastName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={selectedUser?.phoneNumber}
              onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
            />
            {validationErrors.phoneNumber && (
              <div style={
                {color: "red"}
              }>{validationErrors.phoneNumber}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={selectedUser?.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            />
            {validationErrors.email && (
              <div style={
                {color: "red"}
              }>{validationErrors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Email Verification</label>
            <select 
              className="form-control"
              id="verified"
              value={selectedUser?.verified}
              onChange={(e) => setSelectedUser({ ...selectedUser, verified: e.target.value })}
            >
              <option value="true">Verified</option>
              <option value="false">Not verified</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleUpdateAccount}>
            Update
          </Button>
          <Button variant="success" onClick={handleDeleteAccount}>
            Delete
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
