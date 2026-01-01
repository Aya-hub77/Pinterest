import React, { useEffect} from "react";
import { useSearch } from "../Context/SearchContext";
import { useAxios } from "../api/axiosInstance";
import { Link, useLocation } from "react-router-dom";
import './SearchMain.css';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuDownload } from "react-icons/lu";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { PiEyeSlashBold } from "react-icons/pi";


const API_URL = import.meta.env.VITE_API_URL;

const SearchMain = ({openDropdownId, setOpenDropdownId}) => {

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const { searchResults, setSearchResults, searchQuery, setSearchQuery } = useSearch();
  const axiosInstance = useAxios();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    if (!query) return;
    const fetchResults = async () => {
      try {
        const res = await axiosInstance.get(`/pin/search?q=${encodeURIComponent(query)}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, [location.search, axiosInstance, setSearchQuery, setSearchResults]);


  return (
    <div className="search-page">
      <h2>Search results for {searchQuery}</h2>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="pins-grid">
        {searchResults.map((pin) => (   
          <div className="pin" key={pin._id}>
            <div className="img-wrapper">
              <Link to={`/pin/${pin._id}`}>
              <img src={`${API_URL}/uploads/${pin.img}`} alt={pin.caption} loading="lazy" /> </Link>
              <button className="save">Save</button>
              <LuDownload className="download" />
            </div>
            <div className="pin-info">
              <p>{pin.caption}</p>
                <HiOutlineDotsHorizontal className="icon" onClick={(e) => { e.stopPropagation(); toggleDropdown(pin._id); }} />
            </div>
            <div className={`actions-dropdown ${ openDropdownId === pin._id ? "open" : "" }`} >
              <div>
                <PiEyeSlashBold className="icon" />
                <p>Hide Pin</p>
              </div>
              <div>
                <LuDownload className="icon" />
                <p>Download image</p>
              </div>
              <div>
                <MdDoNotDisturbAlt className="icon" />
                <p>Report Pin</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default SearchMain;




