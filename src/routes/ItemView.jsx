import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';

const ProductView = (props) => {
    const param = useParams()
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)

    const fetchProduct = async () => {
        // get product by id
        await axios.get(`http://localhost:3000/v1/products/${param.id}`)
            .then(res => {
                // const imageRes = res.data ?
                //     res.data.image.url :
                //     defaultImageUrl;
                // setImageUrl(imageRes);

                const product = res.data;
                setItem(product);

                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProduct();
    }, [param.id])

    return (
        <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
            {item && <Item item={item} />}
        </div>
    );
}

export default ProductView;