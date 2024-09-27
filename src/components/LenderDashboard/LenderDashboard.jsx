
import React from 'react';
import {AppBar,Toolbar,Typography,Button,TextField,Select,MenuItem,FormControl,InputLabel,
  Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
} from '@mui/material';
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
          Total Loan Volume: <span>{/* helper function for total Loan volumes */}</span>
        </Typography>
      </div>

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
            {/* Add more MenuItems as needed */}
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
