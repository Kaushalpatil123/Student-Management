// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Or any flag you set

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
