
import { useEffect, useState } from 'react';
import { TabTitle } from '../../utils/General';
import axios from "axios";
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';

const Shop = () => {
    TabTitle("Shop - All Products")
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchProductLists = async () => {
        await axios.get("http://localhost:3000/v1/productLists")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        fetchProductLists();
        setLoading(false);

        window.scrollTo(0, 0)

    }, [])

    return (
        <div className="shop__contianer">
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto' />}
            {categories && categories.map((category) => (
                <ShopCategory key={category.id} category={category} />
            ))}
        </div>
    );
}

export default Shop;