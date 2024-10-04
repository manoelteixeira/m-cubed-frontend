import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

export default function LenderDashboard({ userlenderData }) {
  const { id } = useParams();

  const [borrowers, setBorrowers] = useState([]);
  const [loanRequests, setLoanRequests] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [filteredLoanRequests, setFilteredLoanRequests] = useState([]);
  const [loanListing, setLoanListing] = useState([]);

  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageLoanRequests, setPageLoanRequests] = useState(0);
  const [rowsPerPageLoanRequests, setRowsPerPageLoanRequests] = useState(5);
  const [pageLoanListing, setPageLoanListing] = useState(0);
  const [rowsPerPageLoanListing, setRowsPerPageLoanListing] = useState(5);

  const [searchTerm, setSearchTerm] = useState('');

  const calculateTotalLoanVolume = () => {
    return loanRequests.reduce((total, loan) => {
      const loanValue = isNaN(parseFloat(loan.value)) ? 0 : parseFloat(loan.value);
      return total + loanValue;
    }, 0);
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

    const fetchLoanListing = async () => {
      try {
        const response = await fetch(`${API}/lenders/${id}/requests`);
        const data = await response.json();
        setLoanListing(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchBorrowers();
    fetchLoanRequests();
    fetchLoanListing();
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

  const handleChangePageLoanListing = (event, newPage) => {
    setPageLoanListing(newPage);
  };

  const handleChangeRowsPerPageLoanListing = (event) => {
    setRowsPerPageLoanListing(parseInt(event.target.value, 10));
    setPageLoanListing(0);
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
    <div style={{margin: '10px'}}>
      <AppBar position="static" color="primary" sx={{ m: 1, width: '100%' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, m: 2, mr: 2 }}>
            Welcome, {`${userlenderData.business_name}`}
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

      {/* Search Field */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ m: 2, width: 500 }}
      />

      {/* Grid Container */}
      <Grid container spacing={3} sx={{ m: 2 }}>
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
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Right Side - Loan Requests Table */ }
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
              Pending Loan Proposals
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
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
                        <TableCell><Link to={`/lenders/${id}/proposals/${loan.id}`}><Button>Edit</Button></Link></TableCell>
                        <TableCell><Button>Delete</Button></TableCell>
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
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Loan Listings Table */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
              Available Loan Listings
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loanListing
                    .slice(
                      pageLoanListing * rowsPerPageLoanListing,
                      pageLoanListing * rowsPerPageLoanListing + rowsPerPageLoanListing
                    )
                    .map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell>{loan.description}</TableCell>
                        <TableCell>{new Date(loan.created_at).toLocaleDateString()}</TableCell>
                        <TableCell><Link to={`/lenders/${id}/proposals/${loan.id}`}><Button>Accept</Button></Link></TableCell>
                        <TableCell><Button>Pass</Button></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={loanListing.length}
              page={pageLoanListing}
              onPageChange={handleChangePageLoanListing}
              rowsPerPage={rowsPerPageLoanListing}
              onRowsPerPageChange={handleChangeRowsPerPageLoanListing}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
