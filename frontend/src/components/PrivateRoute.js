import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (token && user?.role === 'admin') {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
