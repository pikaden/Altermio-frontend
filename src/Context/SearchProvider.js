import { useState } from "react";
import { SearchContext } from "./SearchContext";

const SearchProvider = (props) => {
    const [ keyword, setKeyword ] = useState()

    const setSearchKeyword = (keywordParam) => {
        setKeyword(keywordParam)
    }

    const searchCtx = {
        searchKeyword: keyword ? keyword : localStorage.getItem('searchKeyword'),
        setSearchKeyword: setSearchKeyword
    }
    
    return ( 
        <SearchContext.Provider value={searchCtx}>
            {props.children}
        </SearchContext.Provider>
     );
}
 
export default SearchProvider;