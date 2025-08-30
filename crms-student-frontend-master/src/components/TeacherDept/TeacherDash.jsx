import React, { useEffect } from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Users, BookUser, NotebookTabs  } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/slices/studentSlice";
import { fetchSubjects } from "../../redux/slices/subjectSlice";
import { fetchTeachers } from "../../redux/slices/teacherSlice";
import { useNavigate } from "react-router-dom";
const TeacherDash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const { subjects } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className="pt-1">
      <div className="flex">
        <div className="w-[50%] flex justify-start items-center font-bold text-xl">
          Dashboard
        </div>
        <div className="w-[50%] py-2 flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            className=" border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400  w-[80%]  sm:w-[40%]"
          />
        </div>
      </div>
      <div className="pt-3 flex flex-col md:flex-row w-full gap-4">
        {/* Card 1 */}
        <div 
        onClick={()=> navigate('/student-list')}
        className="flex w-full md:w-1/4 items-center gap-3 p-4 border border-gray-300 hover:border-gray-500 cursor-pointer rounded-lg ">
          <div className="w-1/4 flex justify-center text-black">
            <Users size={28} />
          </div>
          <div className="w-3/4">
            <h1 className="text-sm text-gray-500 text-start">
              {" "}
              Total Students
            </h1>
            <h1 className="text-lg font-bold text-gray-800 text-start">
              {students.length}
            </h1>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex w-full md:w-1/4 items-center gap-3 p-4 border border-gray-300 hover:border-gray-500 cursor-pointer rounded-lg">
          <div className="w-1/4 flex justify-center text-black">
            <BookUser size={28} />
          </div>
          <div className="w-3/4">
            <h1 className="text-sm text-gray-500 text-start">Total Teachers</h1>
            <h1 className="text-lg font-bold text-gray-800 text-start">
              {teachers.length}
            </h1>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex w-full md:w-1/4 items-center gap-3 p-4 border border-gray-300 hover:border-gray-500 cursor-pointer rounded-lg">
          <div className="w-1/4 flex justify-center text-black-600">
            <NotebookTabs size={28} />
          </div>
          <div className="w-3/4">
            <h1 className="text-sm text-gray-500 text-start">Subjects</h1>
            <h1 className="text-lg font-bold text-gray-800 text-start">
              {subjects.length}
            </h1>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex w-full md:w-1/4 items-center gap-3 p-4 border border-gray-300 hover:border-gray-500 cursor-pointer rounded-lg">
          {/* <div className="w-1/4 flex justify-center text-red-600">
            <ArrowForwardIcon size={28} />
          </div>
          <div className="w-3/4 ">
            <h1 className="text-sm text-gray-500 text-start">
              {"Inward-Flow (Today)"}
            </h1>
            <h1 className="text-lg font-bold text-gray-800 text-start">571</h1>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherDash;
