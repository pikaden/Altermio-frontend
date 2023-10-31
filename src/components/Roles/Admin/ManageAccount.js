import React, { useState, useEffect } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Pagination } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BuildIcon from '@mui/icons-material/Build';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./ManageAccount.css";
import "./PaginateStyle.css"

const ManageAccount = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const localHost = "localhost:3000/v1/users";
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin"
  });

  let accessToken = localStorage.getItem("accessToken");
  // Validation functions for each field
  const isNameValid = (name) => /^[A-Za-z\s]+$/.test(name);
  const isEmailValid = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
  const isPhoneNumberValid = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const isPasswordValid = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  // State to store field validation errors
  const [validationErrors, setValidationErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneNumberError: "",
    emailError: "",
    passwordError: ""
  });
  const [emailIsExist, setEmailIsExist] = useState("");

  const getUsers = async () => {
    await axios.get(`http://localhost:3000/v1/users?page=${page}&limit=8`, { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((response) => {
        console.log(response);
        setUsers(response.data.results);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleUpdateAccount = async () => {
    const isValid = validateFields(selectedUser);
    if (isValid) {
      await axios.patch(`http://localhost:3000/v1/users/${selectedUser.id}`,
      {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        phoneNumber: selectedUser.phoneNumber,
        email: selectedUser.email,
        role: selectedUser.role,
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
      setValidationErrors({});
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

    const handleCreateAccount = async () => {
      console.log(newUser);
    if(newUser.role === ""){
      newUser.role = "admin";
    }
    const isValid = validateFields(newUser);
    if (isValid) {
      await axios.post(`http://localhost:3000/v1/users`,
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      }
    , { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((response) => {
        console.log(response);
        getUsers();
        setCreateModalIsOpen(false);
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: ""
        });
        setValidationErrors({});
        setEmailIsExist("");
      })
      .catch((error) => {
        if(error.response.data.message === "Email already taken"){
          setEmailIsExist("Email already taken");
        }
        else{
          console.log(error);
        }
          
      });


      
    };
  };

      // Function to validate all fields
  const validateFields = (user) => {
    const errors = {};
    if (!isNameValid(user.firstName)) {
      errors.firstNameError = "First name should only contain letters and spaces.";
    }
    if (!isNameValid(user.lastName)) {
      errors.lastNameError = "Last name should only contain letters and spaces.";
    }
    if (!isEmailValid(user.email)) {
      errors.emailError = "Invalid email format.";
    }
    if(!createModalIsOpen){
      if (!isPhoneNumberValid(user.phoneNumber)) {
        errors.phoneNumberError = "Invalid phone number format. It should be 10 digits.";
      }
    }
    if(createModalIsOpen){
      if (!isPasswordValid(user.password)) {
        errors.passwordError = "Password should be at least 8 characters long and contain at least one letter and one number.";
      }
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


  const handlePageChange = (event, value) => {
      setPage(value); 
      console.log(page);    
  };

  useEffect(() => {
    getUsers();
  }, [page]);
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
              <TableCell>Role</TableCell>
              <TableCell>Email Verification</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow 
              hover
              key={user.id}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.email}</TableCell>
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
                    <BuildIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="success" onClick={() => {setCreateModalIsOpen(true)}}
        style={
          {
            position: "absolute",
            backgroundColor: "#4caf50",
            color: "white",
            marginTop: "10px",
          }
        }
      >
        Create a user
      </Button>
      <Pagination
        count={totalPages}
        page={page}
        size='large'
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        className="pagination"
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
            {validationErrors.firstNameError && (
              <div style={
                {color: "red"}
              }>{validationErrors.firstNameError}</div>
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
            {validationErrors.lastNameError && (
              <div style={
                {color: "red"}
              }>{validationErrors.lastNameError}</div>
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
            {validationErrors.phoneNumberError && (
              <div style={
                {color: "red"}
              }>{validationErrors.phoneNumberError}</div>
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
            {validationErrors.emailError && (
              <div style={
                {color: "red"}
              }>{validationErrors.emailError}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Role</label>
            <select 
              className="form-control"
              id="role"
              value={selectedUser?.role}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="courier">Courier</option>
            </select>
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
      <Modal show={createModalIsOpen} onHide={() => {setCreateModalIsOpen(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            {validationErrors.firstNameError && (
              <div style={
                {color: "red"}
              }>{validationErrors.firstNameError}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
            {validationErrors.lastNameError && (
              <div style={
                {color: "red"}
              }>{validationErrors.lastNameError}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {validationErrors.emailError && (
              <div style={
                {color: "red"}
              }>{validationErrors.emailError}</div>
            )}
            {emailIsExist && (
              <div style={
                {color: "red"}
              }>{emailIsExist}</div>
            )}
          </div>
      <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            {validationErrors.passwordError && (
              <div style={
                {color: "red"}
              }>{validationErrors.passwordError}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Role</label>
            <select 
              className="form-control"
              id="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="courier">Courier</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCreateAccount}
            style={
              {
                backgroundColor: "#4caf50",
                color: "white",
                marginRight: "10px",
              }
            }
          >
            Create
          </Button>
          <Button variant="danger" onClick={() => {setCreateModalIsOpen(false)}}
            style={
              {
                backgroundColor: "#f44336",
                color: "white",
              }
            }
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
};

export default ManageAccount;
