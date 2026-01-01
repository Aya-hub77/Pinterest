import React from "react";
import "./Main.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuDownload } from "react-icons/lu";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { PiEyeSlashBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx"

const API_URL = import.meta.env.VITE_API_URL;

const Main = ({ loading, pins, error, openDropdownId, setOpenDropdownId }) => {
  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <main className="main">
      <div className="pin">
        {pins.map((pin) => (   
          <div className="pic" key={pin.id}>
            <div className="img-wrapper">
              <Link to={`/pin/${pin.id}`}>
              <img src={`${API_URL}/uploads/${pin.img}`} alt={pin.caption} loading="lazy" /></Link>
              <button className="save">Save</button>
              <LuDownload className="download" />
            </div>
            <div className="pin-info">
              <p>{pin.caption}</p>
              <div className="actions">
                <HiOutlineDotsHorizontal className="icon" onClick={(e) => { e.stopPropagation(); toggleDropdown(pin.id); }} />
                {openDropdownId !== pin.id && <p>More actions</p>}
              </div>
            </div>
            <div className={`actions-dropdown ${ openDropdownId === pin.id ? "open" : "" }`} >
              <p>This Pin was inspired by your recent activity</p>
              <div>
                <FaRegHeart className="icon" />
                <p>See more like this</p>
              </div>
              <div>
                <PiEyeSlashBold className="icon" />
                <p>See less like this</p>
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
    </main>
  );
};

export default Main;