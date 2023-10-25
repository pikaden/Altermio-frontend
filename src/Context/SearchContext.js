import { createContext } from "react";

export const SearchContext = createContext({
    searchKeyword: localStorage.getItem('searchKeyword'),
    setSearchKeyword: () => {}
})