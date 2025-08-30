import React from 'react'

const StudentHistory = () => {

    const students = [
  { id: 1, academicYear: "2020-2021", name: "Pop", rollNo: "E4663", standard: "10th Std" },
  { id: 2, academicYear: "2019-2020", name: "Max", rollNo: "F5821", standard: "9th Std" },
    { id: 2, academicYear: "2018-2019", name: "Max", rollNo: "F5821", standard: "8th Std" },
  { id: 2, academicYear: "2017-2018", name: "Max", rollNo: "F5821", standard: "7th Std" },

];

  return (
    <div className='bg-white border border-gray-300 rounded-md shadow-sm p-4 mt-3'>
         
<div className="mt-1 grid gap-4">
  {students.map((student) => (
    <div
      key={student.id}
      className="hover:bg-blue-50 cursor-pointer transition border border-gray-200 p-2 rounded-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 text-gray-800">
        <div>
          <span className="font-semibold">Academic Year:</span> {student.academicYear}
        </div>
     
        <div>
          <span className="font-semibold">Roll No:</span> {student.rollNo}
        </div>
        <div>
          <span className="font-semibold">Standard:</span> {student.standard}
        </div>
           {/* <div>
          <span className="font-semibold">Name:</span> {student.name}
        </div> */}
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default StudentHistory