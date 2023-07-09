import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TextField, Select, MenuItem } from '@mui/material';

class App extends React.Component {
  state = {
    tickets: [],
    activeTab: 0,
  };

  addTicket = (ticket) => {
    const newTicket = { ...ticket, ticketNumber: Math.floor(Math.random() * 10000) + 1 };
    this.setState((prevState) => ({
      tickets: [...prevState.tickets, newTicket],
    }));
  };

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };

  render() {
    const { tickets, activeTab } = this.state;

    return (
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket Management
        </Typography>
        <Tabs
          value={activeTab}
          onChange={this.handleTabChange}
          variant="fullWidth"
          sx={{ marginBottom: '1rem' }}
        >
          <Tab label="List" />
          <Tab label="Create" />
        </Tabs>
        {activeTab === 0 && <TicketList tickets={tickets} />}
        {activeTab === 1 && <CreateTicket addTicket={this.addTicket} />}
      </Container>
    );
  }
}

const TicketList = ({ tickets }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Created':
        return 'primary';
      case 'In process':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'Invalid':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
   
        <List disablePadding>
         <Card sx={{ marginTop: '2rem' }}>
      <CardContent>
          <ListItem divider>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Number</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Resolver</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1">Status</Typography>
              </Grid>
            </Grid>
          </ListItem>
          {tickets.map((ticket) => (
            <ListItem key={ticket.ticketNumber} divider>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body1">{ticket.ticketNumber}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">{ticket.resolver}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    label={ticket.status}
                    color={getStatusColor(ticket.status)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
           </CardContent>
    </Card>
        </List>
     
  );
};

class CreateTicket extends React.Component {
  state = {
    reason: '',
    reporter: '',
    resolver: '',
    status: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTicket(this.state);
    this.setState({
      reason: '',
      reporter: '',
      resolver: '',
      status: '',
    });
  };

  render() {
    return (
      <Card variant="outlined" sx={{ marginTop: '2rem' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create Ticket
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Reason"
                  name="reason"
                  value={this.state.reason}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Reporter"
                  name="reporter"
                  value={this.state.reporter}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required
                  fullWidth
                  label="Resolver"
                  name="resolver"
                  value={this.state.resolver}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">Select Resolver</MenuItem>
                  <MenuItem value="Customer Agent">Customer Agent</MenuItem>
                  <MenuItem value="Team Lead">Team Lead</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  required
                  fullWidth
                  label="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="Created">Created</MenuItem>
                  <MenuItem value="In process">In process</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Invalid">Invalid</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default App;
