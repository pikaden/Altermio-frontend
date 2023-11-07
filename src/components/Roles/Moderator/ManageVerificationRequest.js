import React, { useState } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Pagination } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from '@mui/icons-material/Delete';
import VerifiedIcon from '@mui/icons-material/Verified';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./ManageVerificationRequest.css";

function ManageVerificationRequest() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  let accessToken = localStorage.getItem("accessToken");


  const getProducts = async () => {
   await axios.get(`http://localhost:3000/v1/products/manageProducts/all?verify=deny&page=${page}&limit=8 `, {headers: {"Authorization" : `Bearer ${accessToken}`} }).then((response) => {
      
      console.log(response);
      setProducts(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
  };


  // const handleUpdateProduct = async () => {
  //   console.log(accessToken);
  //   await axios.put(`http://localhost:3000/v1/products/${selectedproduct.id}`,
  //     {
  //       name: selectedproduct.name,
  //       category: selectedproduct.category,
  //       price: selectedproduct.price,
  //       description: selectedproduct.description,
  //       state: selectedproduct.state,
  //       brand: selectedproduct.brand
  //     }
  //   , { headers: { "Authorization": `Bearer ${accessToken}` ,access_token : accessToken}})
  //     .then((response) => {
  //       console.log(response);
  //       getProducts();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //     setModalIsOpen(false);handleVerifyProduct
  // };

  const handleVerifyProduct = async () => {
    await axios.put(`http://localhost:3000/v1/products/manageVerifyProducts/${selectedproduct.id}/accept`,{
      type: "accept"
    },{ headers: { "Authorization": `Bearer ${accessToken}`} })
      .then((response) => {
        console.log(response);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });

      setModalIsOpen(false);
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




  const handlePageChange = (event, value) => {
    setPage(value); 
    console.log(page);    
};

  useEffect(() => {
    getProducts();
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
      }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Activation</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.state}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                <div
                    className={`verification-badge ${product.activate === 'pending' ? "inactive" : "active"}`}
                  >
                    {product.activate === 'pending' ? "Inactive" : "Active"}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`verification-badge ${product.verify === 'accept' ? "verified" : "not-verified"}`}
                  >
                    {product.verify === 'accept' ? "Verified" : "Not Verified"}
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(product)}>
                    <VerifiedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page}
        size='large'
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        className="pagination"
        />
      <Modal show={modalIsOpen} onHide={handleCloseModal}
        style={{
          marginTop: "50px",
        }}
      >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Product</Modal.Title>
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
                                Price
                            </label>
                            <input
                                className="col-md-8 textArea"
                                type="text"
                                id="backHTML"
                                value={selectedproduct?.price}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, price: e.target.value });
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
                                defaultValue={selectedproduct?.verify ? "Verified" : "Not-verified"}
                                onChange={(e) => {
                                    setSelectedproduct({ ...selectedproduct, verify: e.target.value });
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
                        <Button variant="success" onClick={handleVerifyProduct}>
                            Verify
                        </Button>
                        <Button variant="danger" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
    </Box>
  );
}

export default ManageVerificationRequest;