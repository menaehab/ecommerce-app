import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminPublicRoute({ children }) {
  const adminAuth = useSelector(state => state.adminAuth.admin);
  return !adminAuth ? children : <Navigate to="/dashboard" />;
}