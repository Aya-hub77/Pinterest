import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import Spinner from "../Components/Spinner";

const PrivateRoute = ({ children }) => {
  const { accessToken, loading } = useAuth();
  if (loading) return <Spinner />;
  return accessToken ? children : <Navigate to="/signup" replace />;
};

export default PrivateRoute;