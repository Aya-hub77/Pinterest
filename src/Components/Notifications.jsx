import React, {useState, useEffect} from 'react'
import './Notifications.css'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useAxios } from '../api/axiosInstance';
import { useAuth } from '../Context/useAuth';
import profile from "../assets/profile.png";

const Notifications = ({showNot}) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!showNot) return;
    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get("/user/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, [showNot, axiosInstance, user]);

   return (
    <>
      {showNot && (
        <div className='notifications'>
          <h2>Updates</h2>
          <div>
            <h4>Recent</h4>
            <div className='items'>
              {notifications.length ? (
                notifications.map((not) => (
                  <div className='item' key={not._id}>
                    <div className='left'>
                      <img src={profile} loading='lazy' alt='sender' />
                      <p>{not.sender.username} {" "}
                        {not.type === "like" ? "liked your pin"
                        : not.type === "comment" ? "commented on your pin"
                        : not.type === "follow" ? "started following you"
                        : not.type === "save" ? "saved your pin"
                        : ""}
                      </p>
                    </div>
                    <div className='right'>
                      <p>{new Date(not.createdAt).toLocaleString()}</p>
                      <HiOutlineDotsHorizontal />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ padding: '10px' }}>No new notifications</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Notifications