// src/pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {

const navigate = useNavigate()

const ToLogin = ()=>{
  navigate('/login')
}

  return (
    <section className="bg-white py-10 px-6 min-h-screen flex items-center">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text */}
        <div className=" text-center md:text-left">
          <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Go Home
            </Link>
            <Link
            onClick={ToLogin}
              to="/login"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>

    
      </div>
    </section>
  );
};

export default NotFound;
