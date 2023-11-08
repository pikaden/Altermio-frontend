import { CloseIcon } from "@chakra-ui/icons";
import "./PostProduct.css";
import { Box, Button, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { FloatingLabel, Form } from 'react-bootstrap';

const PostProduct = () => {

  const [validated, setValidated] = useState(false);
  const [productLists, setProductLists] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const formDataRef = useRef(new FormData());

  let accessToken = localStorage.getItem("accessToken");

  const fetchProductList = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/v1/productLists`
    );

    setProductLists(data);
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

    await axios.post(`http://localhost:3000/v1/products`, data, config)
      .then((response) => {
        if (response.status === 201) {
          window.alert('Add product success!')
        } else {
          console.log('aa: ' + response.status);
          window.alert('Add product failed!')
        }
      })
      .catch((error) => {
        console.log('kkk: ' + error);
        window.alert('Add product failed!')
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

  useEffect(() => {
    fetchProductList();
  }, [])

  return (
    <Box className="section">
      <Box className="container">
        <Box className="row">
          <Box className="col-md-12">
            <Box className="section-title">
              <h2 className="title"><br /> Add Product</h2>
              <hr />

              <Form id="contact-form" noValidate validated={validated} onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="form-group">
                  <Form.Group className="row">
                    <Form.Group className="col-md-6">
                      <Form.Label>Product name</Form.Label>
                      <Form.Control required name='name' type="text" placeholder="Enter your product name" defaultValue='Iphone 11' />
                      <Form.Text className="text-muted">
                        Product name should be easy to remember
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Please enter product name.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="col-md-6">
                      <Form.Label>Price</Form.Label>
                      <Form.Control required name='price' type="number" placeholder="Price" defaultValue='30000' />
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
                        <option key={productList.id} value={productList.id}>{productList.categoryName}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>State</Form.Label>
                  <Form.Control required name='state' type="text" placeholder="Enter your product state" defaultValue='like new 99%' />
                  <Form.Control.Feedback type="invalid">
                    Please enter product state.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control required name='brand' type="text" placeholder="Enter your product brand" defaultValue='Apple' />
                  <Form.Control.Feedback type="invalid">
                    Please enter product brand.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Description</Form.Label>
                  <Form.Control required name='description' as='textarea' rows={5} placeholder="Enter your product description" defaultValue='good phone on the way' />
                  <Form.Text className="text-muted">
                    Description should not be over 3000 text
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter product description.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Add product images</Form.Label>
                    <Form.Control name="images" type="file" multiple onChange={handleImageChange} />
                  </Form.Group>
                </Form.Group>

                <div className="result">{renderPhotos(selectedFiles, images)}</div>

                <Button variant="outlined" type="submit" style={{ marginBottom: 20 }}>Add product</Button>
              </Form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostProduct;
