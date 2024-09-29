import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
} from '@mui/material';

const API = import.meta.env.VITE_BASE_URL;

export default function LenderDashboard(){
const {id} = useParams()

  const [borrowers, setBorrowers] = useState([]);
  const [loanRequests, setLoanRequests] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [filteredLoanRequests, setFilteredLoanRequests] = useState([]);
  
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageLoanRequests, setPageLoanRequests] = useState(0);
  const [rowsPerPageLoanRequests, setRowsPerPageLoanRequests] = useState(5);

  const [searchTerm, setSearchTerm] = useState('');

  const calculateTotalLoanVolume = () => {
    return loanRequests.reduce((total, loan) => total + loan.value, 0);
  };

  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const response = await fetch(`${API}/borrowers`); 
        const data = await response.json();
        setBorrowers(data);
        setFilteredBorrowers(data); 
      } catch (error) {
        console.error('Error fetching borrowers:', error);
      }
    };

    const fetchLoanRequests = async () => {
      try {
        const response = await fetch(`${API}/borrowers/${id}/requests`); 
        const data = await response.json();
        setLoanRequests(data);
        setFilteredLoanRequests(data); 
      } catch (error) {
        console.error('Error fetching loan requests:', error);
      }
    };

    fetchBorrowers();
    fetchLoanRequests();
  }, []);

  const handleChangePageBorrowers = (event, newPage) => {
    setPageBorrowers(newPage);
  };

  const handleChangeRowsPerPageBorrowers = (event) => {
    setRowsPerPageBorrowers(parseInt(event.target.value, 10));
    setPageBorrowers(0);
  };

  const handleChangePageLoanRequests = (event, newPage) => {
    setPageLoanRequests(newPage);
  };

  const handleChangeRowsPerPageLoanRequests = (event) => {
    setRowsPerPageLoanRequests(parseInt(event.target.value, 10));
    setPageLoanRequests(0);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredBorrowers = borrowers.filter(
      (borrower) =>
        borrower.business_name.toLowerCase().includes(term) ||
        borrower.city.toLowerCase().includes(term) ||
        borrower.industry.toLowerCase().includes(term)
    );
    setFilteredBorrowers(filteredBorrowers);

    const filteredLoanRequests = loanRequests.filter(
      (loan) =>
        loan.title.toLowerCase().includes(term) ||
        loan.description.toLowerCase().includes(term)
    );
    setFilteredLoanRequests(filteredLoanRequests);
  };

  return (
    <div>
      <AppBar position="static" color="secondary" sx={{m: 2, width: 1500}}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, m:2, mr:2 }}>
            Welcome
          </Typography>
          <Paper elevation={3} sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">
              Total Loan Volume: ${calculateTotalLoanVolume().toFixed(2)}
            </Typography>
          </Paper>
          <Button color="primary" variant="contained">
            Add New Loan
          </Button>
        </Toolbar>
      </AppBar>

      <TextField
        label="Search"
        variant="outlined"
        // halfWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: 500}}
      />

      <Grid container spacing={3}>
        {/* Left Side - Borrowers Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
              Current Borrowers
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Business Name</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Credit Score</TableCell>
                    <TableCell>Industry</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBorrowers
                    .slice(
                      pageBorrowers * rowsPerPageBorrowers,
                      pageBorrowers * rowsPerPageBorrowers + rowsPerPageBorrowers
                    )
                    .map((borrower) => (
                      <TableRow key={borrower.id}>
                        <TableCell>{borrower.business_name}</TableCell>
                        <TableCell>{borrower.city}</TableCell>
                        <TableCell>{borrower.credit_score}</TableCell>
                        <TableCell>{borrower.industry}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredBorrowers.length}
              page={pageBorrowers}
              onPageChange={handleChangePageBorrowers}
              rowsPerPage={rowsPerPageBorrowers}
              onRowsPerPageChange={handleChangeRowsPerPageBorrowers}
            />
          </Paper>
        </Grid>

        {/* Right Side - Pending Loan Requests Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
              Pending Loan Requests
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLoanRequests
                    .slice(
                      pageLoanRequests * rowsPerPageLoanRequests,
                      pageLoanRequests * rowsPerPageLoanRequests + rowsPerPageLoanRequests
                    )
                    .map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell>{loan.description}</TableCell>
                        <TableCell>{new Date(loan.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredLoanRequests.length}
              page={pageLoanRequests}
              onPageChange={handleChangePageLoanRequests}
              rowsPerPage={rowsPerPageLoanRequests}
              onRowsPerPageChange={handleChangeRowsPerPageLoanRequests}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};



