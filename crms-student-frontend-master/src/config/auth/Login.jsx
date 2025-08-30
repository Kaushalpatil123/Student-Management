import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../Utils/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log("user", user);
  useEffect(() => {
    if (user) {
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
                        localStorage.setItem("id", user?.id);
                                                localStorage.setItem("_id", user?._id);
    }
  }, [user]);

  useEffect(() => {
    if (user && user?.role === "L1") {
      navigate("/dashboard");
    } else if (user && user?.role === "L2") {
      navigate("/student-dashboard");
    }
  }, [user, navigate]);

  const ToRegister = () => {
    navigate("/register");
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hoveringIcon, setHoveringIcon] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true);
    try {
      await dispatch(loginUser(formData)).unwrap();

      enqueueSnackbar("Logged In", { variant: "success" });
    } catch (err) {
      console.error("Login failed response:", err); // "Invalid credentials"
      enqueueSnackbar(err, { variant: "error" });
      setLoadingSpinner(false);
    }
    setLoadingSpinner(false);
  };

  return (
    <div className="min-h-screen  flex flex-col-reverse md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left Section - Image with Overlay Text */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-blue-600 text-white">
        <div className="text-center">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4321.jpg"
            alt="secure login"
            className="w-[80%] sm:h-[300px] h-[210px] mx-auto mb-4 drop-shadow-xl "
          />
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-lg">Sign in to access your dashboard</p>
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-gray-100 transition font-medium cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-10">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="relative">
              <input
                type={showPassword || hoveringIcon ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="border border-gray-300 px-4 py-2 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onMouseEnter={() => setHoveringIcon(true)}
                onMouseLeave={() => setHoveringIcon(false)}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword || hoveringIcon ? <Eye /> : <EyeOff />}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              {loadingSpinner ? <LoadingSpinner /> : "Login"}
            </button>
            <div className="flex justify-center align-middle items-center">
              <p>
                Dont have an Account ?{" "}
                <a
                  onClick={ToRegister}
                  className="text-blue-600 hover:underline hover:text-blue-800 cursor-pointer"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
