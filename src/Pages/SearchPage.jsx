import React, { useEffect, useState } from "react";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Create from '../Components/Create';
import Notifications from '../Components/Notifications';
import Settings from '../Components/Settings';
import Messages from '../Components/Messages';
import SearchMain from "../Components/SearchMain";


const SearchPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

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
      <Navbar />
      <Create isCreateOpen={isCreateOpen} />
      <Notifications showNot={showNot} />
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      <Messages setShowMessages={setShowMessages} showMessages={showMessages} />
      <SearchMain />
    </div>
  );
};

export default SearchPage;
