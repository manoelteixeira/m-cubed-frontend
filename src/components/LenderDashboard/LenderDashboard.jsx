
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Container
} from '@mui/material';

import {
  HomeRounded as HomeRoundedIcon,
  AnalyticsRounded as AnalyticsRoundedIcon,
  PeopleRounded as PeopleRoundedIcon,
  AssignmentRounded as AssignmentRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
  InfoRounded as InfoRoundedIcon,
  HelpRounded as HelpRoundedIcon,
} from '@mui/icons-material';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon /> },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
  { text: 'Clients', icon: <PeopleRoundedIcon /> },
  { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];
import './LenderDashboard.scss';
// import logo from "../../assets/logo.jpeg";


export default function LenderDashboard({ userlenderData }) {
  return (
    <div className="lender-dashboard">
      <AppBar position="static" color='Secondary'>
        <Toolbar>
          {/* <img src={logo} alt="Logo" className="logo" width={'40px'} /> */}
          <Typography variant="h4" sx={{ flexGrow: 1, margin: '20px' }}>
            Welcome,
      <Paper elevation={3} className="total-loan-volume" sx={{m: 3}}>
        <Typography variant="h6">
          Total Loan Volume: <span>helper function for total Loan volumes</span>
        </Typography>
      </Paper>
             {/* {userlenderData.business_name} */}
          </Typography>
          <Button color="Primary">Add New Loan</Button>
        </Toolbar>
      </AppBar>
      <Container variant=''>
      <Stack sx={{ flexGrow: 4, p: 1, justifyContent: 'space-evenly', height: '100%'}}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>




      </Container>

      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Current Loan Capacity
      </Typography>
      
      <div className="filters" style={{ marginTop: 2, marginBottom: 2 }}>
        <TextField
          label="Search by loan # or name"
          variant="outlined"
          fullWidth
          style={{ marginRight: 16 }}
        />
        <FormControl variant="outlined" style={{ marginRight: 16, minWidth: 120 }}>
          <InputLabel>Loan Status</InputLabel>
          <Select defaultValue="11">
            <MenuItem value="11">Loans Selected</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary">
          Reset Filters
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Borrower(s)</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Tasks</TableCell> */}
              <TableCell>Created Date</TableCell>
              <TableCell>Last Logged In</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* when we make the link for the  */}
            <TableRow>Hello</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
}
