import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';
import store from '../redux/store';

const Profile = () => {
    const { user, profile } = useSelector((store) => store.user);
    const { id } = useParams();
    useGetProfile(id);
    const dispatch = useDispatch()

    const followAndUnfollowHandler = async () =>{
        if(user.following.includes(id)){
            // unfollow
             try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
             } catch (error) {
                toast.error(error.response.data.message);
                console.log(error)
             }
        }else {
            // follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
             } catch (error) {
                toast.error(error.response.data.message);
                console.log(error)
             }
        }
    }

    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>Monish</h1>
                        <p className='text-gray-500 text-sm'>0 post</p>
                    </div>
                </div>
                <img src='https://media.licdn.com/dms/image/v2/D5616AQHBXkeH-_4MKg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1704190577230?e=1729123200&v=beta&t=s1jrTyZL_zvq2JMn86ud20qsdDiHQW4xHl_sNzMD97I' alt='banner' />
                <div className='absolute top-40 border-4 border-white ml-2 rounded-full'>
                    <Avatar src="https://media.licdn.com/dms/image/v2/D5603AQGFADa2vPQ3xQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704191988308?e=1729123200&v=beta&t=7a8hWKy_pYIQQWpbyqnzSMEk4RReaEiRoDo8VTqIKK8" size="120" round={true} />
                </div>
                <div className='text-right m-4 '>
                    {
                        profile?._id !== user?._id ? (
                            <button className='px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-200'>Edit Profile</button>
                        ) :(
                            <button onClick={followAndUnfollowHandler} className='bg-black px-4 py-1 rounded-full text-white'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                    
                </div>
                <div className='m-6'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>
                <div className='m-2 text-sm'>
                    <p>Intern at Smart Bridge || Ex-Intern at Octanet Service Private Limited || Ex-Intern at InternPe || Student at AKTU || C / C++ || Python || Web Development || HTML || CSS || Javascript || GSAP || SheryJS</p>
                </div>
            </div>
        </div>
    )
}

export default Profile

