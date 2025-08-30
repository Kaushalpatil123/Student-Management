import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { useSnackbar } from "notistack";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const ToLogin = () => {
    navigate("/login");
  };
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      enqueueSnackbar("Please accept checkbox to continue", {
        variant: "warning",
      });
      return;
    }
    setLoadingSpinner(true);
    try {
      await dispatch(registerUser(formData));
      setFormData({ name: "", email: "" });
      navigate("/login");
      enqueueSnackbar("Please Set Passward, Email Has Sent", {
        variant: "success",
      });
    } catch (err) {
      alert(err.response.data.msg);
      enqueueSnackbar(
        err.response.data.msg || "Student Registered Successfully",
        { variant: "error" }
      );
    } finally {
      setLoadingSpinner(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col-reverse md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-blue-600 text-white">
        <div className="text-center">
          <img
            src="https://img.freepik.com/free-vector/registration-form-concept-illustration_114360-5007.jpg"
            alt="register"
            className="w-[80%] sm:h-[300px] h-[210px] mx-auto mb-4 drop-shadow-xl"
          />
          <h2 className="text-3xl font-bold mb-2">Join Us</h2>
          <p className="text-lg mb-4">Create an account to get started</p>

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition font-medium cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10 ">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 rounded-tl-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <span>Registering as a School Manager</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              {loadingSpinner ? <LoadingSpinner /> : "Register"}
            </button>
            <div className="flex justify-center align-middle items-center">
              <p>
                Already have an Account ?{" "}
                <a
                  onClick={ToLogin}
                  className="text-blue-600 hover:underline hover:text-blue-800 cursor-pointer"
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
