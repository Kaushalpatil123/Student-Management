import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentById } from "../../redux/slices/studentSlice";
import { DateFormat } from "../../Utils/DateFormat";

const StudentDashbaord = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const studentID = localStorage.getItem("id") || user?.id;
  console.log("user", user);
  console.log("user studentID", studentID);

  useEffect(() => {
    dispatch(getStudentById(studentID));
  }, [dispatch, studentID]);

  const { currentStudent } = useSelector((state) => state.students);
  console.log("user currentStudent", currentStudent);

  return (
    <div>
      <div className="min-h-screen  pt-1">
        {/* Header */}
        <header className="bg-white shadow shadow-gray-400 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Shree Vidya Mandir School
              </h1>
              <p className="text-sm text-gray-500">
                Excellence Through Education
              </p>
            </div>
          </div>

          <div className=" bg-white rounded-lg p-4 flex  flex-col-reverse sm:flex-col  lg:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">
                Student Details 111
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                <div>
                  <strong>Name: </strong>{" "}
{(currentStudent.fname || "") + " " + (currentStudent.lname || "") || "N/A"}
                </div>
                <div>
                  <strong>Roll No: </strong> {currentStudent.rollno || "N/A"}
                </div>
                <div>
                  <strong>Mother Name: </strong> {currentStudent.mothername || "N/A"}
                </div>
                <div>
                  <strong>Date of Birth: </strong>{" "}
                  {DateFormat(currentStudent.dob) || "N/A"}
                </div>
                <div>
                  <strong>Sex: </strong>
                  {currentStudent.gender || "N/A"}
                </div>
                <div>
                  <strong>Standard: </strong> {currentStudent.standard || "N/A"}
                </div>
                <div className="sm:col-span-2">
                  <strong>Subjects: </strong>
                  {currentStudent?.subjects
                    ? currentStudent.subjects.join(", ")
                    : "No subjects"}
                </div>
                <div className="sm:col-span-2">
                  <strong>Address: </strong>  {currentStudent.address || "N/A"}
                </div>
              </div>
            </div>
            <div className="flex justify-start md:justify-center ">
              <img
                src="https://i.pravatar.cc/100"
                alt="Adeehs"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-md object-cover border border-gray-400"
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default StudentDashbaord;
