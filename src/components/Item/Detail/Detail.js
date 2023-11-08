import { useContext } from 'react';
import './Detail.css';
import { Button } from '@mui/material';
import { CartItemsContext } from '../../../Context/CartItemsContext';

const Detail = (props) => {
    const cartItems = useContext(CartItemsContext)

    const handelAddToCart = () => {
        cartItems.addItem(props.item)
    }

    return (
        <div className="product__detail__container">
            <div className="product__detail">
                <div className="product__main__detail">
                    <div className="product__name__main">{props.item.name}</div>
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