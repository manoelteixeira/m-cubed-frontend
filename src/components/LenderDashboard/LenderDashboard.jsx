
import React from 'react';
import {AppBar,
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
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

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
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Welcome, {userlenderData.business_name}
          </Typography>
          <Button color="inherit">Add New Loan</Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Current Loan Capacity
      </Typography>
      <div className="total-loan-volume">
        <Typography variant="h6">
          Total Loan Volume: <span>helper function for total Loan volumes</span>
        </Typography>
      </div>
      {/* 
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
      </div> */}

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

      <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
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
    </div>
    
  );
}
