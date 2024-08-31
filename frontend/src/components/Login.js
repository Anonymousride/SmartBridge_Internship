import React, { useState } from 'react';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { getUser } from '../redux/userSlice';

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
      }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });

        if(res.data.success){
            setisLogin(true);
            toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  }


  const loginSignupHandler = () => {
    setisLogin(!isLogin);
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5 rounded-full' width={"350px"} src='https://cdnb.artstation.com/p/assets/images/images/053/422/075/large/andrea-thomas-nightshade-logo.jpg?1662154713' alt='Logo' />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-5xl'>Post you want...</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "SignUp"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[70%] px-3 py-1 rounded-full'>
            {
              !isLogin && (<>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='outline-blue-500 border border-gray-500 px-4 py-2 rounded-full my-1' />
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='outline-blue-500 border border-gray-500 px-4 py-2 rounded-full my-1' />
              </>)
            }

            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='outline-blue-500 border border-gray-500 px-4 py-2 rounded-full my-1' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-blue-500 border border-gray-500 px-4 py-2 rounded-full my-1' />
            <button className='border-none px-4 py-1 rounded-full hover:text-white my-3 bg-[#1D9BF0]'>{isLogin ? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Don't have an account?" : "Already have an account?"} <span className='font-bold text-blue-500 cursor-pointer hover:underline' onClick={loginSignupHandler}>{isLogin ? "SignUp" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

