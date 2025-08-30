import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/slices/pageTitleSlice";
import Header from "../layout/Header";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { ButtonSyle } from "../../Utils/Button";
import {
  addStandard,
  deleteStandard,
  editStandard,
  getAllStandards,
} from "../../redux/slices/standardSlice";
import { ClipboardX, ClipboardPen } from "lucide-react";

const Standard = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(setPageTitle("Add Class"));
  }, [dispatch]);

  const { standards } = useSelector((state) => state.standard);

  useEffect(() => {
    dispatch(getAllStandards());
  }, [dispatch]);

  const [standard, setStandard] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ renamed
  const [editId, setEditId] = useState(null);
  const [hideEditTable, setHideEditTable] = useState(true);
  const handleEditStandard = (standard) => {
    setStandard(standard.standard);
    setEditId(standard.id);
    setHideEditTable(false);
  };

  const handleSubmit = async () => {
    if (!standard) {
      enqueueSnackbar("Please enter a standard", { variant: "error" });
      return;
    }

    try {
      setIsLoading(true);

      if (!editId) {
        await dispatch(addStandard({ standard }));
        enqueueSnackbar("Standard Added Successfully", { variant: "success" });
        setStandard("");
        dispatch(getAllStandards());
      } else {
        await dispatch(editStandard({ id: editId, updatedData: { standard } }));
        enqueueSnackbar("Standard Updated Successfully", {
          variant: "success",
        });
        setStandard("");
        dispatch(getAllStandards());
        setHideEditTable(true);
        setEditId("");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding standard:", error);
      enqueueSnackbar("Failed to add standard", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setHideEditTable(true);
    setStandard("");
  };

  const handleDeleteStandard = async (standard) => {
    try {
      await dispatch(deleteStandard(standard.id));
      enqueueSnackbar(`${standard.standard} Standard Deleted Successfully `, { variant: "success" });
              dispatch(getAllStandards());
    } catch {
      console.error("failed to delete standard");
    }
  };

  const [searchedStandard, setSearchedStandard] = useState([]);

  useEffect(() => {
    setSearchedStandard(standards);
  }, [standards]);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const [itemsPerPage] = useState(10);

  const totalItems = searchedStandard.length;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  // Function to calculate the number of pages
  const totalPages = Math.ceil(standards.length / itemsPerPage);

  // Slice the filteredLeadReport based on the current page
  const SlicedStandards = searchedStandard.slice(
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

    const filtered = standards.filter((item) => {
      return item.standard.toLowerCase().includes(lowerCaseQuery);
    });

    setSearchedStandard(filtered);
  };

  return (
    <div>
      <Header />

      <div>
        <div className="flex pt-8 gap-4">
          <div>
            <label>{editId ? "Edit Standard" : "Add Standard"}</label>
            <input
              type="text"
              placeholder="enter standard"
              required
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[100%] xs:w-[100%]"
            />
          </div>
        </div>
        <div className="w-full pt-5">
          <button
            onClick={handleSubmit}
            className={`p-1.5 hover:bg-blue-600 bg-blue-400 hover:text-white  text-black rounded-md px-2  cursor-pointer`}
          >
            {isLoading ? <LoadingSpinner /> : "Submit"}
          </button>
          {editId && (
            <button
              onClick={handleCancel}
              className={`p-1.5 hover:bg-blue-600 bg-blue-400 hover:text-white  text-black rounded-md ml-2 px-2 cursor-pointer `}
            >
              {"Close"}
            </button>
          )}
        </div>
      </div>
      {hideEditTable && (
        <>
          {" "}
          <div className="flex w-full pt-4">
            <div className="w-[50%]  py-2 flex justify-start items-center">
              <h1 className="font-semibold text-2xl">Standard List</h1>
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
                    Standard
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
                {SlicedStandards.length > 0 ? (
                  <>
                    {SlicedStandards.map((standard, index) => (
                      <tr key={index} className="">
                        <td className="border border-gray-800 px-2 py-1 text-center">
                          {index + 1}
                        </td>

                        <td className="border border-gray-800 px-2 py-1 text-center">
                          {standard.standard}
                        </td>
                        <td className="border border-gray-800 px-2 py-1 text-center">
                          <div className="flex justify-center items-center h-full">
                            <ClipboardPen
                              className="cursor-pointer"
                              onClick={() => handleEditStandard(standard)}
                            />
                          </div>
                        </td>
                        <td className="border border-gray-800 px-2 py-1 text-center">
                          <div className="flex justify-center items-center h-full">
                            <ClipboardX
                              className="cursor-pointer"
                              onClick={() => handleDeleteStandard(standard)}
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
        </>
      )}
    </div>
  );
};

export default Standard;
