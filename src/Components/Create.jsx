import React from 'react'
import './Create.css'
import { BsPin } from "react-icons/bs";
import { RiLayout2Line } from "react-icons/ri";
import { LuSquareBottomDashedScissors } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Create = ({isCreateOpen}) => {

   return (
    <>
    {isCreateOpen && (
      <div className='create'>
        <h2>Create</h2>
        <Link to="/creation-tool"><div className='item'>
            <BsPin className='icon' />
            <div>
            <h4>Pin</h4>
            <p>Post your photos or videos and add links, stickers, effects and more</p></div>
        </div></Link>
        <div className='item'>
            <RiLayout2Line className='icon' />
            <div>
            <h4>Board</h4>
            <p>Organize a collaction of your favorite Pins by creating a board</p></div>
        </div>
        <div className='item'>
            <LuSquareBottomDashedScissors className='icon' />
            <div>
            <h4>Collage</h4>
            <p>Mix and match ideas to build your vision and create something new</p></div>
        </div>
      </div>
      )}
      </>
   )
}
export default Create