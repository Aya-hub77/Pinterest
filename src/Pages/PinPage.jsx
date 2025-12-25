import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import PinPageMain from '../Components/PinPageMain'
import Create from '../Components/Create';
import Notifications from '../Components/Notifications';
import Accounts from '../Components/Accounts';
import Settings from '../Components/Settings';
import Messages from '../Components/Messages';
import Spinner from '../Components/Spinner'
import { useParams } from "react-router-dom";
import { useAxios } from "../api/axiosInstance";

const PinPage = () => {

const { id } = useParams();
const api = useAxios();
const [pin, setPin] = useState(null);
const [loading, setLoading] = useState(true);
const [pins, setPins] = useState([]);
const [error, setError] = useState(null);



useEffect(() => {
  const fetchPin = async () => {
    try {
      const res = await api.get(`/pin/${id}`);
      setPin(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchPin();
}, [api, id]);


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


  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [accounts, setAccounts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [openDropdownActions, setOpenDropdownActions] = useState(null);
  const [pinDropdown, setPinDropdown] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
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
    const handleClickOutside = e => {
      if (!e.target.closest('.create')) setIsCreateOpen(false);
      if (!e.target.closest('.notifications')) setShowNot(false);
      if (!e.target.closest('.messages')) setShowMessages(false);
      if (!e.target.closest('.settings')) setShowSettings(false);
      if (!e.target.closest('.accounts')) setAccounts(false);
      if (!e.target.closest('.actions-dropdown')) setOpenDropdownActions(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

      if (loading) return <Spinner />;
      if (!pin) return <p>Pin not found</p>;
   return (
      <div>
        <Sidebar setIsCreateOpen={setIsCreateOpen} setShowNot={setShowNot} setShowSettings={setShowSettings} setShowMessages={setShowMessages} />
        {showNavbar && ( <Navbar setAccounts={setAccounts} accounts={accounts} /> )}
        <PinPageMain pins={pins} loading={loading} error={error} pin={pin} openDropdownActions={openDropdownActions} setOpenDropdownActions={setOpenDropdownActions} pinDropdown={pinDropdown} setPinDropdown={setPinDropdown} />
        <Create isCreateOpen={isCreateOpen} />
        <Notifications showNot={showNot} />
        <Accounts accounts={accounts} />
        <Settings showSettings={showSettings} setShowSettings={setShowSettings} />
        <Messages setShowMessages={setShowMessages} showMessages={showMessages} />
      </div>
   )
}
export default PinPage