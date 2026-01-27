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
        <NavLink to="/" ><BsPinterest className='icon pin'/></NavLink>
        <NavLink to="/" ><RiHomeSmile2Fill className='icon home' /></NavLink>
        <NavLink to="/profile" ><RiLayout2Line className='icon boards' /></NavLink>
        <MdOutlineAddBox className='icon cre' onClick={(e) => { e.stopPropagation(); setIsCreateOpen(prev => !prev);}} />
        <IoNotificationsOutline className='icon' onClick={(e) => { e.stopPropagation(); setShowNot(prev => !prev);}} />
        <LuMessageCircleMore className='icon' onClick={(e) => { e.stopPropagation(); setShowMessages(prev => !prev);}} />
        <IoSettingsOutline className='icon' onClick={(e) => { e.stopPropagation(); setShowSettings(prev => !prev);}} />
      </nav>
   )
}
export default Sidebar