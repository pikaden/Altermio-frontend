import axios from "axios";
import { useEffect, useState } from "react";
import { defaultImage } from '../../Context/DefaultImage';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
  } from "mdb-react-ui-kit";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const OrderList = () => {
    let accessToken = localStorage.getItem("accessToken");
    const [ orders, setOrders] = useState([])
    const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          access_token: accessToken,
        },
      };
    const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/v1/order/forSeller`,
            config
          );
          const data = response.data;
          await fetchImage(data);
        } catch (error) {
          console.error(error);
        }
      };

      const acceptOrder = async  (order) => {
        if (order.status == 'Refund'){
          const response = await axios.post('http://localhost:3000/v1/order/acceptRefund', {
            orderId: order._id
        }, config)
        if (response.status === 200){
            const updatedOrders = orders.filter(obj => obj._id !== order._id);
            setOrders(updatedOrders)
            alert('Accept Successfully')

        }}
        else {
          const response = await axios.post('http://localhost:3000/v1/order/acceptOrder', {
            orderId: order._id
        }, config)
        if (response.status === 200){
            const updatedOrders = orders.filter(obj => obj._id !== order._id);
            setOrders(updatedOrders)
            alert('Accept Successfully')
        }
        }
        
      }
      const cancelOrder = async (order) => {
        if (order.status == 'Refund'){
          const response = await axios.post('http://localhost:3000/v1/order/denyRefund', {
          orderId: order._id
      }, config)
      if (response.status === 200){
          const updatedOrders = orders.filter(obj => obj._id !== order._id);
          setOrders(updatedOrders)
          alert('Cancel Successfully')
      }
        } else{
          const response = await axios.post('http://localhost:3000/v1/order/cancelOrder', {
          orderId: order._id
      }, config)
      if (response.status === 200){
          const updatedOrders = orders.filter(obj => obj._id !== order._id);
          setOrders(updatedOrders)
          alert('Cancel Successfully')
        }
        
      }
      }
      const formatDateTime = (inputDate) => {
        const date = new Date(inputDate);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
        return `${formattedDate} ${formattedTime}`;
      };

      const fetchImage = async (orders) => {
        try {
          const updatedItems = await Promise.all(
            orders.map(async (order) => {
              const res = await axios.get(
                `http://localhost:3000/v1/images/${order.item.images[0]}`
              );
              const imageRes = res.data ? res.data.image.url : defaultImage;
              return { ...order, imageRes: imageRes };
            })
          );
          setOrders(updatedItems);
        } catch (err) {
          console.log(err);
        }
      };
    useEffect(() => {
        fetchOrders()
      }, []);
    return (
        <>
       <section className="vh-50">
           <MDBContainer className="h-50">
               <MDBRow className="justify-content-center align-items-center h-50">
                   <MDBCol>
                       <p>
                           <span className="h2">Your Order List</span>
                       </p>

                       <MDBCard className="mb-4">
                           <MDBCardBody className="p-4">
                               {orders.map((order) => (
                                  <MDBRow className="align-items-center">
                                  <MDBCol md="2" className="d-flex justify-content-left">
                                      <MDBCardImage fluid src={order.imageRes} alt="Product Image" style={{objectFit: "cover", height: "80px"}} />
                                  </MDBCol>
                              
                                  <MDBCol md="2" className="d-flex justify-content-left">
                                      
                                      <div>
                                      <p className="small text-muted mb-4 pb-2">Name</p>
                                          <p className="lead fw-normal mb-0">{order.item.name}</p>
                                      </div>
                                  </MDBCol>
                              
                                  <MDBCol md="2" className="d-flex justify-content-left">
                                      <div>
                                      <p className="small text-muted mb-4 pb-2">Total Price</p>
                                          <p className="lead fw-normal mb-0">{order.totalPrice}</p>
                                      </div>
                                  </MDBCol>

                                  <MDBCol md="2" className="d-flex justify-content-left">
                                      <div><p className="small text-muted mb-4 pb-2">Order Date</p>
                                          <p className="lead fw-normal mb-0">{formatDateTime(order.orderDate)}</p>
                                      </div>
                                  </MDBCol>

                                  <MDBCol md="2" className="d-flex justify-content-left">
                                      <div>
                                      <p className="small text-muted mb-4 pb-2">Status</p>
                                          <p className="lead fw-normal mb-0">{order.status}</p>
                                      </div>
                                  </MDBCol>                                 
                                  <MDBCol md="2" className="d-flex justify-content-left">
                                    <div className="d-flex justify-content-end">
                                        <CheckCircleIcon style={{ fontSize: 40, color: 'green', marginLeft: '20px' }} onClick={() => acceptOrder(order)} /> 
                                        <CancelIcon style={{ fontSize: 40, color: 'red', marginLeft: '10px' }}  onClick={() => cancelOrder(order)} /> 
                                    </div>
                                  </MDBCol>                                 
                              </MDBRow>                             
                               ))}
                           </MDBCardBody>
                       </MDBCard>
                   </MDBCol>
               </MDBRow>
           </MDBContainer>
       </section>
       </>
    )
};

export default OrderList;
