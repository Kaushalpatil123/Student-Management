import React from 'react'
import { useSelector } from 'react-redux';
import Logout from '../features/Logout';

const Header = () => {
      const { title } = useSelector((state) => state.pageTitle);

  return (
    <div>
         <div className="flex  justify-between font-bold pl-4 bg-blue-600 rounded-md">
          <div className='flex items-center'>
           <h1 className="text-xl sm:text-xxl text-white ">{title}</h1>
          </div>
          <div>
            <Logout />
          </div>
      </div>
    </div>
  )
}

export default Header