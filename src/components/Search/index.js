import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import './index.css'
import axios from 'axios';
import SearchProduct from './SearchProduct/SearchProduct';

const Search = () => {
    const param = useParams()
    const search = useContext(SearchContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const [items, setItems] = useState()

    const searchKeyword = {
        keyword: search.searchKeyword ? search.searchKeyword : localStorage.getItem('searchKeyword'),
        page: searchParams.get('page') ? searchParams.get('page') : 1,
        limit: searchParams.get('limit') ? searchParams.get('limit') : 10,
        sortBy: searchParams.get('sortBy') ? searchParams.get('sortBy') : 'createdAt'
    }

    const fetchProduct = async () => {
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const sortBy = searchParams.get('sortBy');

        // search product by name
        await axios.get(`http://localhost:3000/v1/products/search?keyword=${search.searchKeyword}`, {
            params: {
                page: page,
                limit: limit,
                sortBy: sortBy
            }
        })
            .then(res => {
                const products = res.data;
                setItems(products);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // window.scrollTo(0, 0)
        setSearchParams(searchKeyword)
        fetchProduct();
    }, [searchKeyword.keyword, searchParams])

    return (
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {(!items || items.results.length === 0) &&
                <div className="search__container__header">
                    <h1>No results found for "{search.searchKeyword}"</h1>
                </div>
            }
            {(items && items.results.length !== 0) &&
                <SearchProduct searchKeyword={search.searchKeyword} items={items} />
            }
        </div>
    );
}

export default Search;