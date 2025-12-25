import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { LuMessageCircle, LuDownload } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { PiEyeSlashBold } from "react-icons/pi";
import { useAxios } from "../api/axiosInstance";
import { useAuth } from "../Context/useAuth";
import Spinner from "./Spinner";
import profile from "../assets/profile.png";
import "./PinPageMain.css";

const BACKEND_URL = "http://localhost:5000";

const PinPageMain = ({ pins, loading, error, setOpenDropdownActions, openDropdownActions, pinDropdown, setPinDropdown, }) => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pinData, setPinData] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [pinsState, setPinsState] = useState({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".actions-dropdown")) setOpenDropdownActions(false);
      if (!e.target.closest(".pin-card-dropdown")) setPinDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenDropdownActions, setPinDropdown]);

  const { id: pinId } = useParams();

useEffect(() => {
  const fetchPin = async () => {
    try {
      const res = await axiosInstance.get(`/pin/${pinId}`);
      const pin = res.data;

      setPinData(pin);
      setLikesCount(pin.likes?.length || 0);

      const likeIds = pin.likes?.map(l => (typeof l === 'string' ? l : l._id)) || [];
      const saveIds = pin.saves?.map(s => (typeof s === 'string' ? s : s._id)) || [];

      setLiked(user?._id ? likeIds.includes(user._id) : false);

      setPinsState({
        [pin._id]: { saved: user?._id ? saveIds.includes(user._id) : false }
      });

    } catch (err) {
      console.error("Failed to fetch pin:", err);
    }
  };

  if (pinId) fetchPin();
}, [pinId, axiosInstance, user]);

const handleLike = async () => {
  if (!pinData) return;
  try {
    const res = await axiosInstance.put(`/pin/${pinId}/like`);
    setLiked(res.data.liked);
    setLikesCount(res.data.likesCount);
  } catch (err) {
    console.error("Like failed", err);
  }
};

const handleSave = async (pinId) => {
  try {
    const res = await axiosInstance.put(`/pin/${pinId}/save`);
    setPinsState(prev => ({
      ...prev,
      [pinId]: {
        ...prev[pinId],
        saved: res.data.saved,
      }
    }));
  } catch (err) {
    console.error("Save failed", err);
  }
};

  if (loading || !pinData) return <Spinner />;
  if (error) return <p>{error}</p>;

  const rightPins = pins.filter((_, index) => index % 2 === 0);
  const leftPins = pins.filter((_, index) => index % 2 !== 0);

  const toggleDropdown = (id) => {
    setOpenDropdownActions((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="pinpagemain">
      <FaArrowLeftLong className="arrow" onClick={() => navigate(-1)} />
      <div className="pin-card">
        <div className="pin-card-header">
          <div className="main-icons">
            <div className="like-wrapper">
              <FiHeart className={`icon ${liked ? "liked" : ""}`} onClick={handleLike}/>
              <span>{likesCount}</span>
            </div>
            <LuMessageCircle className="icon" />
            <LuDownload className="icon" />
            <HiOutlineDotsHorizontal className="icon" onClick={(e) => { e.stopPropagation(); setPinDropdown((prev) => (prev === "main" ? null : "main")); }}/>
          </div>
          <button className={`save ${pinsState[pinData._id]?.saved ? "saved" : ""}`} onClick={() => handleSave(pinData._id)} >{pinsState[pinData._id]?.saved ? "Saved" : "Save"}</button>
        </div>
        <img src={`${BACKEND_URL}/uploads/${pinData.img}`} loading="lazy" alt={pinData.caption}/>
        <p className="caption">{pinData.caption}</p>
        <div className="publisher-info">
          <img src={profile} alt="Publisher" />
          <p>{pinData.owner?.username || "Unknown user"}</p>
        </div>
        <div className={`pin-card-dropdown ${pinDropdown === "main" ? "open" : ""}`}>
          <p>Download image</p>
          <p>See more like this</p>
          <p>See less like this</p>
          <p>Report Pin</p>
        </div>
      </div>
      <div className="pins">
        <div className="left-pins">
          {leftPins.map((s) => (
            <div key={s.id} className="card">
              <div className="pin-wrapper">
                <Link to={`/pin/${s.id}`}>
                  <img src={`${BACKEND_URL}/uploads/${s.img}`} alt={s.caption} />
                </Link>
                <button className="save">Save</button>
                <LuDownload className="download" />
              </div>
              <div className="pin-info">
                <p>{s.caption}</p>
                <HiOutlineDotsHorizontal className="icon" onClick={(e) => { e.stopPropagation(); toggleDropdown(s.id); }} />
              </div>
              <div className={`actions-dropdown ${openDropdownActions === s.id ? "open" : ""}`}>
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
        <div className="right-pins">
          {rightPins.map((s) => (
            <div key={s.id} className="card">
              <div className="pin-wrapper">
                <Link to={`/pin/${s.id}`}>
                  <img src={`${BACKEND_URL}/uploads/${s.img}`} alt={s.caption} />
                </Link>
                <button className="save">Save</button>
                <LuDownload className="download" />
              </div>
              <div className="pin-info">
                <p>{s.caption}</p>
                <HiOutlineDotsHorizontal className="icon" onClick={(e) => { e.stopPropagation(); toggleDropdown(s.id); }} />
              </div>
              <div className={`actions-dropdown ${openDropdownActions === s.id ? "open" : ""}`}>
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
      </div>
<div className='pinpagemain-mobile'>
  <div className='pin'>
    <Link to={`/pin/${pinData.id}`}>
      <img src={`${BACKEND_URL}/uploads/${pinData.img}`} loading='lazy' />
    </Link>
    <div className='info'>
      <div className='like-wrapper'>
        <FiHeart className={`icon ${liked ? "liked" : ""}`} onClick={handleLike} />
        <span>{likesCount}</span>
      </div>
      <LuMessageCircle className='icon' />
      <LuDownload className='icon' />
      <HiOutlineDotsHorizontal className='icon' onClick={(e) => { e.stopPropagation(); setPinDropdown(prev => (prev === "main" ? null : "main")); }} />
      <button className={`save ${pinsState[pinData._id]?.saved ? "saved" : ""}`} onClick={() => handleSave(pinData._id)} >{pinsState[pinData._id]?.saved ? "Saved" : "Save"}</button>
    </div>
    <div className='publisher'>
      <img src={profile} alt='publisher' />
      <p>{pinData.owner?.username || "Unknown user"}</p>
    </div>
    <div className={`pin-dropdown ${pinDropdown === "main" ? "open" : ""}`}>
      <p>Download image</p>
      <p>See more like this</p>
      <p>See less like this</p>
      <p>Report Pin</p>
    </div>
  </div>
  <p className='more'>More to explore</p>
  <div className='pins'>
    {pins.map(s => (
      <div key={s.id} className="card">
        <Link to={`/pin/${s.id}`}>
          <img src={`${BACKEND_URL}/uploads/${s.img}`} />
        </Link>
        <div className="pin-info">
          <p>{s.caption}</p>
          <HiOutlineDotsHorizontal className='icon' onClick={(e) => { e.stopPropagation(); toggleDropdown(s.id); }} />
        </div>
        <div className={`actions-dropdown ${openDropdownActions === s.id ? "open" : ""}`}>
          <div><PiEyeSlashBold className="icon" /><p>Hide Pin</p></div>
          <div><LuDownload className="icon" /><p>Download image</p></div>
          <div><MdDoNotDisturbAlt className="icon" /><p>Report Pin</p></div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default PinPageMain;
