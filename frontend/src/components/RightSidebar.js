import React from 'react';
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className='w-[25%]'>
      <div className="p-2 flex items-center bg-pink-100 rounded-full outline-none">
        <CiSearch size="20px" />
        <input type="text" className='bg-transparent px-2 outline-none' placeholder='Search' />
      </div>
      <div className='p-4 bg-pink-50 rounded-2xl my-3'>
        <h1 className='font-bold text-lg'>Suggestion</h1>
        {
          otherUsers?.map((user) => {
            return (
              <div key={user?._id} className='flex items-center justify-between my-3'>
                <div className='flex'>
                  <div>
                    <Avatar src="https://media.licdn.com/dms/image/v2/D5603AQGFADa2vPQ3xQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704191988308?e=1729123200&v=beta&t=7a8hWKy_pYIQQWpbyqnzSMEk4RReaEiRoDo8VTqIKK8" size="40" round={true} />
                  </div>
                  <div className='ml-2'>
                    <h1 className='font-bold '>{user?.name}</h1>
                    <p className='text-sm'>{`${user?.username}`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className='px-4 py-1 bg-gray-600 text-white rounded-full hover:bg-pink-700'>Profile</button>
                  </Link>
                </div>
              </div>
            )
          })
        }



      </div>

    </div>
  )
}

export default RightSidebar;
