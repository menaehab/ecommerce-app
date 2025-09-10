import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UserPrivateRoute({ children }) {
  const user = useSelector(state => state.userAuth.user);
  return user ? children : <Navigate to="/login" />;
}