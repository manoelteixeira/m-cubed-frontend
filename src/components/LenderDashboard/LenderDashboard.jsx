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

export default function LenderDashboard({userlenderData}) {
  const {  id } = useParams();
  const [borrowers, setBorrowers] = useState([]);
  const [loanRequests, setLoanRequests] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [filteredLoanRequests, setFilteredLoanRequests] = useState([]);
  const [loanlisting, setLoanListing] = useState([]);
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageLoanRequests, setPageLoanRequests] = useState(0);
  const [rowsPerPageLoanRequests, setRowsPerPageLoanRequests] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const calculateTotalLoanVolume = () => {
    return loanRequests.reduce((total, loan) => {
      const loanValue = isNaN(parseFloat(loan.value)) ? 0 : parseFloat(loan.value);
      return total + loanValue;
    }, 0);
  };

  useEffect(() => {
  

    const fetchLoanRequests = async () => {
      try {
        const response = await fetch(`${API}/borrowers/${id}/requests`); 
        const data = await response.json();
        setLoanRequests(data);
      } catch (error) {
        console.error('Error fetching loan requests:', error);
      }
    };

    const fetchLoanListing = async () => {
      try {
        const response = await fetch(`${API}/lenders/${id}/requests`)
        const data = await response.json();
        setLoanListing(data)
      } catch (error) {
        console.error('Error fetching requests: ', error)
      }
    }

    // fetchBorrowers();
    fetchLoanRequests();
    fetchLoanListing()
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

  console.log(loanlisting)

  return (
    <div className="lender-dashboard">
      <AppBar position="static" color="secondary" className="app-bar">
        <Toolbar>
          <Typography variant="h4" className="welcome-title">
            Welcome, {`${userlenderData.business_name}`}
          </Typography>
          <Paper elevation={3} className="total-loan-volume">
            <Typography variant="h6">
              Total Loan Volume: ${calculateTotalLoanVolume().toFixed(2)}
            </Typography>
          </Paper>
          <Button className="add-loan-button" color="primary" variant="contained">
            Add New Loan
          </Button>
        </Toolbar>
      </AppBar>

      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />

      <Grid container spacing={2}>
        {/* Left Side - Borrowers Table */}
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
                  {loanlisting
                    .slice(
                      pageBorrowers * rowsPerPageBorrowers,
                      pageBorrowers * rowsPerPageBorrowers + rowsPerPageBorrowers
                    )
                    .map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell width={'40%'}>{loan.description}</TableCell>
                        <TableCell>{new Date(loan.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="action-buttons">
                          <Button> <Link to={`/lenders/${userlenderData.id}/requests/${loan.id}/newproposal`}>Submit Offer</Link> </Button>
                          <Button><Link>PASS</Link> </Button>
                        </TableCell>
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
              rowsPerPageOptions={[5,10, 25, 50, 100]} 
            />
          </Paper>
        </Grid>
        {/* Right Side - Pending Loan Requests Table */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} className="loan-requests-table">
            <Typography variant="h6" component="div">
              Pending Loan Proposals
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell >Title</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell colSpan={3} sx={{textAlign: 'center'}}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {filteredLoanRequests
                    .slice(
                      pageLoanRequests * rowsPerPageLoanRequests,
                      pageLoanRequests * rowsPerPageLoanRequests + rowsPerPageLoanRequests
                    )
                    .map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{loan.description}</TableCell>
                        <TableCell>{new Date(loan.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="action-buttons">
                        <Button> <Link>ACCEPT</Link> </Button>
                          <Button><Link>PASS</Link> </Button>
                        </TableCell>
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
              rowsPerPageOptions={[5,10, 25, 50, 100]} 
            />
          </Paper>
        </Grid>       
      </Grid>
    </div>
  );
};



   {/* <Grid item xs={12} md={5}>
          <Paper elevation={3} className="borrowers-table">
            <Typography variant="h6" component="div">
              Current Borrowers
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell>Business Name</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Credit Score</TableCell>
                    <TableCell>Industry</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {filteredBorrowers
                  // .slice(pageBorrowers * rowsPerPageBorrowers,pageBorrowers * rowsPerPageBorrowers + rowsPerPageBorrowers)
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
              rowsPerPageOptions={[5,10, 25, 50, 100]} 
            />
          </Paper>
        </Grid> */}

          // const fetchBorrowers = async () => {
    //   try {
    //     const response = await fetch(`${API}/borrowers`); 
    //     const data = await response.json();
    //     setBorrowers(data);
    //   } catch (error) {
    //     console.error('Error fetching borrowers:', error);
    //   }
    // };