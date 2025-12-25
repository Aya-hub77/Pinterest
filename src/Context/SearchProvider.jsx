import { useState } from "react";
import SearchContext from "./SearchContext";

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};