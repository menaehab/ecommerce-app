import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../features/store/auth/UserAuthThunk";
import { useEffect } from "react";
import Loading from "../../components/Loading";

export default function UserPrivateRoute({ children }) {
  const dispatch = useDispatch();
  const { user, userToken, loading } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (!user && userToken) {
      dispatch(getUser());
    }
  }, [user, userToken, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
