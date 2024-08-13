import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../component/contexts/AuthContext";

const PrivateRoute = () => {
  let { user } = useContext(AuthContext);
  return !user ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;