import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const CategoryView = () => {
    const param = useParams()
    const [items, setItems] = useState()
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const fetchProductsByProductListId = async () => {
            const page = searchParams.get('page');
            const limit = searchParams.get('limit');
            const sortBy = searchParams.get('sortBy');

            // get products by product list id
            await axios.get(`http://localhost:3000/v1/productLists/manage/${param.id}`, {
                params: {
                    page: page,
                    limit: limit,
                    sortBy: sortBy
                }
            })
                .then(res => {
                    const items = res.data;
                    setItems(items);
                    setLoading(false);
                })
                .catch(err => console.log(err))
        }
        fetchProductsByProductListId();
        window.scrollTo(0, 0)
    }, [param.id, searchParams])

    return (
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {loading && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
            {!loading && <Category defaultPage={searchParams.get('page')} name={items.results.categoryName} items={items} category={items.results.categoryName} />}
        </div>
    );
}

export default CategoryView;