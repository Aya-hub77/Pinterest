import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Create from '../Components/Create';
import Notifications from '../Components/Notifications';
import Accounts from '../Components/Accounts';
import Settings from '../Components/Settings';
import Messages from '../Components/Messages';
import CreationToolMain from '../Components/CreationToolMain'

const CreationTool = () => {

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);
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
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);


   return (
      <div>
        <Sidebar setIsCreateOpen={setIsCreateOpen} setShowNot={setShowNot} setShowSettings={setShowSettings} setShowMessages={setShowMessages} />
        <Navbar setAccounts={setAccounts} accounts={accounts} />
        <CreationToolMain />
        <Create isCreateOpen={isCreateOpen} />
        <Notifications showNot={showNot} />
        <Accounts accounts={accounts} />
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
        <Messages setShowMessages={setShowMessages} showMessages={showMessages} />
      </div>
   )
}
export default CreationTool