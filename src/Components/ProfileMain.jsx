import React, {useState, useEffect} from 'react'
import './ProfileMain.css'
import profilepic from '../assets/profile.png'
import palette from '../assets/palette.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/useAuth';
import { useAxios } from '../api/axiosInstance';
import Spinner from './Spinner'

const ProfileMain = () => {
const API_URL = import.meta.env.VITE_API_URL;
  const { user, logout } = useAuth();
  const axiosInstance = useAxios();
  const [profile, setProfile] = useState(null);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/${user.id}`);
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPins = async () => {
      try {
        const res = await axiosInstance.get(`/pin/user/${user.id}`);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
    fetchPins();
  }, [user, axiosInstance]);


const [savedPins, setSavedPins] = useState([]);

useEffect(() => {
  if (!user) return;
  const fetchSavedPins = async () => {
    try {
      const res = await axiosInstance.get(`/user/saved/${user.id}`);
      setSavedPins(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchSavedPins();
}, [user, axiosInstance])

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
            <Link to="/creation-tool"><button>Create</button></Link>
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
              <img src={`${API_URL}/uploads/${pin.img}`} alt={pin.caption} />
              <p>{pin.caption}</p>
            </div>
          ))
        )}
        </div>
        <Link to="/creation-tool"><button>Create Pin</button></Link>
        <h4 className='saved-title'>Saved Pins</h4>
        <div className={`saved-pins ${savedPins.length === 0 ? "empty" : "has-pins"}`}>
          {savedPins.length === 0 ? (
            <p>No saved pins yet</p>
          ) : (
          savedPins.map(pin => (
          <div key={pin._id} className='pin'>
            <img src={`${API_URL}/uploads/${pin.img}`} alt={pin.caption} />
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