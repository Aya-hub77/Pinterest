import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Main from '../Components/Main';
import Create from '../Components/Create';
import Notifications from '../Components/Notifications';
import Accounts from '../Components/Accounts';
import Settings from '../Components/Settings';
import Messages from '../Components/Messages';
import { useAxios } from '../api/axiosInstance';

const Home = () => {
  const api = useAxios();
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [accounts, setAccounts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

useEffect(() => {
  const fetchPins = async () => {
    setLoading(true);
    try {
      const res = await api.get('/pin');
      setPins(res.data);
    } catch (err) {
      console.log(err);
      setError('Failed to fetch pins');
    } finally {
      setLoading(false);
    }
  };
  fetchPins();
}, [api]);


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

  useEffect(() => {
    document.title = 'Pinterest';
  }, []);

  return (
    <div>
      <Sidebar setIsCreateOpen={setIsCreateOpen} setShowNot={setShowNot} setShowSettings={setShowSettings} setShowMessages={setShowMessages} />
      <Navbar setAccounts={setAccounts} accounts={accounts} />
      <Main openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId} pins={pins} loading={loading} error={error} />
      <Create isCreateOpen={isCreateOpen} />
      <Notifications showNot={showNot} />
      <Accounts accounts={accounts} />
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
      <Messages setShowMessages={setShowMessages} showMessages={showMessages} />
    </div>
  );
};

export default Home;
