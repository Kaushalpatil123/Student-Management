import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../redux/slices/pageTitleSlice';
import Header from '../components/layout/Header';

const StudentMarksheet = () => {
    const dispatch = useDispatch();
      useEffect(() => {
      dispatch(setPageTitle("Add Student Details"));
    }, [dispatch]);
  return (
    <div className='pt-2'>
              {/* <div className="text-[2rem] font-bold pl-4 bg-blue-400 rounded-md">
        <h1 className="text-xxl">Add Student Marks</h1>
      </div> */}
      <Header />
      
    </div>
  )
}

export default StudentMarksheet