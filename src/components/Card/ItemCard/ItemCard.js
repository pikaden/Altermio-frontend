import './ItemCard.css';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect } from 'react';
import axios from 'axios';
import { defaultImage } from '../../../Context/DefaultImage';

const ItemCard = (props) => {
    const cartItemsContext = useContext(CartItemsContext)
    const [imageUrl, setImageUrl] = useState();

    const defaultImageUrl = defaultImage;

    const handleAddToCart = () => {
        cartItemsContext.addItem(props.item, 1)
    }

    const fetchImage = async () => {
        // get image by id and return url
        await axios.get(`http://localhost:3000/v1/images/${props.item.images[0]}`)
            .then(res => {
                const imageRes = res.data ?
                    res.data.image.url :
                    defaultImageUrl;
                setImageUrl(imageRes);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchImage();
    }, [])

    return (
        <div className="product__card__card">
            <div className="product__card">
                <div className="product__image">
                    <img src={imageUrl} alt="item" className="product__img" />
                </div>
                <div className="product__card__detail">
                    <div className="product__name">
                        <Link to={`/item/${props.item.id}`}>
                            {props.item.name}
                        </Link>
                    </div>
                    <div className="product__description">
                        {/* <span>{props.item.description}</span> */}
                    </div>
                    <div className="product__price">
                        <span>${props.item.price}</span>
                    </div>
                    <div className="product__card__action">
                        <IconButton onClick={handleAddToCart} sx={{ borderRadius: '20px', width: '40px', height: '40px' /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */ }}>
                            <AddShoppingCartIcon sx={{ width: '22px', height: '22px', color: 'black' }} />
                        </IconButton >
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ItemCard;