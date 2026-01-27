import React, { useEffect} from "react";
import { useSearch } from "../Context/SearchContext";
import { Link, useLocation } from "react-router-dom";
import './SearchMain.css';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuDownload } from "react-icons/lu";
import axios from "axios";


const SearchMain = () => {
  const { searchResults, setSearchResults, searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    if (!query) return;
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [location.search, setSearchQuery, setSearchResults]);


  return (
    <div className="search-page">
      <h2>Search results for {searchQuery}</h2>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="pins">
        {searchResults.map((pin) => (   
          <div className="pin" key={pin._id}>
            <div className="img-wrapper">
              <Link to={`/pin/${pin._id}`}><img src={pin.img} alt={pin.caption} loading="lazy" /></Link>
              <button className="save">Save</button>
              <LuDownload className="download" />
            </div>
            <div className="pin-info">
              <p>{pin.caption}</p>
              <HiOutlineDotsHorizontal className="icon" />
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default SearchMain;




