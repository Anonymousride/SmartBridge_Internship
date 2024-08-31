import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/constant";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);  
      console.log(error);
    }
  };
  return (
    <div className="border border-pink-300">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://media.licdn.com/dms/image/v2/D5603AQGFADa2vPQ3xQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704191988308?e=1729123200&v=beta&t=7a8hWKy_pYIQQWpbyqnzSMEk4RReaEiRoDo8VTqIKK8"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-sm text-pink-400 ml-1">
                {`@${tweet?.userDetails[0]?.username} . ${timeSince(tweet?.createdAt)}`}
              </p>
            </div>
            <div>
              <p className="text-pink-600">{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-300 rounded-full cursor-pointer">
                  <FaRegComment size="18px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:bg-red-500 rounded-full cursor-pointer"
                >
                  <FaRegHeart size="18px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <FaRegBookmark size="18px" />
                </div>
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:bg-red-400 rounded-full cursor-pointer">
                    <MdDeleteOutline size="18px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;


