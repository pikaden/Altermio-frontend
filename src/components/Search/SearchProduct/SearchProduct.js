import ReactLoading from 'react-loading';
import './SearchProduct.css'
import ItemCard from "../ItemCard/ItemCard";
import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const SearchProduct = (props) => {
    const [show, setShow] = useState('All');
    const [filter, setFilter] = useState('Latest');
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams()

    const handlePageChange = async (event, value) => {
        setPage(value);

        searchParams.set('page', value);
        setSearchParams(searchParams);
    };

    return (
        <div className="featured__products__container">
            <div className="featured__products">
                <div className="featured__products__header">
                    <h3 className='featured__items__header__big'>Results found for "{props.searchKeyword}" </h3><div className='featured__header__small'>{props.items.totalResults} results</div>
                </div>
                <div className="featured__products__header__line"></div>
                <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
                    {!props.items && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
                    {props.items &&
                        <div className="featured__products__card__container">
                            {props.items.results.map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                            {/* TODO: fix pagination must below these item */}
                            <div>
                                <Pagination
                                    count={props.items.totalPages}
                                    page={page}
                                    size='large'
                                    onChange={handlePageChange}
                                    showFirstButton
                                    showLastButton
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchProduct;