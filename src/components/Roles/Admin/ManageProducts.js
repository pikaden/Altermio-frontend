import React, { useState } from "react";
import { Box, Button, TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Pagination } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./ManageProduct.css";
import "./PaginateStyle.css"

function ManageProducts() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  // const pageCount = Math.ceil(products.length / productsPerPage);
  let accessToken = localStorage.getItem("accessToken");


  const getProducts = async () => {
    await axios.get(`http://localhost:3000/v1/products/manageProducts/all?activate=accept&page=${page}&limit=8`, { headers: { "Authorization": `Bearer ${accessToken}` } }).then((response) => {

      console.log(response);
      fetchCategory(response.data.results)
      setTotalPages(response.data.totalPages);
    })
      .catch((error) => {
        console.log(error);
      });
  };
    const fetchCategory = async (products) => {
      try {
        const updatedItems = await Promise.all(
          products.map(async (item) => {
                const res = await axios.get(`http://localhost:3000/v1/productLists/manage/${item.category}`);
                return { ...item, categoryName: res.data.results.categoryName };
            })
        );
        setProducts(updatedItems); 
    } catch (err) {
        console.log(err);
    }
  
    }

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

  //     setModalIsOpen(false);
  // };

  const handleDeleteProduct = async () => {
    await axios.delete(`http://localhost:3000/v1/products/${selectedproduct.id}`, { headers: { "Authorization": `Bearer ${accessToken}`, access_token: accessToken } })
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



  // const offset = currentPage * productsPerPage;
  // const currentPageProducts = products.slice(offset, offset + productsPerPage);

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
              <TableRow key={product.id}
                hover
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
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
                  {product.verify === 'pending' ?
                    <div className={`verification-badge pending`}>
                      Pending
                    </div>
                    :
                    product.verify === 'accept' ?
                      <div className={`verification-badge verified`}>
                        Verified
                      </div>
                      :
                      <div className={`verification-badge not-verified`}>
                        Not Verified
                      </div>
                  }

                  {/* <div
                    className={`verification-badge ${product.verify === 'deny' ? "not-verified" : "verified"}`}
                  >
                    {product.verify === 'deny' ? "Not Verified" : "Verified"}
                  </div> */}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(product)}>
                    <DeleteIcon />
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
              value={selectedproduct?.categoryName}
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
          <Button variant="success" onClick={handleDeleteProduct}>
            Delete
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