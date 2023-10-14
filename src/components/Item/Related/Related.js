import { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
    const [products, setProducts] = useState();

    
    useEffect(() => {
        const fetchProductListByName = async () => {
            await axios.get(`http://localhost:3000/v1/productLists/productListName/${props.item.category}`)
                .then(res => {
                    const products = res.data.products;
                    // remove item displayed in products, by id
                    products.filter(item => item !== props.item.id);
    
                    setProducts(products);
                })
                .catch(err => console.log(err))
        }
        fetchProductListByName()
    }, [props.item.category, props.item.id])

    return (
        <div className="related__products">
            <div className="related__header__container">
                <div className="related__header">
                    <h2>Recommended Products</h2>
                </div>
                <div className="related__header__line">

                </div>
            </div>
            <div className="related__card__container">
                <div className="related__product__card">
                    {products && products.map((product) => <RelatedCard item={product} />)}
                </div>
            </div>
        </div>
    );
}

export default Related;