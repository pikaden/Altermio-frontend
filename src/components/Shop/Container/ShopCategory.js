import { useEffect, useState } from "react";
import ItemCard from "../../Card/ItemCard/ItemCard";
import './ShopCategory.css'
import axios from "axios";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);

    const fetchProductListById = async () => {
        await axios.get(`http://localhost:3000/v1/productLists/manage/${props.category.id}`)
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchProductListById()
        setLoading(false)
    }, [])

    return (
        <div className="shop__category__container">
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto' />}

            <div className="shop__category__header">
                <div className="shop__category__header__big">
                    <div className="shop__category__head">
                        <Link to={`/category/${props.category.id}`} >
                            <h2>{props.category.categoryName}</h2>
                        </Link>
                    </div>
                    <div className="shop__category__header__line"></div>
                </div>
            </div>

            {items &&
                <div className="shop__category__card__container">
                    <div className="shop__category__product__card">
                        {items.results.products.map((data) => <ItemCard item={data} />)}
                    </div>
                </div>
            }
        </div>
    );
}

export default ShopCategory;