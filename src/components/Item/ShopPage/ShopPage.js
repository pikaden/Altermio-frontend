import { useState, useEffect } from 'react';
import './ShopPage.css';
import axios from 'axios';
import { defaultImage } from '../../../Context/DefaultImage';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';

const ShopPage = (props) => {
    const [imageUrl, setImageUrl] = useState();
    const defaultImageUrl = defaultImage;

    const fetchImage = async () => {
        // get image by id and return url
        await axios.get(`http://localhost:3000/v1/images/${props.item.sellerId.avatar}`)
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
    }, [imageUrl])

    return (
        <div className="product__description__product">
            <div className="description__header__container">
                <div className="description__header__line"></div>
                <div className="description__header">Shop</div>
            </div>
            <div className="description__detail__container">
                <div className="description__detail">
                    {/* <p>{props.item.description}</p> */}
                </div>
            </div>
            <div className="description__specifics__container">
                <div className="description__specifics">
                    <div className="left-section">
                        <Avatar
                            src={imageUrl}
                            style={{
                                height: '5rem',
                                width: '5rem'
                            }}
                            alt="item"
                            className="item__image"
                        />
                    </div>
                    <div className="right-section">
                        <div className="name">
                            {`${props.item.sellerId.firstName} ${props.item.sellerId.lastName}`}
                        </div>
                        {/* TODO: chat with shop owner */}
                        <div className='button-container'>
                            <Button
                                color='success'
                                variant='outlined'
                                component={Link}
                                to={`/account/${props.item.sellerId.id}`}
                            >
                                Shop profile
                            </Button>
                            <Button
                                color='warning'
                                variant='outlined'
                                component={Link}
                                to="/chats"
                            >
                                Chat with shop
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopPage;