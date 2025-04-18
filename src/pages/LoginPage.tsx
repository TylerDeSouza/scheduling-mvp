import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'client' | 'agent' | 'admin') => {
    login(role);
    navigate('/');
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Login as:</Typography>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => handleLogin('client')}>Client</Button>
      <Button variant="contained" sx={{ mr: 2 }} onClick={() => handleLogin('agent')}>Agent</Button>
      <Button variant="contained" onClick={() => handleLogin('admin')}>Admin</Button>
    </Container>
  );
};

export default LoginPage;