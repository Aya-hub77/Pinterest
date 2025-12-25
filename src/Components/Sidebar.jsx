import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';
import { BsPinterest } from "react-icons/bs";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { RiLayout2Line } from "react-icons/ri";
import { MdOutlineAddBox } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({setIsCreateOpen, setShowNot, setShowSettings, setShowMessages}) => {
   return (
      <nav className='sidebar'>
        <div className='sidebar-container'>
        <div className='sidebar-item'><NavLink to="/" ><BsPinterest className='icon' id='pin' /></NavLink>
        <p>Home</p></div>
        <div className='sidebar-item'><NavLink to="/" ><RiHomeSmile2Fill className='icon' /></NavLink>
        <p>Home</p></div>
        <div className='sidebar-item'><NavLink to="/profile" ><RiLayout2Line className='icon' /></NavLink>
        <p>Your boards</p></div>
        <div className='sidebar-item'><MdOutlineAddBox className='icon bounce' onClick={(e) => { e.stopPropagation(); setIsCreateOpen(prev => !prev);}} />
        <p>Create</p></div>
        <div className='sidebar-item'><IoNotificationsOutline className='icon bounce' onClick={(e) => { e.stopPropagation(); setShowNot(prev => !prev);}} />
        <p>Updates</p></div>
        <div className='sidebar-item'><LuMessageCircleMore className='icon bounce' onClick={(e) => { e.stopPropagation(); setShowMessages(prev => !prev);}} />
        <p>Messages</p></div>
        <div className='sidebar-item'><IoSettingsOutline className='icon bounce' id='settings' onClick={(e) => { e.stopPropagation(); setShowSettings(prev => !prev);}} />
        <p id='settings'>Settings & Support</p></div>
        </div>
        <div className='sidebar-mobile'>
            <NavLink to="/" ><RiHomeSmile2Fill className='icon' /></NavLink>
            <IoNotificationsOutline className='icon' onClick={(e) => { e.stopPropagation(); setShowNot(prev => !prev);}} />
            <LuMessageCircleMore className='icon' onClick={(e) => { e.stopPropagation(); setShowMessages(prev => !prev);}} />
            <IoSettingsOutline className='icon' onClick={(e) => { e.stopPropagation(); setShowSettings(prev => !prev);}} />
        </div>
      </nav>
   )
}
export default Sidebar