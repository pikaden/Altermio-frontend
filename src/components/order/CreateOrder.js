import React, { useContext, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
  } from "mdb-react-ui-kit";
import { CartItemsContext } from "../../Context/CartItemsContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateOrder = () => {
    const [products, setProducts] = useState([]);
    const cartItems = useContext(CartItemsContext);
    let accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const handleShopping = () => {
        navigate('/')
    }

    const handlePayment = async () => {
        const items = products.map(product => product.id);
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                access_token: accessToken,
            },
          };
          const  res  = await axios.post(`http://localhost:3000/v1/order`, { items }, config);
          if (res.status === 200){
            navigate('/')
            alert("Create Order Successfully!!")
            cartItems.clearAll()
          }
    };
   
    useEffect(() => {
        setProducts(cartItems.items);
    }, [cartItems.items]);
   
    return (
        <>

         <section className="vh-40">
            <MDBContainer className="h-40">
                <MDBRow className="justify-content-center align-items-center h-40">
                    <MDBCol>
                        <p>
                            <span className="h2">Address</span>
                        </p>

                        <MDBCard className="mb-4">
                            <MDBCardBody className="p-4">
                               Tuan Anh
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
        <section className="vh-50">
            <MDBContainer className="h-50">
                <MDBRow className="justify-content-center align-items-center h-50">
                    <MDBCol>
                        <p>
                            <span className="h2">Shopping Cart</span>
                        </p>

                        <MDBCard className="mb-4">
                            <MDBCardBody className="p-4">
                                {products.map((product) => (
                                   <MDBRow className="align-items-center">
                                   <MDBCol md="2" className="d-flex justify-content-center">
                                       <MDBCardImage fluid src={product.image} alt="Product Image" />
                                   </MDBCol>
                               
                                   <MDBCol md="2" className="d-flex justify-content-center">
                                       <div>
                                           <p className="small text-muted mb-4 pb-2">Name</p>
                                           <p className="lead fw-normal mb-0">{product.name}</p>
                                       </div>
                                   </MDBCol>
                               
                                   <MDBCol md="6" className="d-flex justify-content-center">
                                       <div>
                                           <p className="small text-muted mb-4 pb-2">Category</p>
                                           <p className="lead fw-normal mb-0">{product.category}</p>
                                       </div>
                                   </MDBCol>
                               
                                   <MDBCol md="2" className="d-flex justify-content-center">
                                       <div>
                                           <p className="small text-muted mb-4 pb-2">Price</p>
                                           <p className="lead fw-normal mb-0">{product.price}</p>
                                       </div>
                                   </MDBCol>
                               </MDBRow>
                                ))}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-5">
                            <MDBCardBody className="p-4">
                                <div className="float-end">
                                    <p className="mb-0 me-5 d-flex align-items-center">
                                        <span className="small text-muted me-2">Order total:</span>
                                        <span className="lead fw-normal">{cartItems.totalAmount}</span>
                                    </p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <div className="d-flex justify-content-end">
                            <MDBBtn color="dark" size="lg" className="me-2" onClick={handleShopping}>
                                Continue shopping
                            </MDBBtn>
                            <Button variant="outlined" size="lg" onClick={handlePayment}>
                                Checkout
                            </Button>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
        </>
       
    );
};

export default CreateOrder;
