import { useState, useEffect } from 'react';
import './RelatedCard.css'
import axios from 'axios';
import RelatedCardDetail from './Detail/RelatedCardDetail';
import ReactLoading from 'react-loading';
import RelatedCardImage from './Image/RelatedCardImage';

const RelatedCard = (props) => {

    const [item, setItem] = useState()
    
    // TODO: change default image url
    const defaultImageUrl = 'https://bocdn.ecotree.green/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg?d=960x540';

    
    useEffect(() => {
        const fetchProduct = async () => {
            // get product by id
            await axios.get(`http://localhost:3000/v1/products/${props.item}`)
                .then(res => {
                    const product = res.data;
                    setItem(product);
                })
                .catch(err => console.log(err))
        }
        fetchProduct();
    }, [props.item])

    return (
        !item ?
            <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />
            :
            item.images.length === 0 ?
                (
                    <div className="related__product__card__container">
                        <div className="related__product__card__inner">
                            <div className="related__product__image">
                                <img className="carousel__image" key={props.image} src={defaultImageUrl} alt="item" />
                            </div>
                            <RelatedCardDetail item={item} />
                        </div>
                    </div>
                ) :
                (
                    <div className="related__product__card__container">
                        <div className="related__product__card__inner">
                            <RelatedCardImage image={item.images[0]} />
                            <RelatedCardDetail item={item} />
                        </div>
                    </div>
                )
    );
}

export default RelatedCard;