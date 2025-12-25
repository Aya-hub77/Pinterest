import React, { useState } from 'react';
import './Navbar.css';
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import profile from '../assets/profile.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAxios } from '../api/axiosInstance';

const Navbar = ({ setAccounts }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axiosInstance.get(`/pin/suggestions?q=${encodeURIComponent(value)}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <div className='navbar'>
      <div className="input">
        <input type="text" placeholder="Search" value={search} onChange={handleChange} onKeyDown={handleKeyDown} />
        <FiSearch className='icon' />
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map(s => (
              <div key={s} className="suggestion-item" onClick={() => { navigate(`/search?q=${s}`); setSearch(s); setSuggestions([]); }} > {s} </div>
            ))}
          </div>
        )}
      </div>
      <div className='profile'>
        <div>
          <NavLink to="/profile">
            <img src={profile} alt="profile" />
            <p className='profile-p'>Your profile</p>
          </NavLink>
        </div>
        <div>
          <SlArrowDown className='icon' onClick={(e) => { e.stopPropagation(); setAccounts(prev => !prev); }} />
          <p className='accounts-p'>Accounts</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
