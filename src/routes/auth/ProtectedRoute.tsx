import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticated } from '../../hooks/authHooks';

const ProtectedRoute = () => {
  const isLoggedIn = useIsAuthenticated();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
