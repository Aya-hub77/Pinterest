import { createContext, useContext } from "react";
const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);
export default SearchContext;