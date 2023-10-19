import React, { useState } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./PaginateStyle.css"

function ManageProducts() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  const pageCount = Math.ceil(products.length / productsPerPage);
  let accessToken = localStorage.getItem("accessToken");


  const getproducts = async () => {
   await axios.get('http://localhost:3000/v1/products', {headers: {"Authorization" : `Bearer ${accessToken}`} }).then((response) => {
      
      console.log(response);
      setProducts(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const isModalOpen = () => {
    setModalIsOpen(false);
  };

  const handleOpen = (product) => {
    setSelectedproduct(product);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedproduct(null);
    setModalIsOpen(false);
  };

  const handleUpdateAccount = () => {
    console.log("Update Account");
  };

  const offset = currentPage * productsPerPage;
  const currentPageProducts = products.slice(offset, offset + productsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <Box height={100}>
      <h1>Manage Account</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Activation</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.state}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                <div
                    className={`verification-badge ${product.activate ? "Approved" : "Deny"}`}
                  >
                    {product.activate ? "Approved" : "Deny"}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`verification-badge ${product.verify ? "verified" : "Not-verified"}`}
                  >
                    {product.verify ? "Verified" : "Not Verified"}
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(product)}>
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
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Product Name
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedproduct?.name}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, name: e.target.value });
                                }}
                                
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Category
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedproduct?.category}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, category: e.target.value });
                                }}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Description
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedproduct?.description}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, description: e.target.value });
                                }}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Verification
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                defaultValue={selectedproduct?.state ? "Verified" : "Not-verified"}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, state: e.target.value });
                                }}
                            />
                        </div>
                        <div className="row" style={{ marginBottom: '1rem' }}>
                            <label className="col-md-4" htmlFor="backHTML">
                                Brand
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedproduct?.brand}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, brand: e.target.value });
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
}

export default ManageProducts;