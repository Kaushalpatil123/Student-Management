import React from 'react'

const StudentData = () => {
  return (
    <div className='pt-2'>
              <div className="font-bold bg-blue-400 pl-4 rounded-md">
        <h1 className="text-[2rem]">Please Fill Your Data</h1>
      </div>
      <div className="flex w-full pt-4 gap-6">
        <div className="w-[50%] space-y-1">
          <h2>Student Name: FlatMap Array</h2>
          <h2>Roll No: 3667</h2>
          <h2>Mother's Name: Shital</h2>
      
        </div>
        <div className="w-[50%] gap-2 space-y-1">
            <h2>Date Of Birth: 12 May 2004</h2>
          <h2>PRN No : 7848848848383</h2>
          <h2>College Name : Inix college of Computer Science</h2>
        </div>
      </div>
    </div>
  )
}

export default StudentData