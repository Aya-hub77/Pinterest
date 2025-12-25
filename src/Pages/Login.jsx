import React, {useState, useEffect} from 'react'
import { BsPinterest } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import { useAuth } from '../Context/useAuth';

const Login = () => {
    const { setAccessToken, setUser } = useAuth();
    const navigate = useNavigate();

const [formData, setFormData] = useState({ email: "",password: "" });
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const getCsrf = async () => {
      const res = await axios.get("http://localhost:5000/csrf-token", { withCredentials: true });
      setCsrfToken(res.data.csrfToken);
    };
    getCsrf();
  }, []);
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
        const res = await axios.post("http://localhost:5000/auth/login", formData, { withCredentials: true, headers: { "X-CSRF-Token": csrfToken } });
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        console.log(res.data);
        alert("Login successful!");
        navigate("/", { replace: true });
    } catch (err) {
        if (err.response?.data?.errors?.length > 0) {
            setError(err.response.data.errors[0].msg);
        } else {
            setError(err.response?.data?.message || "Login failed");
        }
    }
};
  useEffect(() => {
    document.title = "Login - Pinterest";
  }, []);

   return (
      <div className='login'>
         <BsPinterest className='icon' />
         <h2>Welcome Back</h2>
         <form method="post" onSubmit={handleSubmit}>
            <input type="email" onChange={handleChange} name="email" placeholder='Email' required />
            <input type="password" onChange={handleChange} name="password" placeholder='Password' required />
            <button>Log in</button>
            <p className='switch'>Don't have an account? <Link to="/signup" className='link'>Sign up</Link></p>
         </form>
         {error && <div className="error-message">{error}</div>}
      </div>
   )
}
export default Login