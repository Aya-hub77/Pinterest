import React, {useState, useEffect} from 'react'
import { BsPinterest } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/Css.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/login", {email, password}, { withCredentials: true } );
    console.log(res);
    navigate("/", { replace: true });
  } catch (error) {
    console.error("Error uploading form data:", error);
    setError(error.response?.data?.message || "Login failed");
  }
}

  useEffect(() => { document.title = "Login - Pinterest"; }, []);

   return (
      <main className='login'>
         <form onSubmit={handleSubmit}>
            <BsPinterest className='logo' />
            <h2>Welcome Back</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button>Log in</button>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <Link to="/signup" className='link'>Sign up</Link></p>
         </form>
      </main>
   )
}
export default Login