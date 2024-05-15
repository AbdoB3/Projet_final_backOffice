import React, { useState } from 'react';
import '../../../assets/style/login.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat,faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/admin/login', { email, password });
      const token = response.data;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token)
      console.log('Login successful. Token:', token);
      message.success(`Welcome to the ${decodedToken.role} dashboard`)
      navigate('/');
    } catch (error) {
      message.error('Invalid Mail or Password')
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <section className="relative w-full h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: "url('src/assets/images/sign2.jpg')" }}>
     
        <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay */}
        
        <div className="flex justify-center items-center px-6 py-8 mx-auto h-full">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4 md:space-y-6 sm:p-8 z-10 relative" style={{ maxWidth: "500px", width: "100%" }}> {/* Elargi le formulaire */}
          <div className="logo flex justify-center items-center">
                    <FontAwesomeIcon icon={faHeartbeat} className="text-3xl mr-2" style={{ color: ' navy' }} beat />
                    <span className="font-bold text-2xl" style={{ color: '#395886' }}>Consulta</span>
                    <span className="font-bold text-2xl text-cons-light" style={{ color: '#5e8cc9' }}>Med</span>
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in To Your Account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-md">
                    <FontAwesomeIcon icon={faEnvelope} className="text-md mx-3 text-gray-600 " />
                    <input type="email" name="email" id="email" onChange={handleUsernameChange} className="bg-gray-50 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div> 
               </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-md">
                    <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-gray-600" />
                      <input type="password" name="password" id="password" onChange={handlePasswordChange} className="bg-gray-50 text-gray-900 sm:text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
                  </div> 
                 </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <Link to="/ForgotPassword">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password ?</a>
                  </Link>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600">Sign in</button>
              </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
