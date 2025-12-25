import React, {useState} from 'react'
import './Messages.css'
import remove from '../assets/remove.png'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import messagebottle from '../assets/messagebottle.webp'
import message from '../assets/message.png'
import invite from '../assets/invite.png'

const Messages = ({showMessages, setShowMessages}) => {
    const [open, setOpen] = useState(false);
   return (
    <>
    {showMessages &&(
      <div className='messages'>
        <div className='header'>
            <img src={remove} onClick={() => setShowMessages(false)} />
            <h3>Messages</h3>
            <HiOutlineDotsHorizontal className='icon' onClick={() => setOpen(!open)} />
        </div>
        <div className='message'>
            <img src={message} />
            <h4>New message</h4>
        </div>
        <div className='invite'>
            <img src={invite} />
            <div><h4>Invite your friends</h4>
            <p>Connect to start chatting</p></div>
        </div>
        <div className='more'>
            <img src={messagebottle} />
            <p>Updates show activity on your Pins and boards and give you tips on topics to explore. They’ll be here soon.</p>
        </div>
        <p className={`read ${open ? "open" : ""}`}>Mark all as read</p>
      </div>
    )}
      </>
   )
}
export default Messages