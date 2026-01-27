import React, {useState, useEffect} from 'react'
import './ProfileMain.css'
import profilepic from '../assets/profile.png'
import palette from '../assets/palette.png'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import axios from 'axios'

const ProfileMain = () => {
  const [profile, setProfile] = useState(null);
  const [pins, setPins] = useState([]);


useEffect(() => {
  const fetchProfile = async () => {
    try {
    const res = await axios.get("/api/me", {withCredentials:true} );
    setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
    };
    fetchProfile();
}, []);

useEffect(() => {
  if (!profile) return;
  const fetchPins = async () => {
    const res = await axios.get(`/api/user/${profile.id}`, { withCredentials: true });
    setPins(res.data);
  };
  fetchPins();
}, [profile]);


const logout = async () => {
  await axios.post(("/api/logout"), {}, { withCredentials: true });
};
const handleLogout = async () => {
  try {
    await logout();
    window.location.href = "/login";
  } catch (err) {
    console.error("Logout failed:", err);
  }
};


  if (!profile) return <Spinner/>;

   return (
      <div className='profilemain'>
        <div className='info'>
            <img src={profilepic} alt="profile picture" loading='lazy'/>
            <h3>{profile.username}</h3>
            <p>{profile.email}</p>
            <Link to="/creation-tool"><button>Create Pin</button></Link>
        </div>
        <div className={`pins ${pins.length === 0 ? "empty" : "has-pins"}`}>
            {pins.length === 0 ? (
            <div>
                <img src={palette} loading='lazy'/>
                <p>Create your first Pin</p>
            </div>
            ) : (
          pins.map(pin => (
            <div key={pin.id} className='pin'>
              <img src={pin.img} alt={pin.caption} />
              <p>{pin.caption}</p>
            </div>
          ))
        )}
        </div>
        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
   )
}
export default ProfileMain