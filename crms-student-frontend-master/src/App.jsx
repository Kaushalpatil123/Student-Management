import React from 'react';
import Sidebar from './components/layout/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import HomePage from './website/HomePage';

function App() {
  return (

    <>
    <HomePage />
     <div className="h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:w-3/4 h-full p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
    
    </>
  );
}

export default App;

