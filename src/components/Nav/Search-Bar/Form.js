import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Form.css'
import { useContext } from 'react';
import { SearchContext } from '../../../Context/SearchContext';

const Form = () => {
    const [ searchInput, setSearchInput] = useState('')
    const searchContext = useContext(SearchContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleFormSubmit = (e) => {  
        e.preventDefault()
        searchContext.setSearchKeyword(searchInput)
        localStorage.setItem('searchKeyword', searchInput)
        navigate('/search')
    }

    return ( 
            <form className="search__form" onSubmit={handleFormSubmit}>
                <input type="text"  placeholder='Search for products' className="search__form__input" value={searchInput} onChange={handleChange} required/>
                <button className="search__form__button" type='submit'>
                    <SearchIcon fontSize='medium'/>
                </button>
            </form>
     );
}
 
export default Form;