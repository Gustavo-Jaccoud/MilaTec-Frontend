import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "@/app/services/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/errors/error-403" replace />;
  }

  return children;
};

export default PrivateRoute;