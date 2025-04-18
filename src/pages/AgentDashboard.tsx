import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { appointments } from '../data/appointments';

const AgentDashboard = () => (
  <Container sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom>Agent Dashboard</Typography>
    <List>
      {appointments.map((appt) => (
        <ListItem key={appt.id}>
          <ListItemText
            primary={`${appt.clientName} - ${appt.date} at ${appt.time}`}
            secondary={`Status: ${appt.status}`}
          />
        </ListItem>
      ))}
    </List>
  </Container>
);

export default AgentDashboard;