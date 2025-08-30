import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../redux/slices/studentSlice";
import { useSnackbar } from "notistack";
import { setPageTitle } from "../../redux/slices/pageTitleSlice";
import Header from "../layout/Header";
import RecordData from "./RecordData";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { getAllStandards } from "../../redux/slices/standardSlice";
import { fetchSubjects } from "../../redux/slices/subjectSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(setPageTitle("Add Student Details"));
  }, [dispatch]);

  const { standards } = useSelector((state) => state.standard);
  const { subjects } = useSelector((state) => state.subjects);

  useEffect(() => {
    dispatch(getAllStandards());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const dropdownRef = useRef(null);
  const [selectedSubjects, setSelectedSubject] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionChange = (option) => {
    setSelectedSubject((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const [reloadData, setReloadData] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [rollno, setRollNo] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [motherName, setMotherName] = useState("");
  const [admissiondate, setAdmissionDate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "") {
      setError("Email is required.");
    } else if (!validateEmail(value)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
  };

  const validateFields = (fields) => {
    const missingFields = [];

    for (const [label, value] of Object.entries(fields)) {
      let isMissing = false;

      if (Array.isArray(value)) {
        // Check if array is empty or contains only empty strings
        isMissing = value.length === 0 || value.every((item) => !item.trim());
      } else {
        // Check for empty string, null, undefined
        isMissing = !value;
      }

      if (isMissing) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      const message =
        missingFields.length > 4
          ? "Please fill all details"
          : `Please Enter ${missingFields.join(", ")}`;

      enqueueSnackbar(message, { variant: "error" });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isValid = validateFields({
      "Roll No": rollno,
      "First Name": fname,
      "Last Name": lname,
      "Mother Name": motherName,
      "Date Of Birth ": admissiondate,
      Email: email,
      "Select Standard": selectedStandard,
      Gender: gender,
    });
    if (!isValid) return; // Stop here if fields are missing

    const Data = {
      admissiondate: admissiondate,
      rollno: rollno,
      fname: fname,
      lname: lname,
      mothername: motherName,
      email: email,
      standard: selectedStandard,
      gender: gender,
      subjects: selectedSubjects,
    };
    setLoadingSpinner(true);
    try {
      await dispatch(createStudent(Data));
      enqueueSnackbar(
        <span>
          <b>{fname + " " + lname}</b> Student Added
        </span>,
        { variant: "success" }
      );
      // setReloadData((prev) => !prev);
    } catch {
      console.error("error occured while sending data to backend");
      setLoadingSpinner(false);
    } finally {
      setLoadingSpinner(false);
      setRollNo("");
      setFname("");
      setLname("");
      setMotherName("");
      setAdmissionDate("");
      setEmail("");
      setGender("");
      setSelectedStandard("");
      setSelectedSubject([]);
    }
  };

  return (
    <div className="pt-1">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 pb-6">
        <div className="flex flex-col">
          <label>Admission Date: </label>
          <input
            type="date"
            value={admissiondate}
            onChange={(e) => setAdmissionDate(e.target.value)}
            placeholder="enter birthdate"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
        </div>
        <div className="flex flex-col">
          <label>Roll No :</label>
          <input
            type="text"
            value={rollno}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="enter roll no"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
        </div>
        <div className="flex flex-col">
          <label>First Name :</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="enter fullname"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name :</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            placeholder="enter fullname"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
        </div>

        <div className="flex flex-col">
          <label>Mother's Name :</label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            placeholder="enter mother name"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
        </div>

        <div className="flex flex-col">
          <label>Email : </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400   w-[50%] xs:w-[100%]"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="standard">Select Standard:</label>
          <select
            id="standard"
            value={selectedStandard}
            onChange={handleStandardChange}
            className="border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-[50%] xs:w-[100%]"
          >
            <option value="" disabled>
              {" "}
              Select Standard{" "}
            </option>
            {standards.map((item, index) => (
              <option key={index} value={item.standard}>
                {item.standard}
              </option>
            ))}
          </select>
        </div>

        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div className="flex flex-col">
            <label>Select Subjects</label>
            <button
              onClick={toggleDropdown}
              className="text-start truncate border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 w-[50%] xs:w-[100%] cursor-pointer"
            >
              {selectedSubjects.length > 0
                ? selectedSubjects.join(",")
                : "select subject"}
            </button>

            {isOpen && (
              <div className="absolute top-16 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <ul className="max-h-60 overflow-auto p-2">
                  {subjects.map((option) => (
                    <li
                      key={option}
                      className="flex items-center hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(option.subject)}
                        onChange={() => handleOptionChange(option.subject)}
                        className="mr-2 cursor-pointer"
                      />
                      <span>{option.subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label>Select Gender :</label>
          <div className="flex flex-row gap-5">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={handleGenderChange}
                name="gender"
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={handleGenderChange}
                name="gender"
              />
              Female
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Others"
                checked={gender === "Others"}
                onChange={handleGenderChange}
                name="gender"
              />
              Others
            </label>
          </div>
        </div>
        <div className="flex flex-col justify-end h-full text-start">
          <button
            className="p-1.5 hover:bg-blue-600 bg-blue-400 hover:text-white  text-black rounded-md w-[50%] xs:w-[100%] cursor-pointer"
            onClick={handleSubmit}
          >
            {loadingSpinner ? <LoadingSpinner /> : "Submit"}
          </button>
        </div>
      </div>
      {/* <RecordData reloadData={reloadData} /> */}
    </div>
  );
};

export default Registration;
