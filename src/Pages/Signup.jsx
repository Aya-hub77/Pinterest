import React, {useState, useEffect} from 'react'
import { BsPinterest } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Css.css';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/signup", {username, email, password}, { withCredentials: true } );
    console.log(res);
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Error uploading form data:", error);
    setError(error.response?.data?.message || "Signup failed");
  }
}

  useEffect(() => { document.title = "Signup - Pinterest"; }, []);

   return (
      <main className='signup'>
        <form onSubmit={handleSubmit}>
            <BsPinterest className="logo" />
            <h2>Welcome to Pinterest</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <p className='agreement'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
            <button>Sign up</button>
            {error && <p className="error">{error}</p>}
            <p>Have an account? <Link to="/login" className='link'>Log in</Link></p>
         </form>
      </main>
   )
}
export default Signup