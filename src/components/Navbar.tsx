import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { role, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Scheduling Platform
        </Typography>
        {role && <Typography mr={2}>Role: {role}</Typography>}
        {role && <Button color="inherit" onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;