import React from 'react'
import './Accounts.css'
import { FaCheck } from "react-icons/fa6";
import profile from '../assets/profile.png'
import { useAuth } from '../Context/useAuth';

const Accounts = ({accounts}) => {
  
  const { user, logout } = useAuth();
  if (!user) return <p className='nouser'>No user logged in</p>;
  const account = [{ name: user.username, email: user.email, type: "Personal" }];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

   return (
    <>
    {accounts &&(
      <div className='accounts'>
        <p className='small'>Currently in</p>
        {account.map((acc, idx) => (
        <div className='personal-info' key={idx} >
            <img src={profile} alt='profile' />
            <div>
                <h3>{acc.name}</h3>
                <div><p>{acc.type}</p><FaCheck className='check' /></div>
                <p>{acc.email}</p>
            </div>
        </div>
        ))}
        <p className='strong'><strong>Convert to business</strong></p>
        <p className='small'>Your accounts</p>
        <p className='strong'><strong>Add Pinterest account</strong></p>
        <p className='strong'  onClick={handleLogout}><strong>Log out</strong></p>
      </div>
    )}
      </>
   )
}
export default Accounts