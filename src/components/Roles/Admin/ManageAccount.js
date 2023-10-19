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

  const offset = currentPage * usersPerPage;
  const currentPageUsers = users.slice(offset, offset + usersPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

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
            {currentPageUsers.map((user) => (
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
          {/* Your modal content */}
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
