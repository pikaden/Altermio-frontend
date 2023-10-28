import './Category.css';
import ItemCard from '../Card/ItemCard/ItemCard';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TabTitle } from '../../utils/General';
import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const Category = (props) => {
    TabTitle(props.name)

    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState('');
    const [page, setPage] = useState(props.defaultPage ? parseInt(props.defaultPage) : 1);
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
        <div className="category__container">
            <div className="category">
                <div className="category__header__container">
                    <div className="category__header__big">
                        <div className="category__header">
                            <span className='featured__items__header__big'>{props.name}</span>
                            <span className='featured__header__small'>{props.items.totalResults} results</span>
                        </div>
                        <div className="category__header__line"></div>
                    </div>
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
                </div>
                <div className="category__card__container">
                    <div className="category__product__card">
                        {props.items.results.products.map((data) => <ItemCard key={data.id} item={data} category={props.category} />)}
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
                </div>
            </div>
        </div>
    );
}

export default Category;