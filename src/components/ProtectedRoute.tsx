import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" />;

  return children;
};