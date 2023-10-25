import { useEffect } from 'react';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import './index.css'

const Search = () => {
    const search = useContext(SearchContext)
    const [ searchParam, setSearchParam ] = useSearchParams()

    const searchKeyword = {
        keyword: search.searchKeyword
    }

    useEffect(() => {
        setSearchParam(searchKeyword, { replace: true })
    }, [searchKeyword.keyword])

    return ( 
        <div className="search__container">
            <div className="search__container__header">
                <h1>No results found for "{search.searchKeyword}"</h1>
            </div>
        </div>
     );
}
 
export default Search;