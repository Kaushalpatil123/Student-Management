import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "../../redux/slices/studentSlice";
import { ClipboardX, ClipboardPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { setPageTitle } from "../../redux/slices/pageTitleSlice";
import Header from "../layout/Header";
import { DateFormat } from "../../Utils/DateFormat";

const RecordData = ({ reloadData }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Student List"));
  }, [dispatch]);

  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch, reloadData]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id))
        .then(() => {
          enqueueSnackbar("Student deleted successfully", {
            variant: "success",
            autoHideDuration: 1500,
          });
          // Optionally refresh student list
        })
        .catch((err) => {
          enqueueSnackbar("Error deleting student", {
            variant: "error",
            autoHideDuration: 1500,
          });
          console.error(err);
        });
    }
  };

  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    setStudentData([...students].reverse()); // Initialize with all students
  }, [students]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [itemsPerPage] = useState(10);

  const totalItems = studentData.length;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  // Function to calculate the number of pages
  const totalPages = Math.ceil(students.length / itemsPerPage);

  // Slice the filteredLeadReport based on the current page
  const SlicedStudents = studentData.slice(
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

    const filtered = students.filter((item) => {
      return (
        item.address.toLowerCase().includes(lowerCaseQuery) ||
        item.bloodGroup.toLowerCase().includes(lowerCaseQuery) ||
        item.dob.toLowerCase().includes(lowerCaseQuery) ||
        item.fullName.toLowerCase().includes(lowerCaseQuery) ||
        item.motherName.toLowerCase().includes(lowerCaseQuery) ||
        item.rollNo.toLowerCase().includes(lowerCaseQuery)

        // item.selectedSubjects.some((subject) =>
        //   subject.toLowerCase().includes(lowerCaseQuery)
        // )
      );
    });

    setStudentData(filtered); // ← update the state you're using to render
  };

  return (
    <div className="w-full pt-2">
      <Header />

      <div className="">
        <div className="flex w-full pt-1">
          <div className="w-[50%]  py-2 flex justify-start items-center">
            <h1 className="font-semibold text-2xl">Student List</h1>
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
        <div className="overflow-x-auto w-full ">
          <table className="max-w-[1200px]  sm:w-full sm:table-fixed border-2 border-gray-800 scroll-auto">
            <thead className="border-[1px] border-gray-800">
              <tr className="bg-gray-200 w-full">
                <th className="border-[1px] border-gray-800 p-1 w-[5.1%]">
                  Sr.No
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[10.1%]">
                  Standard
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[9.1%]">
                  Roll No
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[13.1%]">
                  Name
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[9.1%]">
                  Mother Name
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[16.1%]">
                  Email
                </th>

                <th className="border-[1px] border-gray-800 p-1 w-[9.1%]">
                  View
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[7%]">
                  Edit
                </th>
                <th className="border-[1px] border-gray-800 p-1 w-[7%]">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className=" border-[1px] border-gray-800">
              {Array.isArray(SlicedStudents) &&
                SlicedStudents.map((user, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate(`/student/${user.id}`)}
                    className="text-center hover:cursor-pointer hover:bg-slate-200"
                    title="click to view details"
                  >
                    <td className="border-[1px] border-gray-800 px-1 w-[5.1%]">
                      {index + 1}
                    </td>
                    <td className="border-[1px] border-gray-800 px-1 w-[9.1%]">
                      {user.standard}
                    </td>
                    <td className="border-[1px] border-gray-800 px-1 w-[9.1%]">
                      {user.rollno}
                    </td>
                    <td className="border-[1px] border-gray-800 px-1 w-[13.1%]">
                      {user.fname + " " + user.lname}
                    </td>
                    <td className="border-[1px] border-gray-800 px-1 w-[9.1%]">
                      {user.mothername}
                    </td>

                    <td className="border-[1px] border-gray-800 px-1 w-[16.1%] text-break flex-wrap">
                      {user.email}
                    </td>
                    <td className="border-[1px] border-gray-800 px-1 w-[9.1%]">
                      <button
                        onClick={() => navigate(`/student/${user.id}`)}
                        className="bg-blue-500 hover:bg-blue-800 text-white rounded-md px-1 text-sm cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                    <td
                      onClick={() => navigate(`/student-list/edit/${user.id}`)}
                      className="border-[1px] border-gray-800 p-1 w-[7%]"
                      title="click to edit details"
                    >
                      <div className="flex justify-center items-center h-full">
                        <ClipboardPen
                          size={22}
                          className="cursor-pointer hover:bg-slate-200"
                        />
                      </div>
                    </td>
                    <td
                      className="border-[1px] border-gray-800 px-1 w-[7%]"
                      title="click to delete student"
                    >
                      <div className="flex justify-center items-center h-full">
                        <ClipboardX
                          size={22}
                          className="cursor-pointer hover:bg-slate-200"
                          onClick={() => handleDelete(user.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
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
      </div>
    </div>
  );
};

export default RecordData;
