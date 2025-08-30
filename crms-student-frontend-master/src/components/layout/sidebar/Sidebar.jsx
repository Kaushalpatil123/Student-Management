// Sidebar.jsx
import React, {  useState } from "react";
import {
  Menu,
  X,
  UserPlus,
  FolderOpen,
  ChevronUp,
  ChevronDown,
  UserCog,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const userLevel = localStorage.getItem('role') 


  const menuItems = [
    { 
      role:["L1"],
      name: "Add Student",
      icon: <UserPlus size={20} />,
      link: "/registration",
    },
    {
      role:["L1"],
      name: "Student Record",
      icon: <FolderOpen size={20} />,
      link: "/student-list",
    },
    {
      role:["L1"],
      name: "Add Teacher",
      icon: <FolderOpen size={20} />,
      link: "/add-teacher",
    },
    {
      role:["L1"],
      name: "Add Subject",
      icon: <FolderOpen size={20} />,
      link: "/add-subject",
    },
    {
      role:["L1"],
      name: "Add Standard", 
      icon: <FolderOpen size={20} />,
       link: "/class" },
    {
      role:["L1"],
      name: "Teacher Dash",
      icon: <FolderOpen size={20} />,
      link: "/dashboard",
    },
    {
      role:["L2"],
      name: "Student Dash",
      icon: <FolderOpen size={20} />,
      link: "/student-dashboard",
    },
      {
      role:["L2"],
      name: "Upload Documents",
      icon: <FolderOpen size={20} />,
      link: "/upload-documents",
    },
       {
      role:["L2"],
      name: "Profile",
      icon: <FolderOpen size={20} />,
      link: "/profile",
    },
    {
      name: "Settings",
      icon: <UserCog size={20} />,
      children: [
        { role:["L1","L2"], name: "Marksheet", link: "/marksheet" },
        { role:["L1","L2"], name: "passsheet", link: "/passsheet" },
        { role:["L1","L2"], name: "Add Details", link: "/add-details" },
        { role:["L1","L2"], name: "Task Form", link: "/add-task" },
        { role:["L2"], name: "Student", link: "/student" },
      ],
    },
  ];

  return (
    <>
      <div className="md:hidden flex justify-between items-center bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Student Management </h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X size={28} className="cursor-pointer" />
          ) : (
            <Menu size={28} className="cursor-pointer" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 flex justify-between bg-blue-600 text-white font-bold text-base md:text-xl">
          <div>Student Management</div>
          <div className="md:hidden">
            <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
          </div>
        </div>

        <ul className="p-4 space-y-4 flex flex-col items-start">
          {menuItems  .filter((item) => {
    return !item.role || item.role.includes(userLevel);
  }).map((item, index) => (
            <div key={index} className="w-full">
              {/* If item has submenu */}
              {item.children ? (
                <>
                  <div
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                    className="flex justify-between items-center px-2 py-2 rounded-lg hover:bg-blue-100 cursor-pointer w-full"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-gray-800 text-sm">{item.name}</span>
                    </div>
                    <div>
                      {openMenu === index ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </div>
                  </div>

                  {/* Show submenu if open */}
                  {openMenu === index && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.filter((child) => !child.role || child.role.includes(userLevel)).map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            to={child.link}
                            onClick={() => setIsOpen(false)}
                            className="block text-sm text-gray-700 hover:bg-blue-100 p-2 rounded-md"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Regular menu item
                <Link
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-100 cursor-pointer w-full"
                >
                  {item.icon}
                  <span className="text-gray-800 text-sm">{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.3)]  z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
