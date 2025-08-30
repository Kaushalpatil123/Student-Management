import React, { useEffect, useState } from "react";
import StudentHistory from "./StudentHistory";
import StudentDocuments from "./StudentDocuments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/slices/studentSlice";
import Standard from "./../Standard/Standard";
import { DateFormat } from "../../Utils/DateFormat";

const StudentDash = () => {
  const dispatch = useDispatch();

  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const { id } = useParams();

  const [selectedStudent, setSelectedStudent] = useState({});

useEffect(() => {
  if (!id || students.length === 0) return;

  const matchedStudent = students.find(
    (student) => String(student.id) === String(id)
  );

  setSelectedStudent(matchedStudent || {}); // fallback to empty object
}, [students, id]);

  const [showHistory, setShowHistory] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  return (
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
              Student Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
              <div>
                <strong>Name: </strong> {selectedStudent.fname + " " + selectedStudent.lname}
              </div>
              <div>
                <strong>Roll No: </strong> {selectedStudent.rollno}
              </div>
              <div>
                <strong>Mother Name: </strong> {selectedStudent.mothername}
              </div>
              <div>
                <strong>Date of Birth: </strong>{" "}
                {DateFormat(selectedStudent.dob)}
              </div>
              <div>
                <strong>Blood Group: </strong>  {selectedStudent.bloodgroup || "N/A"} 
              </div>
              <div>
                <strong>Standard: </strong> {selectedStudent.standard || "N/A"} 
              </div>
              <div className="sm:col-span-2">
                <strong>Subjects: </strong>{" "}
                {selectedStudent.subjects?.join(", ")}
              </div>
              <div className="sm:col-span-2">
                <strong>Address: </strong>  {selectedStudent.address || "N/A"} 
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

      <div className="w-full flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
        <button
          onClick={() => {
            setShowDocuments(!showDocuments);
            setActiveTab(activeTab === "documents" ? null : "documents");
          }}
          className={`flex-1 min-w-[150px] px-2 py-2 rounded-md text-center transition 
      ${
        activeTab === "documents"
          ? "bg-blue-600 text-white cursor-pointer"
          : "bg-blue-400 text-white hover:bg-blue-600 hover:text-white cursor-pointer"
      }`}
        >
          Personal Documents
        </button>

        <button
          onClick={() => {
            setActiveTab(activeTab === "history" ? null : "history");
            setShowHistory(!showHistory);
          }}
          className={`flex-1 min-w-[150px] px-2 py-2 rounded-md text-center transition 
      ${
        activeTab === "history"
          ? "bg-blue-600 text-white cursor-pointer"
          : "bg-blue-400 text-white hover:bg-blue-600 hover:text-white cursor-pointer"
      }`}
        >
          Academic History
        </button>

        <button
          onClick={() => setActiveTab("message")}
          className={`flex-1 min-w-[150px] px-2 py-2 rounded-md text-center transition 
      ${
        activeTab === "message"
          ? "bg-blue-600 text-white cursor-pointer"
          : "bg-blue-400 text-white hover:bg-blue-600 hover:text-white cursor-pointer"
      }`}
        >
          Send Message
        </button>
      </div>

      {activeTab === "history" && <StudentHistory />}
      {activeTab === "documents" && <StudentDocuments />}
    </div>
  );
};

export default StudentDash;
