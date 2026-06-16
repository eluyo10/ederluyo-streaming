import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export function ProtectedRoute({ children, requireProfile = false }) {
  const { session, profile } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (requireProfile && !profile) return <Navigate to="/profiles" replace />;
  return children;
}
