import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Logout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const localName = localStorage.getItem("name");
  const localEmail = localStorage.getItem("email");

  const Role = () => {
    if (user) {
      localStorage.getItem("role") || user.role === "L2";
      return "Student";
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleLogout = () => {
    dispatch(logout()); // clears user from Redux
    localStorage.clear();
    setShowPopup(false);
    navigate("/login"); // or use your route
  };

  return (
    <div className="flex justify-between items-center bg-blue-600 rounded-md p-2 text-white text-2xl relative">
      {/* Settings Icon Wrapper */}
      <div className="relative" ref={containerRef}>
        <button
          onClick={() => setShowPopup(!showPopup)}
          className="flex items-center space-x-2 hover:bg-blue-500 px-3 py-1 rounded cursor-pointer"
        >
          <span className=" text-white font-medium text-base">
            <UserLock />
          </span>
        </button>

        {/* Popup Dropdown */}
        {showPopup && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-md">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={"https://i.pravatar.cc/100"}
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover border border-orange-300"
                />
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    {localName || user.name}
                  </h3>
                  <p className="text-sm text-black"> {Role()}</p>
                  <p className="text-sm text-black">
                    {" "}
                    {localEmail || user.email}
                  </p>
                </div>
              </div>

              {/* Logout Text */}
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6 text-[16px]">
                Are you sure you want to log out of your account?
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-[16px]  bg-white hover:bg-blue-600 hover:text-white rounded-lg cursor-pointer text-gray-700 border border-gray-300  transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-[16px] cursor-pointer rounded-lg  bg-blue-500 hover:bg-blue-700 text-white hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
