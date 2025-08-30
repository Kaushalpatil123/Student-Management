import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/slices/pageTitleSlice";
import Header from "../layout/Header";
import { fetchSubjects } from "../../redux/slices/subjectSlice";
import {
  addTeacher,
  fetchTeachers,
  updateTeacher,
} from "../../redux/slices/teacherSlice";
import { ButtonSyle } from "../../Utils/Button";
import { TextCursor } from "lucide-react";
import { ClipboardX, ClipboardPen } from "lucide-react";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { useSnackbar } from "notistack";

const AddTeacher = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(setPageTitle("Add Teacher"));
  }, [dispatch]);
  const { teachers } = useSelector((state) => state.teachers);
  const { subjects } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
  }, [dispatch]);


  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [selectedSubjects, setSelectedSubject] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const dropdownRef = useRef(null);
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
  
    const validateEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
      return emailRegex.test(value);
    };
  
    const handleChange = (e) => {
      const value = e.target.value;
      setEmail(value);
  
      if (value === "") {
        setError("Email is required.");
      } else if (!validateEmail(value)) {
        setError("Invalid email format.");
      } else {
        setError("");
      }
    };

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleTableDropdown = () => setIsTableOpen((prev) => !prev);

  const handleOptionChange = (option) => {
    setSelectedSubject((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateFields = (fields) => {
    const missingFields = [];

    for (const [label, value] of Object.entries(fields)) {
      let isMissing = false;

      if (Array.isArray(value)) {
        // Check if array is empty or contains only empty strings
        isMissing = value.length === 0 || value.every((item) => !item.trim());
      } else {
        // Check for empty string, null, undefined
        isMissing = !value;
      }

      if (isMissing) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      const message =
        missingFields.length > 2
          ? "Please fill all details"
          : `Please Enter ${missingFields.join(", ")}`;

      enqueueSnackbar(message, { variant: "error" });
      return false;
    }

    return true;
  };

  const handleTeacherSubmit = async () => {
    const isValid = validateFields({
      "First Name": fname,
      "Subject Code": lname,
      " Teacher ID": teacherID,
      "Subject ": selectedSubjects,
      "Email": email
    });

    if (!isValid) return; // Stop here if fields are missing

    const teacherData = {
      teachName: fname + " " + lname,
      teacherID: teacherID,
      selectedSubjects: selectedSubjects,
      email: email,
    };
    setLoadingSpinner(true);
    try {
      await dispatch(addTeacher(teacherData));

      enqueueSnackbar(
        <span>
          <b>{fname + " " + lname}</b> Teacher Added
        </span>,
        { variant: "success" }
      );

      fetchTeachers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSpinner(false);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setFname("");
    setLname("");
    setTeacherID("");
    setSelectedSubject([]);
  };

  const [editingId, setEditingId] = useState(null);
  const [editTeacher, setEditTeacher] = useState("");
  const [editTeacherCode, setEditTeacherCode] = useState("");
    const [editTeacherEmail, setEditTeacherEmail] = useState("");
  const [editTeacherSubject, setEditTeacherSubject] = useState([]);

  const handleEditClick = (teacher) => {
    setEditingId(teacher.id);
    setEditTeacher(teacher.teachName);
    setEditTeacherCode(teacher.teacherID);
    setEditTeacherSubject(teacher.selectedSubjects);
    setEditTeacherEmail(teacher.email)
  };

  const handleTableOptionChange = (option) => {
    setEditTeacherSubject((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleSaveEdit = () => {
    const updatedTeachersData = teachers.map((teacher) =>
      teacher.id === editingId
        ? {
            ...teacher,
            teachName: editTeacher,
            teacherID: editTeacherCode,
            selectedSubjects: editTeacherSubject,
            email: editTeacherEmail
          }
        : teacher
    );

    // Get only updated subject
    const updatedTeacher = updatedTeachersData.find(
      (subj) => subj.id === editingId
    );
    setLoadingSpinner(true);

    dispatch(updateTeacher({ id: editingId, teacherData: updatedTeacher })); // ✅ Send only updated subject
    setLoadingSpinner(false);
    enqueueSnackbar("Teacher Details Updated Successfully", {
      variant: "success",
    });
    setEditingId(null);
  };

  const handleDelete = (subject) => {
    const ConfirmDelete = window.confirm("Are you sure you want to delete");
    if (ConfirmDelete) {
      dispatch(subject.id);
    }
  };

  const [searchedTeachersData, setSearchedTeachersData] = useState([]);

  useEffect(() => {
    setSearchedTeachersData([...teachers].reverse());
  }, [teachers]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [itemsPerPage] = useState(10);

  const totalItems = searchedTeachersData.length;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  // Function to calculate the number of pages
  const totalPages = Math.ceil(teachers.length / itemsPerPage);

  // Slice the filteredLeadReport based on the current page
  const SlicedTeachers = searchedTeachersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const query = e.target.value; // Remove leading/trailing spaces
    setSearchQuery(query);
    handleSearchTeacher(query);
    setCurrentPage(1); // ✅ Reset to first page when searching
  };

  const handleSearchTeacher = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();

    const filtered = teachers.filter((item) => {
      return (
        item.teachName.toLowerCase().includes(lowerCaseQuery) ||
        item.teacherID.toLowerCase().includes(lowerCaseQuery) ||
         item.email.toLowerCase().includes(lowerCaseQuery) ||
        item.selectedSubjects.some((subject) =>
          subject.toLowerCase().includes(lowerCaseQuery)
        )
      );
    });

    setSearchedTeachersData(filtered); // ← update the state you're using to render
  };

  return (
    <div >
      <div className="pt-1">
        <Header />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 pb-6">
        <div className="flex flex-col">
          <label>Teacher First Name :</label>
          <input
            type="text"
            placeholder="enter first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-[70%] xs:w-[100%]"
          />
        </div>
        <div className="flex flex-col">
          <label>Teacher Last Name</label>
          <input
            type="text"
            placeholder="enter last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-[70%] xs:w-[100%]"
          />
        </div>
             <div className="flex flex-col">
          <label>Email : </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col">
          <label>Teacher ID Number</label>
          <input
            type="text"
            placeholder="enter id name"
            value={teacherID}
            onChange={(e) => setTeacherID(e.target.value)}
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-[70%] xs:w-[100%]"
          />
        </div>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div className="flex flex-col">
            <label>Select Subjects</label>
            <button
              onClick={toggleDropdown}
              className="text-start truncate border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-[70%] xs:w-[100%] cursor-pointer"
            >
              {selectedSubjects.length > 0
                ? selectedSubjects.join(",")
                : "select subject"}
            </button>

            {isOpen && (
              <div className="absolute top-16 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <ul className="max-h-60 overflow-auto p-2">
                  {subjects.map((option) => (
                    <li
                      key={option}
                      className="flex items-center hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(option.subject)}
                        onChange={() => handleOptionChange(option.subject)}
                        className="mr-2 cursor-pointer"
                      />
                      <span>{option.subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
          <button
            className={`${ButtonSyle} mt-7`}
            onClick={handleTeacherSubmit}
          >
            {loadingSpinner ? <LoadingSpinner /> : "Submit"}
          </button>
        </div>
        <div></div>
      </div>
      <div>
        <div className="flex w-full pt-4">
          <div className="w-[50%]  py-2 flex justify-start items-center">
            <h1 className="font-semibold text-2xl">Teacher List</h1>
          </div>
          <div className="w-[50%] py-2 flex justify-end">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className=" border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400  w-[80%]  sm:w-[40%]"
            />
          </div>
        </div>
        <div>
          <table className="w-full table-auto border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Sr.No
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Teacher Name
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Teacher ID
                </th>
                  <th className="border border-gray-800 px-2 py-1 text-center">
                  Email ID
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Subjects
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Edit
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {searchedTeachersData.length > 0 ? (
                <>
                  {SlicedTeachers.map((teacher, index) => (
                    <tr key={index} className="">
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {editingId === teacher.id ? (
                          <input
                            type="text"
                            value={editTeacher}
                            onChange={(e) => setEditTeacher(e.target.value)}
                            className="border border-gray-500 px-1 bg-white rounded-md"
                          />
                        ) : (
                          teacher.teachName
                        )}
                      </td>
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {editingId === teacher.id ? (
                          <input
                            type="text"
                            value={editTeacherCode}
                            onChange={(e) => setEditTeacherCode(e.target.value)}
                            className="border border-gray-500 px-1 bg-white rounded-md"
                          />
                        ) : (
                          teacher.teacherID
                        )}
                      </td>

                       <td className="border border-gray-800 px-2 py-1 text-center">
                        {editingId === teacher.id ? (
                          <input
                            type="text"
                            value={editTeacherEmail}
                            onChange={(e) => setEditTeacherEmail(e.target.value)}
                            className="border border-gray-500 px-1 bg-white rounded-md"
                          />
                        ) : (
                          teacher.email
                        )}
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center relative">
                        {editingId === teacher.id ? (
                          <div
                            className="relative inline-block text-left"
                            ref={dropdownRef}
                          >
                            <button
                              onClick={toggleTableDropdown}
                              className="text-start min-w-32 max-w-42 cursor-pointer truncate border border-gray-400 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-[100%]"
                            >
                              {editTeacherSubject.length > 0
                                ? editTeacherSubject.join(", ")
                                : "Select subject"}
                            </button>

                            {isTableOpen && (
                              <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                <ul className="max-h-60 overflow-auto p-2">
                                  {subjects.map((option) => (
                                    <li
                                      key={option.subject}
                                      className="flex items-center hover:bg-gray-100"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={editTeacherSubject.includes(
                                          option.subject
                                        )}
                                        onChange={() =>
                                          handleTableOptionChange(
                                            option.subject
                                          )
                                        }
                                        className="mr-2 cursor-pointer truncate"
                                      />
                                      <span>{option.subject}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          teacher.selectedSubjects.join(", ")
                        )}
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center">
                        <div className="flex justify-center items-center h-full">
                          {editingId === teacher.id ? (
                            <>
                              <button
                                onClick={handleSaveEdit}
                                className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded mr-2 cursor-pointer"
                              >
                                {loadingSpinner ? <LoadingSpinner /> : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 bg-black hover:bg-gray-800 text-white rounded cursor-pointer"
                              >
                                {loadingSpinner ? <LoadingSpinner /> : "Close"}
                              </button>
                            </>
                          ) : (
                            <ClipboardPen
                              size={22}
                              className="cursor-pointer hover:bg-slate-200"
                              onClick={() => handleEditClick(teacher)}
                            />
                          )}
                        </div>
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center">
                        <div className="flex justify-center items-center h-full">
                          <ClipboardX
                            size={22}
                            className="cursor-pointer hover:bg-slate-200"
                            onClick={() => handleDelete(teacher)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="text-red-500">
                  <td colSpan={6} className="text-start px-4 py-2">
                    No Data Available 
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination mt-4 flex justify-between items-center bg-white rounded-md p-1">
            <div>
              {totalItems > 0 ? (
                <>
                  Showing {startIdx + 1} to {Math.min(endIdx, totalItems)} out
                  of {totalItems} Entries
                </>
              ) : (
                <>Showing 0 Entries</>
              )}
            </div>
            {totalPages > 1 && (
              <div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`px-4 py-2 mx-2 border rounded ${
                    currentPage === 1 ? "" : "cursor-pointer"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: 3 }, (_, index) => {
                  // Calculate the page number for the current range
                  const pageNumber = currentPage - 1 + index;

                  // Ensure the pageNumber stays within bounds
                  if (pageNumber >= 1 && pageNumber <= totalPages) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-4 py-2 mx-2 border rounded cursor-pointer ${
                          currentPage === pageNumber ? "bg-gray-300" : ""
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }

                  // Return null for out-of-bounds values
                  return null;
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-4 py-2 mx-2 border rounded"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AddTeacher;
