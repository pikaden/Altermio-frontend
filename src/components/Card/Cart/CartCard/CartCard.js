import { useContext, useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './CartCard.css';
import { CartItemsContext } from '../../../../Context/CartItemsContext';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { defaultImage } from '../../../../Context/DefaultImage';

const CartCard = (props) => {
    let cartItems = useContext(CartItemsContext)
    const [imageUrl, setImageUrl] = useState();
    const [categoryName, setCategoryName] = useState();

    const defaultImageUrl = defaultImage;

    const handelRemoveItem = () => {
        cartItems.removeItem(props.item)
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

    const fetchCategory = async () => {
        // get category by id and return name
        await axios.get(`http://localhost:3000/v1/productLists/manage/${props.item.category}`)
            .then(res => {
                const category = res.data;
                console.log('aasdadsa: ' + JSON.stringify(category));
                setCategoryName(category.results.categoryName);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchImage();
        fetchCategory();
    }, [imageUrl, categoryName])

    return (
        <div className='cart__item__card'>
            <div className="cart__item__detail">
                <div className="cart__item__image">
                    <img src={imageUrl} alt="item" className="item__image" />
                </div>
                <div className="cart__item__name">{props.item.name}</div>
            </div>
            <div className="cart__item__price">{categoryName}</div>
            <div className="cart__item__price">${props.item.price}</div>
            <div className="remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem} />
                </IconButton>
            </div>
        </div>
    );
}

export default CartCard;