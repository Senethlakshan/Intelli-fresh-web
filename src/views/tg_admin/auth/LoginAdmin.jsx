import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../../assets/img/tg/ilogo.png';
import img from '../../../assets/img/tg/1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navigate based on the user role
        switch (data.user.role) {
          case 'admin':
          case 'content manager':
            navigate('/admin/default');
            break;
          case 'farmer':
            navigate('/farmer/dashbord');
            break;
          case 'company manager':
            navigate('/manager/dashboard');
            break;
          case 'quality inspector':
            navigate('/inspector/dashboard');
            break;
          case 'distributor':
            navigate('/distributor/dashboard');
            break;
          case 'retailer':
            navigate('/retailer/dashboard');
            break;
          case 'consumer':
            navigate('/consumer/dashboard');
            break;
          default:
            navigate('/user-dashboard'); // Fallback for undefined roles
            break;
        }

        toast.success('Login successful');
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="w-full max-w-sm bg-white rounded-lg p-6 sm:p-8">
        <div className="text-center">
          <img src={Logo} alt="Company Logo" className="w-24 mx-auto mb-4 rounded-lg" />
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-black mb-7">ADMIN PORTAL</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <input
              className="pl-2 outline-none border-none w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="block w-full bg-green-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
          <Link to='/forget-password'>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password?</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
