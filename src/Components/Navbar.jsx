import React, { useState } from 'react';
import './Navbar.css';
import { FiSearch } from "react-icons/fi";
import profile from '../assets/profile.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(`/api/suggestions?q=${encodeURIComponent(value)}`);
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
    <nav className='navbar'>
      <div className="input">
        <FiSearch className='icon' />
        <input type="text" placeholder="Search" value={search} onChange={handleChange} onKeyDown={handleKeyDown} />
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map(s => (
              <div key={s} className="suggestion-item" onClick={() => { navigate(`/search?q=${s}`); setSearch(s); setSuggestions([]); }} > {s} </div>
            ))}
          </div>
        )}
      </div>
      <NavLink to="/profile"><img src={profile} alt="profile" className='profile' /></NavLink>
    </nav>
  );
};

export default Navbar;