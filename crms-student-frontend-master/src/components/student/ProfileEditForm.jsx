import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentById,
  updateStudent,
} from "../../redux/slices/studentSlice";
import { DateFormat } from "../../Utils/DateFormat";
import { useSnackbar } from "notistack";

const ProfileEditForm = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.auth);
  const studentID = localStorage.getItem("id") || user?.id;
  console.log("user", user);
  console.log("user studentID", studentID);

  useEffect(() => {
    dispatch(getStudentById(studentID));
  }, [dispatch, studentID]);

  const { currentStudent } = useSelector((state) => state.students);
  console.log("currentStudent studentData", currentStudent);

  // Example default user data (could be fetched from API)
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [mothername, setMothername] = useState(null);
  const [fathername, setFathername] = useState(null);
  const [dob, setDOB] = useState(null);
  const [email, setEmail] = useState(null);
  const [bloodgroup, setBloodGroup] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [rollno, setRollno] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [maritialstatus, setMaritialstatus] = useState(null);
  

  const [profilePic, setProfilePic] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setFname(currentStudent.fname);
      setLname(currentStudent.lname);
      setMothername(currentStudent.mothername);
      setFathername(currentStudent.fathername);
      setDOB(currentStudent.dob);
      setEmail(currentStudent.email);
      setBloodGroup(currentStudent.bloodgroup);
      setGender(currentStudent.gender);
      setAddress(currentStudent.address);
      setRollno(currentStudent.rollno);
      setSubjects(currentStudent.subjects);
      setMaritialstatus(currentStudent.maritialstatus)
    } else {
      setFname(currentStudent.fname);
      setLname(currentStudent.lname);
      setMothername(currentStudent.mothername);
      setFathername(currentStudent.fathername);
      setDOB(currentStudent.dob);
      setEmail(currentStudent.email);
      setBloodGroup(currentStudent.bloodgroup);
      setGender(currentStudent.gender);
      setAddress(currentStudent.address);
      setRollno(currentStudent.rollno);
      setSubjects(currentStudent.subjects);
            setMaritialstatus(currentStudent.maritialstatus)
    }
  }, [currentStudent, isEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    const studentData = {
      id:currentStudent.id,
      fname: fname,
      lname: lname,
      mothername: mothername,
      fathername: fathername,
      dob: dob,
      bloodgroup: bloodgroup,
      address: address,
      maritialstatus: maritialstatus,
    };

    try {
      console.log("studentData", studentData);
      await dispatch(updateStudent({ id: currentStudent.id, updatedData: studentData }));
      enqueueSnackbar(
        <span>
          <b>{fname + " " + lname}</b> Student updated
        </span>,
        { variant: "success" }
      );
      dispatch(getStudentById(studentID));
    } catch {
      console.error("error occured while sending data to backend");
    }
    // Send formData to backend via fetch/axios
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Personal Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer px-4 py-2 rounded-md  transition"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        // ===== Editable Form =====
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-1">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 border border-gray-400 rounded-md w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label>First Name:</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label>Last Name:</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label>Mother Name:</label>
              <input
                type="text"
                value={mothername}
                onChange={(e) => setMothername(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label>Father Name:</label>
              <input
                type="text"
                value={fathername}
                onChange={(e) => setFathername(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>

            <div className="flex flex-col">
              <label>Blood Group:</label>
              <select
                value={bloodgroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              >
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label>Civil Status:</label>
              <select
                value={maritialstatus}
                onChange={(e) => setMaritialstatus(e.target.value)}
                className="border border-gray-400 p-2 rounded-md w-full"
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label>Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="border border-gray-400 p-2 rounded-md w-full"
            />
          </div>

          <button
          onClick={handleSubmit}
            type="submit"
            className=" bg-blue-600 text-white hover:bg-blue-700 cursor-pointer px-6 py-2 rounded-md ransition"
          >
            Save Changes
          </button>
        </div>
      ) : (
        // ===== Display Mode =====
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-500">Profile Picture:</label>
            <div className="mt-1">
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full"
                />
              ) : (
                <span>No image uploaded</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-gray-500">Admission Date:</label>
              <p>{DateFormat(dob) || "Not provided"}</p>
            </div>
            <div>
              <label className="text-gray-500">Roll No:</label>
              <p>{rollno}</p>
            </div>

            <div>
              <label className="text-gray-500">Email:</label>
              <p>{email || "Not provided"}</p>
            </div>

            <div>
              <label className="text-gray-500">Full Name:</label>
              <p>
                {(currentStudent.fname || "") +
                  " " +
                  (currentStudent.lname || "") || "N/A"}
              </p>
            </div>

            <div>
              <label className="text-gray-500">Allocated Subjects :</label>
              <p>
                {Array.isArray(subjects) && subjects.length > 0
                  ? subjects.join(", ")
                  : "N/A"}
              </p>
            </div>

            <div>
              <label className="text-gray-500">Mother's Name:</label>
              <p>{mothername || "Not provided"}</p>
            </div>

            <div>
              <label className="text-gray-500">Father's Name:</label>
              <p>{fathername || "Not provided"}</p>
            </div>

            <div>
              <label className="text-gray-500">Date of Birth:</label>
              <p>{DateFormat(dob) || "Not provided"}</p>
            </div>

            <div>
              <label className="text-gray-500">Blood Group:</label>
              <p>{bloodgroup || "Not provided"}</p>
            </div>

            <div>
              <label className="text-gray-500">Sex:</label>
              <p>{gender || "Not provided"}</p>
            </div>
            <div>
              <label className="text-gray-500">Civil Status:</label>
              <p>{maritialstatus || "N/A"}</p>
            </div>
          </div>

          <div>
            <label className="text-gray-500">Address:</label>
            <p>{address || "Not provided"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditForm;
