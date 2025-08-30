import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>

      <section className="bg-gray-100 pt-16 px-6">
  <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
    {/* Left: Text */}
    <div className="md:w-1/2 text-center md:text-left">
      {/* Tagline */}
      <span className="inline-block bg-blue-200 text-blue-800 font-semibold px-4 py-1 rounded-full text-sm mb-4">
        Education • Technology • Track
      </span>

      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 leading-tight mb-6">
        EduTechTrack <span className="text-gray-800">(ETT)</span>
        <br />
        Smart School Management CRM
      </h1>

      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        A next-generation platform to <span className="font-semibold">manage admissions, students, 
        staff, attendance, communication, fees, and reports</span>—all in one 
        seamless CRM built for modern schools. <br />
        Empower your institution with <span className="font-semibold text-blue-600">efficiency, 
        transparency, and growth</span>.
      </p>

      <div className="flex justify-center md:justify-start gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition text-lg font-medium"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition text-lg font-medium"
        >
          Login
        </Link>
      </div>
    </div>

    {/* Right: Hero Image */}
    <div className="md:w-1/2 flex justify-center">
      <img
        src="https://img.freepik.com/free-vector/isometric-cms-concept_23-2148807389.jpg?semt=ais_hybrid&w=740"
        alt="School CRM Dashboard"
        className="w-full max-w-lg rounded-2xl shadow-lg"
      />
    </div>
  </div>
</section>


      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left Side: Big Image */}
<div className="hidden sm:flex md:w-1/2 justify-center">
            <img
              src="https://www.kindpng.com/picc/m/81-813810_transparent-group-of-students-png-college-student-cartoon.png"
              alt="School Management"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side: Features */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">
              Core Features
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Feature Card */}
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4 text-left">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                  alt="Student Management"
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    Student Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Track student admissions, attendance, academics, and reports
                    in one place.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4 text-left">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                  alt="Teacher Management"
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    Teacher Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Manage teacher profiles, subjects, classes, and
                    communication.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4 text-left">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2936/2936631.png"
                  alt="Communication"
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    Communication
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Seamless messaging between teachers, students, and
                    administrators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            Multi-Level Dashboards
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg bg-white">
              {/* <img
                src="manager.png"
                alt="School Manager"
                className="mx-auto mb-4 w-20 h-20"
              /> */}
              <h3 className="text-xl font-semibold mb-2">School Manager</h3>
              <p className="text-gray-600">
                Full control over admissions, staff, fees, and reports.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-white">
              {/* <img
                src="teacher.png"
                alt="Teacher"
                className="mx-auto mb-4 w-20 h-20"
              /> */}
              <h3 className="text-xl font-semibold mb-2">Teacher</h3>
              <p className="text-gray-600">
                Manage classes, attendance, marksheets, and student performance.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-white">
              {/* <img
                src="student.png"
                alt="Student"
                className="mx-auto mb-4 w-20 h-20"
              /> */}
              <h3 className="text-xl font-semibold mb-2">Student</h3>
              <p className="text-gray-600">
                Access timetable, marks, assignments, and communicate with
                teachers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="p-6 bg-white rounded-lg shadow w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                1. Admission
              </h3>
              <p className="text-gray-600">
                Register students and teachers with complete details.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                2. Management
              </h3>
              <p className="text-gray-600">
                Track academics, attendance, and communication seamlessly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow w-full md:w-1/3">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                3. Reports
              </h3>
              <p className="text-gray-600">
                Generate marksheets, performance reports, and analytics
                instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Transform Your School Management Today
        </h2>
        <p className="text-lg mb-6">
          Join hundreds of institutions already using our CRM to simplify
          operations.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </section>
    </>
  );
};

export default HomePage;
