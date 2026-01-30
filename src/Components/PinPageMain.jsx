import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { LuMessageCircle, LuDownload } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Spinner from "./Spinner";
import profile from "../assets/profile.png";
import "./PinPageMain.css";
import axios from "axios";

const PinPageMain = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState(null);
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id: pinId } = useParams();

useEffect(() => {
  const fetchPin = async () => {
    setLoading(true);
    try {
    const res = await axios.get(`/api/pin/${pinId}`, {withCredentials:true} );
    setPin(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch pin");
    } finally {
      setLoading(false);
    }
    };
    fetchPin();
}, [pinId]);

useEffect(() => {
  const fetchPins = async () => {
    try {
    const res = await axios.get("/api/pins", {withCredentials:true} );
    setPins(res.data);
    } catch (err) {
      console.error(err);
    }
    };
    fetchPins();
}, []);

  if (loading || !pin) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="pinpagemain">
      <FaArrowLeftLong className="arrow" onClick={() => navigate(-1)} />
      <div className="pin-card">
        <img src={`https://pinterest-backend-lvmx.onrender.com/uploads/${pin?.img}`} loading="lazy" alt={pin?.caption} className="img"/>
        <p className="caption">{pin?.caption}</p>
        <div className="publisher-info">
          <img src={profile} alt="Publisher" />
          <p>{pin?.owner?.username || "Unknown user"}</p>
        </div>
        <div className="pin-card-header">
          <div>
            <FiHeart className="icon" />
            <LuMessageCircle className="icon" />
            <LuDownload className="icon" />
            <HiOutlineDotsHorizontal className="icon" />
          </div>
          <button className="save" >Save</button>
        </div>
      </div>
      <p className='more'>More to explore</p>
      <div className="pins">
          {pins.map((s) => (
            <div key={s.id} className="pin">
              <div className="pin-wrapper">
                <Link to={`/pin/${s.id}`}><img src={`https://pinterest-backend-lvmx.onrender.com/uploads/${s.img}`} alt={s.caption} /></Link>
                <button className="save">Save</button>
                <LuDownload className="download" />
              </div>
              <div className="pin-info">
                <p>{s.caption}</p>
                <HiOutlineDotsHorizontal className="icon"/>
              </div>
            </div>
            ))}
      </div>
    </div>
  );
};

export default PinPageMain;