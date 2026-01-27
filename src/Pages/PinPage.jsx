import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import PinPageMain from '../Components/PinPageMain'
import Create from '../Components/Create';
import Notifications from '../Components/Notifications';
import Settings from '../Components/Settings';
import Messages from '../Components/Messages';

const PinPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  const handleClickOutside = () => {
    setIsCreateOpen(false);
    setShowNot(false);
    setShowSettings(false);
    setShowMessages(false);
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


   return (
      <div>
        <Sidebar setIsCreateOpen={setIsCreateOpen} setShowNot={setShowNot} setShowSettings={setShowSettings} setShowMessages={setShowMessages} />
        {showNavbar && ( <Navbar/> )}
        <PinPageMain />
        <Create isCreateOpen={isCreateOpen} />
        <Notifications showNot={showNot} />
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
        <Messages setShowMessages={setShowMessages} showMessages={showMessages} />
      </div>
   )
}
export default PinPage