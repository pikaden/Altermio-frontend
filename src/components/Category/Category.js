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

    const [show, setShow] = useState('All');
    const [filter, setFilter] = useState('Latest');
    const [page, setPage] = useState(props.defaultPage ? parseInt(props.defaultPage) : 1);
    const [searchParams, setSearchParams] = useSearchParams()

    const handlePageChange = async (event, value) => {
        setPage(value);

        searchParams.set('page', value);
        setSearchParams(searchParams);
    };

    const handleShowChange = (event) => {
        setShow(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="category__container">
            <div className="category">
                <div className="category__header__container">
                    <div className="category__header__big">
                        <div className="category__header">
                            <h2>{props.name}</h2>
                        </div>
                        <div className="category__header__line"></div>
                    </div>
                    <div className="category__sort">
                        <div className="show__filter">
                            <Box sx={{ minWidth: 100 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Show</InputLabel>
                                    <Select
                                        value={show}
                                        label="Show"
                                        onChange={handleShowChange}
                                    >
                                        <MenuItem value={'All'}>All</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="filter__by">
                            <div className="show__filter">
                                <Box sx={{ width: 120 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Filter by</InputLabel>
                                        <Select
                                            value={filter}
                                            label="Filter"
                                            onChange={handleFilterChange}
                                        >
                                            <MenuItem value={'Latest'}>Latest</MenuItem>
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