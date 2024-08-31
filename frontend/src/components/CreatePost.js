import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector(store => store.user);
  const {isActive} = useSelector(store => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {

    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  }
  
  const forYouHandler = () => {
      dispatch(getIsActive(true))
  }

  const followingHandler = () => {
      dispatch(getIsActive(false))
  }
  
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border border-pink-300">
          <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-pink-500" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-300 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg">All Tweet</h1>
          </div>
          <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-pink-500" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-300 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg">Following Tweet</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar src="https://media.licdn.com/dms/image/v2/D5603AQGFADa2vPQ3xQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704191988308?e=1729123200&v=beta&t=7a8hWKy_pYIQQWpbyqnzSMEk4RReaEiRoDo8VTqIKK8" size="40" round={true} />
            </div>
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full outline-none border-none text-xl ml-2" type="text" placeholder="What is happening?" />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
              <FaImages size="20px" />
            </div>
            <button onClick={submitHandler} className="px-4 py-1 text-lg text-white text-right bg-pink-400 hover:bg-pink-700 border-none rounded-full">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;


