import React, { useEffect, useState } from "react";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Create from '../Components/Create';
import Notifications from '../Components/Notifications';
import Accounts from '../Components/Accounts';
import Settings from '../Components/Settings';
import Messages from '../Components/Messages';
import SearchMain from "../Components/SearchMain";


const SearchPage = () => {

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [accounts, setAccounts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);



  useEffect(() => {
    const handleClickOutside = e => {
      if (!e.target.closest('.create')) setIsCreateOpen(false);
      if (!e.target.closest('.notifications')) setShowNot(false);
      if (!e.target.closest('.messages')) setShowMessages(false);
      if (!e.target.closest('.settings')) setShowSettings(false);
      if (!e.target.closest('.accounts')) setAccounts(false);
      if (!e.target.closest('.actions-dropdown')) setOpenDropdownId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      <Sidebar setIsCreateOpen={setIsCreateOpen} setShowNot={setShowNot} setShowSettings={setShowSettings} setShowMessages={setShowMessages} />
      <Navbar setAccounts={setAccounts} accounts={accounts} />
      <Create isCreateOpen={isCreateOpen} />
      <Notifications showNot={showNot} />
      <Accounts accounts={accounts} />
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      <Messages setShowMessages={setShowMessages} showMessages={showMessages} />
      <SearchMain setOpenDropdownId={setOpenDropdownId} openDropdownId={openDropdownId} />
    </div>
  );
};

export default SearchPage;
