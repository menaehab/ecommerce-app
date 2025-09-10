import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const admin = useSelector(state => state.auth.admin);
  return admin ? children : <Navigate to="/login" />;
}