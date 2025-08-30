import React from "react";
import { Eye, Download } from "lucide-react"; // Optional, if using lucide icons

const StudentDocuments = () => {
  const students = [
    {
      id: 1,
      name: "Adesh Dhope",
      documentName: "Aadhaar Card",
      uploadedDate: "12 May 2023, 9:07 PM",
    },
    {
      id: 2,
      documentName: "Pan Card",
      uploadedDate: "12 May 2023, 10:07 PM",
    },
  ];

  return (
    <div className="mt-3 p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Uploaded Documents of {students[0].name}
      </h2>
      <div className="grid gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="border border-gray-200 p-2 rounded-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center text-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-500">Document</p>
                <p className="font-semibold">{student.documentName}</p>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition border border-gray-200 py-1 px-2 rounded-md cursor-pointer">
                  <Eye size={18} /> <span className="text-sm">View</span>
                </button>
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800  transition border border-gray-200 py-1 px-2 rounded-md cursor-pointer">
                  <Download size={18} />{" "}
                  <span className="text-sm">Download</span>
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Uploaded At</p>
                <p className="text-sm">{student.uploadedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDocuments;
