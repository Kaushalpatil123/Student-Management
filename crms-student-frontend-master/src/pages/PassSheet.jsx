import React, { useEffect } from 'react'
import { setPageTitle } from '../redux/slices/pageTitleSlice';
import { useDispatch } from 'react-redux';
import Header from '../components/layout/Header';

const PassSheet = () => {
  const dispatch = useDispatch()
    useEffect(() => {
    dispatch(setPageTitle("Passing Sheet"));
  }, [dispatch]);
  return (
    <div className='pt-2'>
          {/* <div className="text-[2rem] font-bold pl-4 bg-blue-400 rounded-md">
        <h1 className="text-xxl">This is PassSheet</h1>
      </div> */}
      <Header />
    </div>
  )
}

export default PassSheet