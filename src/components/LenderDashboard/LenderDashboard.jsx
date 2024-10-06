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
import './LenderDashboard.scss';

const API = import.meta.env.VITE_BASE_URL;

export default function LenderDashboard({ userlenderData }) {
  const { id } = useParams();
  const [loanProposals, setLoanProposals] = useState([]);
  const [filteredloanProposals, setFilteredLoanProposals] = useState([]);
  const [loanListings, setLoanListings] = useState([]);
  const [filteredloanListings, setFilteredLoanListings] = useState([]);
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageloanProposals, setPageloanProposals] = useState(0);
  const [rowsPerPageloanProposals, setRowsPerPageloanProposals] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const calculateTotalLoanVolume = () => {
    return loanProposals.reduce((total, loan) => {
      const loanValue = isNaN(parseFloat(loan.value)) ? 0 : parseFloat(loan.value);
      return total + loanValue;
    }, 0);
  };

  useEffect(() => {
    const fetchLoanProposals = async () => {
      try {
        const response = await fetch(`${API}/lenders/${id}/proposals`);
        const data = await response.json();
        setLoanProposals(data);
        setFilteredLoanProposals(data);
      } catch (error) {
        console.error('Error fetching loan requests:', error);
      }
    };

    const fetchLoanListing = async () => {
      try {
        const response = await fetch(`${API}/lenders/${id}/requests`);
        const data = await response.json();
        setLoanListings(data);
        setFilteredLoanListings(data);
      } catch (error) {
        console.error('Error fetching requests: ', error);
      }
    };

    fetchLoanProposals();
    fetchLoanListing();
  }, []);

// PAGINATION CODE START!!
  const handleChangePageBorrowers = (event, newPage) => {
    setPageBorrowers(newPage);
  };

  const handleChangeRowsPerPageBorrowers = (event) => {
    setRowsPerPageBorrowers(parseInt(event.target.value, 10));
    setPageBorrowers(0);
  };

  const handleChangePageloanProposals = (event, newPage) => {
    setPageloanProposals(newPage);
  };

  const handleChangeRowsPerPageloanProposals = (event) => {
    setRowsPerPageloanProposals(parseInt(event.target.value, 10));
    setPageloanProposals(0);
  };
  // PAGINATION CODE END!!!

  // Search Bar START !!

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredBorrowers = loanListings.filter(
      (loan) =>
        loan.title.toLowerCase().includes(term) ||
        loan.description.toLowerCase().includes(term)
    );
    setFilteredLoanListings(filteredBorrowers);

    const filteredloanProposals = loanProposals.filter(
      (loan) =>
        loan.title.toLowerCase().includes(term) ||
        loan.description.toLowerCase().includes(term)
    );
    setFilteredLoanProposals(filteredloanProposals);
  };
  // SEARCH BAR END!!

  return (
    <div className="lender-dashboard">
      <AppBar position="static" color="secondary" className="app-bar">
        <Toolbar>
          <Typography variant="h3" className="welcome-title">
            Welcome, {`${userlenderData.business_name}`}
          </Typography>
          <Paper elevation={3} className="total-loan-volume">
            <Typography variant="h6">
              Total Loan Volume: ${calculateTotalLoanVolume().toFixed(2)}
            </Typography>
          </Paper>
          {/* <Button className="add-loan-button" color="primary" variant="contained">
            Add New Loan
          </Button> */}
        </Toolbar>
      </AppBar>

      <Grid
  container
  justifyContent="center"
  alignItems="center"
>
  <TextField
    placeholder="Search"
    variant="outlined"
    value={searchTerm}
    onChange={handleSearchChange}
    className="search-bar"
    inputProps={{
      style: { textAlign: 'center' }
    }}
  />
</Grid>


      <Grid container spacing={2}>

        {/* Loan Listings Table */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} className="loan-listings-table">
            <Typography variant="h6" component="div">
              Available Loan Listings
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {filteredloanListings
                    .slice(
                      pageBorrowers * rowsPerPageBorrowers,
                      pageBorrowers * rowsPerPageBorrowers + rowsPerPageBorrowers
                    )
                    .map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell width={'40%'}>{loan.description}</TableCell>
                        <TableCell>
                          {new Date(loan.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="action-buttons">
                          <Button>
                            <Link to={`/lenders/${userlenderData.id}/requests/${loan.id}/newproposal`}>
                              Submit Offer
                            </Link>
                          </Button>
                          <Button>
                            <Link>PASS</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredloanListings.length}
              page={pageBorrowers}
              onPageChange={handleChangePageBorrowers}
              rowsPerPage={rowsPerPageBorrowers}
              onRowsPerPageChange={handleChangeRowsPerPageBorrowers}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Pending Loan Requests Table */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} className="loan-requests-table">
            <Typography variant="h6" component="div">
              Pending Loan Proposals
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell>Title</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      Description
                    </TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {filteredloanProposals
                    .slice(
                      pageloanProposals * rowsPerPageloanProposals,
                      pageloanProposals * rowsPerPageloanProposals + rowsPerPageloanProposals
                    )
                    .map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {loan.description}
                        </TableCell>
                        <TableCell>
                          {new Date(loan.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="action-buttons">
                          <Button>
                            <Link to={`/lenders/${id}/proposals/${loan.id}/edit`}>Review</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredloanProposals.length}
              page={pageloanProposals}
              onPageChange={handleChangePageloanProposals}
              rowsPerPage={rowsPerPageloanProposals}
              onRowsPerPageChange={handleChangeRowsPerPageloanProposals}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}