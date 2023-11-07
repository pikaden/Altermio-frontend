import React, { useState, useEffect } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ReactPaginate from "react-paginate";


function ManageReportedComment() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [reportedComments, setreportedComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reportedCommentsPerPage = 8;
  const pageCount = Math.ceil(reportedComments.length / reportedCommentsPerPage);



  let accessToken = localStorage.getItem("accessToken");

  const getReportedComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/comments/reportComments/all`, {
        headers: { "Authorization": `Bearer ${accessToken}` }
      });
      const reportedCommentsWithBuyerNames = await Promise.all(
        response.data.map(async (reportedComment) => {
          const buyerResponse = await axios.get(`http://localhost:3000/v1/users/${reportedComment.buyerId}`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          const buyerName = `${buyerResponse.data.firstName} ${buyerResponse.data.lastName}`;

          const sellerResponse = await axios.get(`http://localhost:3000/v1/users/${reportedComment.sellerId}`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          const sellerName = `${sellerResponse.data.firstName} ${sellerResponse.data.lastName}`;

          return { ...reportedComment, buyerName, sellerName };
        })
      );
      setreportedComments(reportedCommentsWithBuyerNames);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDenyReportedComment = async () => {
    console.log(selectedComment._id);
    await axios.put(`http://localhost:3000/v1/comments/reportComments/${selectedComment._id}/deny`, {
      type: "true"
    },
      { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((response) => {
        console.log(response);
        getReportedComments();
      })
      .catch((error) => {
        console.log(error);
      });

      setModalIsOpen(false);
  };


  const handleOpen = (reportedComment) => {
    setSelectedComment(reportedComment);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedComment(null);
    setModalIsOpen(false);
  };

  const offset = currentPage * reportedCommentsPerPage;
  const currentPagereportedComments = reportedComments.slice(offset, offset + reportedCommentsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };
  useEffect(() => {
    getReportedComments();
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
              <TableCell>Buyer Name</TableCell>
              <TableCell>Seller Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Report Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPagereportedComments.map((reportedComment) => (
              <TableRow key={reportedComment._id}>
                <TableCell>{reportedComment.buyerName}</TableCell>
                <TableCell>{reportedComment.sellerName}</TableCell>
                <TableCell>{reportedComment.rating}</TableCell>
                <TableCell>{reportedComment.content}</TableCell>
                <TableCell>{new Date(reportedComment.updatedAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
      })}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(reportedComment)}>
                    <KeyboardArrowRightIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
      previousLabel={<KeyboardArrowLeftIcon/>}
      nextLabel={<KeyboardArrowRightIcon/>}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}  // Added a container class
      subContainerClassName={"pagination li"}
      activeClassName={"active"}
      />

<Modal show={modalIsOpen} onHide={handleCloseModal}
  style={{
    marginTop: "50px",
  }}
>
        <Modal.Header closeButton>
          <Modal.Title>Update Reported Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComment ? ( // Check if a reported comment is selected
            <>
              <div className="form-group">
                <label htmlFor="name">Buyer Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={selectedComment.buyerName}
                  readOnly // Make it read-only, as you may not want to edit it
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Seller Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={selectedComment.sellerName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Rating</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  value={selectedComment.rating}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={selectedComment.content}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Report Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={new Date(selectedComment.updatedAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                  readOnly
                />
              </div>
              {/* Add more fields if needed */}
            </>
          ) : (
            <p>Please select a row to view details.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedComment && ( // Render buttons only when a reported comment is selected
            <>
              <Button variant="success" onClick={handleDenyReportedComment}>
                Deny
              </Button>
            </>
          )}
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}

export default ManageReportedComment;