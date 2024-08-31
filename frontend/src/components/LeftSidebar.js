import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaRegBookmark } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const LeftSidebar = () => {
  const {user} = useSelector(store=>store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () =>{
        try {
           const res = await axios.get(`${USER_API_END_POINT}/logout`);
           dispatch(getUser(null));
           dispatch(getOtherUsers(null));
           dispatch(getMyProfile(null));
           navigate('/login');
           toast.success(res.data.message);
        } catch (error) {
          console.log(error);
        }
  }
  return (
    <div className='w-[20%] '>
      <div className='border border-pink-400 rounded-2xl p-2'>
         <div>
            <img className='ml-5 rounded-full' width={"45px"} src='https://cdnb.artstation.com/p/assets/images/images/053/422/075/large/andrea-thomas-nightshade-logo.jpg?1662154713' alt='Logo'></img>
         </div>
         <div className='my-4'>
            <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-pink-200 hover:cursor-pointer rounded-full'>
                <div><FaHome size="24px"/></div>
                <h1 className='font-bold text-lg ml-2'>Home</h1>
            </Link>
            <div className='flex items-center my-2 px-4 py-2 hover:bg-pink-200 hover:cursor-pointer rounded-full'>
                <div><IoMdNotifications size="24px"/></div>
                <h1 className='font-bold text-lg ml-2'>Notification</h1>
            </div>
            <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-pink-200 hover:cursor-pointer rounded-full'>
                <div><ImProfile size="24px"/></div>
                <h1 className='font-bold text-lg ml-2'>Profile</h1>
            </Link>
            <div className='flex items-center my-2 px-4 py-2 hover:bg-pink-200 hover:cursor-pointer rounded-full'>
                <div><FaRegBookmark size="24px"/></div>
                <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
            </div>
            <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-pink-200 hover:cursor-pointer rounded-full'>
                <div><RiLogoutCircleRLine size="24px"/></div>
                <h1 className='font-bold text-lg ml-2'>Logout</h1>
            </div>
            <button className='px-4 py-2 border-none text-md bg-pink-400 hover:bg-pink-700 w-full rounded-full text-white font-bold'>Post</button>
         </div>
      </div>
    </div>
  )
}

export default LeftSidebar

