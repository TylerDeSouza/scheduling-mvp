import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ClientDashboard from './pages/ClientDashboard';
import AgentDashboard from './pages/AgentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['client', 'agent', 'admin']}>
              <NavigateToRoleDashboard />
            </ProtectedRoute>
          } />
          <Route path="/client" element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/agent" element={
            <ProtectedRoute allowedRoles={['agent']}>
              <AgentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const NavigateToRoleDashboard = () => {
  const { role } = useAuth();
  switch (role) {
    case 'client': return <Navigate to="/client" />;
    case 'agent': return <Navigate to="/agent" />;
    case 'admin': return <Navigate to="/admin" />;
    default: return <Navigate to="/login" />;
  }
};

export default App;