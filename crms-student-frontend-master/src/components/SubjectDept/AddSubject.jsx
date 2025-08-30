import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/slices/pageTitleSlice";
import Header from "../layout/Header";
import { ButtonSyle } from "../../Utils/Button";
import {
  addSubject,
  deleteSubject,
  fetchSubjects,
  updateSubject,
} from "../../redux/slices/subjectSlice";
import { ClipboardX, ClipboardPen } from "lucide-react";
import { useSnackbar } from "notistack";
import LoadingSpinner from "../../Utils/LoadingSpinner";

const AddSubject = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(setPageTitle("Add Subject"));
  }, [dispatch]);

  const { subjects } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const validateFields = (fields) => {
    const missingFields = [];
    for (const [label, value] of Object.entries(fields)) {
      if (!value) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      enqueueSnackbar(`Please Enter ${missingFields.join(" & ")}`, {
        variant: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isValid = validateFields({
      Subject: subject,
      "Subject Code": subjectCode,
    });

    if (!isValid) return; // Stop here if fields are missing

    const SubjectData = { subject, subjectCode };
    setLoadingSpinner(true);
    try {
      await dispatch(addSubject(SubjectData));
      fetchSubjects();
      enqueueSnackbar(
        <span>
          <b>{subject}</b> Subject Added
        </span>,
        { variant: "success" }
      );

      handleCancel();
    } catch (err) {
      console.error(err);
      setLoadingSpinner(false);
    } finally {
      setLoadingSpinner(false);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setSubjectCode("");
    setSubject("");
  };

  const [editingId, setEditingId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editSubjectCode, setEditSubjectCode] = useState("");

  const handleEditClick = (subject) => {
    setEditingId(subject.id);
    setEditSubject(subject.subject);
    setEditSubjectCode(subject.subjectCode);
  };

  const handleSaveEdit = () => {
    const updatedSubjects = subjects.map((subj) =>
      subj.id === editingId
        ? { ...subj, subject: editSubject, subjectCode: editSubjectCode }
        : subj
    );

    const updatedSubject = updatedSubjects.find(
      (subj) => subj.id === editingId
    );
    setLoadingSpinner(true);
    dispatch(updateSubject({ id: editingId, updatedData: updatedSubject })); // ✅ Send only updated subject
    setLoadingSpinner(false);
    setEditingId(null);
  };

  const handleDelete = (subject) => {
    const ConfirmDelete = window.confirm("Are you sure you want to delete");
    if (ConfirmDelete) {
      dispatch(deleteSubject(subject.id));
    }
  };

  const [searchedSubjectsData, setSearchedSubjectsData] = useState([]);

  useEffect(() => {
    setSearchedSubjectsData(subjects);
  }, [subjects]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [itemsPerPage] = useState(10);

  const totalItems = searchedSubjectsData.length;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  // Function to calculate the number of pages
  const totalPages = Math.ceil(subjects.length / itemsPerPage);

  // Slice the filteredLeadReport based on the current page
  const SlicedStudents = searchedSubjectsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (e) => {
    const query = e.target.value; // Remove leading/trailing spaces
    setSearchQuery(query);
    handleSearchStudent(query);
    setCurrentPage(1); // ✅ Reset to first page when searching
  };

  const handleSearchStudent = (query) => {
    const lowerCaseQuery = query.toLowerCase().trim();

    const filtered = subjects.filter((item) => {
      return (
        item.subject.toLowerCase().includes(lowerCaseQuery) ||
        item.subjectCode.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setSearchedSubjectsData(filtered);
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <div className="flex pt-8 gap-4">
          <div>
            <label>Add Subject</label>
            <input
              type="text"
              placeholder="enter teacher name"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[100%] xs:w-[100%]"
            />
          </div>
          <div>
            <label>Add Subject Code</label>
            <input
              type="text"
              placeholder="enter subject code"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              required
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[100%] xs:w-[100%]"
            />
          </div>
        </div>
        <div className="w-[30%] pt-5">
          <button onClick={handleSubmit} className={`${ButtonSyle}`}>
            {loadingSpinner ? <LoadingSpinner /> : "Submit"}
          </button>
        </div>
      </div>

      <div>
        <div className="flex w-full pt-4">
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
        <div>
          <table className="w-full table-auto border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Sr.No
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Subject
                </th>
                <th className="border border-gray-800 px-2 py-1 text-center">
                  Code
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
              {searchedSubjectsData.length > 0 ? (
                <>
                  {SlicedStudents.map((subject, index) => (
                    <tr key={index} className="">
                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {index + 1}
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {editingId === subject.id ? (
                          <input
                            type="text"
                            value={editSubject}
                            onChange={(e) => setEditSubject(e.target.value)}
                            className="border border-gray-500 px-1 bg-white rounded-md"
                          />
                        ) : (
                          subject.subject
                        )}
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center">
                        {editingId === subject.id ? (
                          <input
                            type="text"
                            value={editSubjectCode}
                            onChange={(e) => setEditSubjectCode(e.target.value)}
                            className="border border-gray-500 px-1 bg-white rounded-md"
                          />
                        ) : (
                          subject.subjectCode
                        )}
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center">
                        <div className="flex justify-center items-center h-full">
                          {editingId === subject.id ? (
                            <div className="gap-x-1">
                              <button
                                onClick={handleSaveEdit}
                                className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer mr-1.5 "
                              >
                                {loadingSpinner ? <LoadingSpinner /> : "Save"}
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 bg-black hover:bg-gray-800 text-white rounded cursor-pointer "
                              >
                                Close
                              </button>
                            </div>
                          ) : (
                            <ClipboardPen
                              size={22}
                              className="cursor-pointer hover:bg-slate-200"
                              onClick={() => handleEditClick(subject)}
                            />
                          )}
                        </div>
                      </td>

                      <td className="border border-gray-800 px-2 py-1 text-center">
                        <div className="flex justify-center items-center h-full">
                          <ClipboardX
                            size={22}
                            className="cursor-pointer hover:bg-slate-200"
                            onClick={() => handleDelete(subject)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="text-red-500">
                  <td colSpan={5} className="text-start px-4 py-2">
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
      </div>
    </div>
  );
};

export default AddSubject;
