import { CloseIcon } from "@chakra-ui/icons";
import "./ManageMyProducts.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import { async } from "q";

const ManageMyProducts = () => {

  const param = useParams();
  const [validated, setValidated] = useState(false);
  const [productLists, setProductLists] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [item, setItem] = useState();
  const [myProductImage, setMyProductImage] = useState();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(!openDeleteDialog);

  let accessToken = localStorage.getItem("accessToken");

  const fetchProductList = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/v1/productLists`
    );

    setProductLists(data);
  }

  const fetchProductById = async () => {
    const response = await axios.get(
      `http://localhost:3000/v1/products/${param.productId}`
    );

    setItem(response.data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        access_token: accessToken,
        "Content-Type": "multipart/form-data"
      },
    };

    const data = new FormData(event.currentTarget);

    data.set("name", data.get('name'));
    data.set("price", data.get('price'));
    data.set("productListId", data.get('productListId'));
    data.set("description", data.get('description'));
    data.set("state", data.get('state'));
    data.set("brand", data.get('brand'));

    console.log('form data: ' + selectedFiles);

    if (selectedFiles.length !== 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append("images[]", selectedFiles[i].file.file);
      }
    }

    console.log(data.getAll('images'));

    await axios.put(`http://localhost:3000/v1/products/${param.productId}`, data, config)
      .then((response) => {
        window.alert('Update product success!')
      })
      .catch((error) => {
        console.log('kkk: ' + error);
        window.alert('Update product failed!')
      });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substring(7), // Generate a unique ID
      }));
      const urlsArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      setImages((prevImages) => prevImages.concat(urlsArray));
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const handleRemove = (imageId) => {
    const newImages = images.filter((_, index) => index !== imageId)
    const newSelectedFiles = selectedFiles.filter(fileObj => fileObj.id !== imageId);

    setImages(newImages)
    setSelectedFiles(newSelectedFiles)
  }

  const renderPhotos = (files, images) => {
    return files.map((fileObj, index) => {
      return (
        <div key={fileObj.id} style={{ position: "relative", display: "inline-block" }}>
          <img src={images[index]} alt="" />
          <IconButton aria-label="delete"
            onClick={() => handleRemove(fileObj.id)}
            style={{
              position: "absolute",
              top: '1rem',
              right: '1rem',
            }}
          >
            <CloseIcon style={{
              color: 'white'
            }} />
          </IconButton>
        </div>
      );
    });
  };

  const handleDeleteProduct = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        access_token: accessToken,
      },
    }

    await axios.delete(
      `http://localhost:3000/v1/products/${param.productId}`,
      config
    ).then(res => {
      console.log('Delete success!');
      alert('Delete product success!');
      navigate('/products/me?page=1');
    }).catch(err => {
      console.log('err');
    });
  }

  const handleVerifyProduct = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        access_token: accessToken,
      },
    }

    await axios.patch(
      `http://localhost:3000/v1/products/requestVerifyProduct/${param.productId}`,
      {},
      config
    ).then(res => {
      console.log('Request product verify success!');
      alert('Request product verify success!');
    }).catch(err => {
      alert('Request verify product has been sended!');
      console.log(err);
    });
  }

  useEffect(() => {
    fetchProductList();
    fetchProductById();
  }, [])

  return (
    !item || !productLists ?
      <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />
      :
      <Box className="section">
        <Box className="container">
          <Box className="row">
            <Box className="col-md-12">
              <Box className="section-title">
                <h2 className="title"><br /> Manage Product</h2>
                <hr />

                <Form id="contact-form" noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group className="form-group">
                    <Form.Group className="row">
                      <Form.Group className="col-md-6">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control required name='name' type="text" placeholder="Enter your product name" defaultValue={item.name} />
                        <Form.Text className="text-muted">
                          Product name should be easy to remember
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                          Please enter product name.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="col-md-6">
                        <Form.Label>Price</Form.Label>
                        <Form.Control required name='price' type="number" placeholder="Price" defaultValue={item.price} />
                        <Form.Control.Feedback type="invalid">
                          Please enter product price.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Group>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <FloatingLabel controlId="floatingSelect" label="Select category">
                      <Form.Select required name="productListId" aria-label="Floating label select example">
                        {productLists.map(productList => (
                          <option key={productList.id} value={productList.id} selected={productList.categoryName}>{productList.categoryName}</option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>State</Form.Label>
                    <Form.Control required name='state' type="text" placeholder="Enter your product state" defaultValue={item.state} />
                    <Form.Control.Feedback type="invalid">
                      Please enter product state.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control required name='brand' type="text" placeholder="Enter your product brand" defaultValue={item.brand} />
                    <Form.Control.Feedback type="invalid">
                      Please enter product brand.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required name='description' as='textarea' rows={5} placeholder="Enter your product description" defaultValue={item.description} />
                    <Form.Text className="text-muted">
                      Description should not be over 3000 text
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Please enter product description.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                      <Form.Label>My product images</Form.Label>
                      <Form.Control name="images" type="file" multiple onChange={handleImageChange} />
                    </Form.Group>
                  </Form.Group>

                  <div className="result">{renderPhotos(selectedFiles, images)}</div>

                  <Button variant="outlined" type="submit" style={{ marginBottom: 20 }}>Update product</Button>

                  <Button
                    color="success"
                    variant="outlined"
                    type='button'
                    style={{ marginLeft: 20, marginBottom: 20 }}
                    onClick={handleVerifyProduct}
                  >
                    Verify product?
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    style={{ marginLeft: 20, marginBottom: 20 }}
                    onClick={handleOpenDeleteDialog}
                  >
                    Delete product
                  </Button>

                  <Dialog
                    open={openDeleteDialog}
                    onClose={handleOpenDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {`Do you want to delete ${item.name}?`}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Please think about it twice before you do, as you cannot undone what you did
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleOpenDeleteDialog}>Let me think again</Button>
                      <Button onClick={handleDeleteProduct} autoFocus>
                        I Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  );
};

export default ManageMyProducts;
