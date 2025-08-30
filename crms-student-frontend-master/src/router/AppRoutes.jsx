import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "./../config/auth/Login";
import Register from "./../config/auth/Register";
import NavbarLayout from "../components/layout/NavbarLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import TaskForm from "../components/Task/TaskForm";
import PassSheet from "./../pages/PassSheet";
import StudentMarksheet from "./../pages/StudentMarksheet";
import StudentDetails from "./../pages/StudentDetails";
import RecordData from "../components/AdmissionDept/RecordData";
import Registration from "../components/AdmissionDept/Registration";
import AddTeacher from "../components/TeacherDept/AddTeacher";
import AddSubject from "../components/SubjectDept/AddSubject";
import EditStudent from "../components/AdmissionDept/EditStudent";
import TeacherDash from "../components/TeacherDept/TeacherDash";
import Standard from "../components/Standard/Standard";
import StudentDash from "../components/student/StudentDash";
import NotFound from "../Utils/NotFound";
import SetPassword from "../config/auth/SetPassword";
import StudentDashbaord from "../components/student/StudentDashbaord";
import StudentUploadDocuments from "../components/student/StudentUploadDocuments";
import ProfileEditForm from "../components/student/ProfileEditForm";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="set-passward/:token" element={<SetPassword />} />
        {/* Root Home Page with Navbar only */}
        <Route path="/" element={<NavbarLayout />}></Route>
        <Route path="*" element={<NotFound />} />

        {/* Protected Dashboard Routes with Sidebar */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="registration" element={<Registration />} />
          <Route path="student-list" element={<RecordData />} />
          <Route path="student-list/edit/:id" element={<EditStudent />} />
          <Route path="add-task" element={<TaskForm />} />
          <Route path="passsheet" element={<PassSheet />} />
          <Route path="marksheet" element={<StudentMarksheet />} />
          <Route path="add-details" element={<StudentDetails />} />
          <Route path="add-teacher" element={<AddTeacher />} />
          <Route path="add-subject" element={<AddSubject />} />
          <Route path="dashboard" element={<TeacherDash />} />
           <Route path="student-dashboard" element={<StudentDashbaord />} />
          <Route path="class" element={<Standard />} />
          <Route path="student/:id" element={<StudentDash />} />
           <Route path="upload-documents" element={<StudentUploadDocuments />} />
            <Route path="profile" element={<ProfileEditForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
