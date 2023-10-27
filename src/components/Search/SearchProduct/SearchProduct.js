import ReactLoading from 'react-loading';
import './SearchProduct.css'
import ItemCard from "../ItemCard/ItemCard";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const SearchProduct = (props) => {
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState('');
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams()

    const ALL_LIMIT_VALS = [
        { id: 0, value: 5 },
        { id: 1, value: 10 },
    ];

    const ALL_SORT_BY_VALS = [
        { id: 0, value: 'name' },
        { id: 1, value: 'category' },
        { id: 2, value: 'state' },
        { id: 3, value: 'brand' },
    ];

    const handlePageChange = async (event, value) => {
        setPage(value);

        searchParams.set('page', value);
        setSearchParams(searchParams);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);

        searchParams.set('limit', event.target.value);
        setSearchParams(searchParams);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);

        searchParams.set('sortBy', event.target.value);
        setSearchParams(searchParams);
    };


    return (
        <div className="featured__products__container">
            <div className="featured__products">
                <div className="featured__products__header">
                    <h3 className='featured__items__header__big'>Results found for "{props.searchKeyword}" </h3><div className='featured__header__small'>{props.items.totalResults} results</div>
                </div>
                <div className="featured__products__header__line"></div>
                <div className="category__sort">
                    <div className="show__filter">
                        <Box sx={{ minWidth: 100 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Limit</InputLabel>
                                <Select
                                    value={limit}
                                    label="Limit"
                                    onChange={handleLimitChange}
                                >
                                    {ALL_LIMIT_VALS.map((option, index) => (
                                        <MenuItem key={option.id} value={option.value}>{option.value}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="filter__by">
                        <div className="show__filter">
                            <Box sx={{ width: 120 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sort by</InputLabel>
                                    <Select
                                        value={sortBy}
                                        label="Sort by"
                                        onChange={handleSortByChange}
                                    >
                                        {ALL_SORT_BY_VALS.map((option, index) => (
                                            <MenuItem key={option.id} value={option.value}>{option.value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                </div>
                <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
                    {!props.items && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
                    {props.items &&
                        <div className="featured__products__card__container">
                            {props.items.results.map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))}
                            <Pagination
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                                count={props.items.totalPages}
                                page={page}
                                size='large'
                                onChange={handlePageChange}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchProduct;