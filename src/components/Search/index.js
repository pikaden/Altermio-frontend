import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import './index.css'
import axios from 'axios';

const Search = () => {
    const search = useContext(SearchContext)
    const [searchParam, setSearchParam] = useSearchParams()
    const [item, setItem] = useState()

    const searchKeyword = {
        keyword: search.searchKeyword
    }

    const fetchProduct = async () => {
        // search product by name
        await axios.get(`http://localhost:3000/v1/products/search?keyword=${search.searchKeyword}`)
            .then(res => {
                const products = res.data;
                console.log('aaa: ' + JSON.stringify(products));
                setItem(products);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // window.scrollTo(0, 0)
        setSearchParam(searchKeyword, { replace: true })
        fetchProduct();
    }, [searchKeyword.keyword])

    return (
        <div className="search__container">
            {!item &&
                <div className="search__container__header">
                    <h1>No results found for "{search.searchKeyword}"</h1>
                </div>
            }
        </div>
    );
}

export default Search;