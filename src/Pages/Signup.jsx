import React, {useState, useEffect} from 'react'
import { BsPinterest } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import axios from 'axios';
import { useAuth } from '../Context/useAuth';

const Signup = () => {
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useAuth();

const [formData, setFormData] = useState({username: "", email: "", password: "" });
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
        const res = await axios.post("http://localhost:5000/auth/signup", formData, { withCredentials: true, headers: {"X-CSRF-Token": csrfToken}, });
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        console.log(res.data);
        alert("Signup successful!");
        navigate("/", { replace: true });
    } catch (err) {
        if (err.response?.data?.errors?.length > 0) {
            setError(err.response.data.errors[0].msg);
        } else {
            setError([{ msg: err.response?.data?.message || "Signup failed" }]);
        }
    }
};
  useEffect(() => {
    document.title = "Signup - Pinterest";
  }, []);

   return (
      <div className='signup'>
         <BsPinterest className='icon' />
         <h2>Welcome to Pinterest</h2>
         <form method="post" onSubmit={handleSubmit}>
            <div>
            <input type="text" onChange={handleChange}  name="username" placeholder='Username' required />
            <input type="email" onChange={handleChange} name="email" placeholder='Email' required />
            <input type="password" onChange={handleChange} name="password" placeholder='Password' required />
            </div>
            <p className='agreement'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
            <button>Sign up</button>
            <p className='switch'>Have an account? <Link to="/login" className='link'>Log in</Link></p>
         </form>
      {error && <div className="error-message">{error}</div>}
      </div>
   )
}
export default Signup