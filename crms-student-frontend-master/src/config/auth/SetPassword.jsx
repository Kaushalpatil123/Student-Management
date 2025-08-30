import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPassward } from "../../redux/slices/authSlice";
import LoadingSpinner from "../../Utils/LoadingSpinner";

const SetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToLogin = () => {
    navigate("/login");
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passward, SetPassward] = useState("");
  const handlePasswardChange = (e) => {
    const value = e.target.value;
    SetPassward(value);
  };

  const handlePassSubmit = async () => {
    if(!passward){
            enqueueSnackbar("Please Enter Passward ", {
        variant: "error",
      });
      return
    }
    setIsLoading(true);
    try {
      await dispatch(setPassward({ token, password: passward }));
      enqueueSnackbar("Passward Set Successfully", {
        variant: "success",
      });
      ToLogin();
    } catch {
      console.error("error occured while setting passward");
      enqueueSnackbar("Failed To Set Passward", {
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
        <h2 className="text-blue-900 font-bold text-2xl text-center pt-4">School Management CRMs</h2>
      <div className="w-full flex items-center justify-center p-5 ">

        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8 rounded-tl-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Set New Passward
          </h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handlePasswardChange}
              required
              className="border border-gray-300 px-4 py-2 rounded w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center space-x-2 my-3">
            <input
              type="checkbox"
              id="togglePassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="cursor-pointer w-4 h-4 "
            />
            <label htmlFor="togglePassword" className="text-sm cursor-pointer">
              Show Password
            </label>
          </div>

          <div className="flex justify-start ">
            <button
              onClick={handlePassSubmit}
              type="submit"
              className="bg-blue-600 text-white py-2 px-2 rounded hover:bg-blue-700 transition cursor-pointer w-full"
            >
              {isLoading ? <LoadingSpinner /> : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
