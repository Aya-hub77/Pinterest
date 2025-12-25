import React from 'react'
import './Settings.css'
import remove from '../assets/remove.png'

const Settings = ({showSettings, setShowSettings}) => {
   return (
    <>
    {showSettings && (
      <div className='settings'>
        <div className='header'>
            <img src={remove} onClick={() => setShowSettings(false)}/>
            <h3>Settings & Support</h3>
        </div>
        <p>Settings</p>
        <p>Refine your recommendations</p>
        <p>Link to Pinterest</p>
        <p>Reports and violations center</p>
        <p>Install the Windows app</p>
        <p>Be a beta tester</p>
        <p className='small'>Support</p>
        <p>Help center</p>
        <p>Create widget</p>
        <p>Removals</p>
        <p>Personalized Ads</p>
        <p>Your privacy rights</p>
        <p>Privacy policy</p>
        <p>Terms of service</p>
        <p className='small'>Resources</p>
        <div className='links'>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Businesses</a>
            <a href="#">Careers</a>
            <a href="#">Developers</a>
        </div>
      </div>
    )}
      </>
   )
}
export default Settings