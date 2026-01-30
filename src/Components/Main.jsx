import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Main.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LuDownload } from "react-icons/lu";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx"

const Main = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchPins = async () => {
    setLoading(true);
    try {
    const res = await axios.get("/api/pins", { withCredentials: true } );
    setPins(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch pins');
    } finally {
      setLoading(false);
    }
  };
  fetchPins();
}, []);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <main className="main">
        <div className="pins">
        {pins.map((pin) => (   
          <div className="pin" key={pin.id}>
            <div className="img-wrapper">
              <Link to={`/pin/${pin.id}`}><img src={`https://pinterest-backend-lvmx.onrender.com/uploads/${pin.img}`} alt={pin.caption} loading="lazy" /></Link>
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
    </main>
  );
};
export default Main;