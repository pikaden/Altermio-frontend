import { useContext } from 'react';
import './Detail.css';
import { Button, IconButton } from '@mui/material';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import FlagIcon from '@mui/icons-material/Flag';
import axios from 'axios';

const Detail = (props) => {
    const cartItems = useContext(CartItemsContext)
    let accessToken = localStorage.getItem("accessToken");

    const handelAddToCart = () => {
        cartItems.addItem(props.item)
    }

    const handleReportProduct = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                access_token: accessToken
            },
        };

        await axios.patch(
            `http://localhost:3000/v1/products/reportProducts/${props.item.id}`,
            {},
            config
        )
            .then(res => {
                const result = res.data;
                console.log(result);
                alert('Report product success!')
            })
            .catch(err => {
                alert('Product has been reported!');
                console.log(err)
            })
    }
    return (
        <div className="product__detail__container">
            <div className="product__detail">
                <div className="product__main__detail">
                    <div className="product__name__main">
                        {props.item.name}
                        <IconButton
                            onClick={handleReportProduct}
                        >
                            <FlagIcon fontSize='big' />
                        </IconButton>
                    </div>
                    <div className="product__color">
                        {/* <div className="product-color-label">COLOR</div>
                        <div className="product-color" style={{ backgroundColor: `${props.item.color}` }}></div> */}
                    </div>
                    <div className="product__price__detail">${props.item.price}</div>

                    <div className="product__name__main">Description</div>
                    <div className="product__detail__description">{props.item.description}</div>
                </div>
                <form onSubmit={handelAddToCart} className="product__form">

                    <div className="collect__item__actions">
                        <div className="add__cart__add__wish">
                            <div className="add__cart">
                                <Button variant="outlined" size="large" sx={[{ '&:hover': { backgroundColor: '#FFE26E', borderColor: '#FFE26E', borderWidth: '3px', color: 'black' }, minWidth: 200, borderColor: 'black', backgroundColor: "black", color: "#FFE26E", borderWidth: '3px' }]} onClick={handelAddToCart}>ADD TO CART</Button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Detail;