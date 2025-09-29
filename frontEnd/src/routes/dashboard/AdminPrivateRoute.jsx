import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAdmin } from "../../features/dashboard/auth/AdminAuthThunk";
import { useEffect } from "react";
import Loading from "../../components/Loading";

export default function AdminPrivateRoute({ children }) {
  const dispatch = useDispatch();
  const { admin, adminToken, loading } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (!admin && adminToken) {
      dispatch(getAdmin());
    }
  }, [admin, adminToken, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
