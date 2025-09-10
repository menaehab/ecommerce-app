import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminPrivateRoute({ children }) {
  const adminAuth = useSelector(state => state.adminAuth);
  return adminAuth.admin ? children : <Navigate to="/" replace />;
}