// src/components/LenderDashboard/LoansMarketplace.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Box,
  Collapse,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;

export default function LoansMarketplace({ user, token }) {
  const [loanListings, setLoanListings] = useState([]);
  const [loanListingsLimit, setLoanListingsLimit] = useState(5);
  const [loanListingsOffset, setLoanListingsOffset] = useState(0);
  const [loanListingsTotal, setLoanListingsTotal] = useState(null);
  const [loanListingsValue, setLoanListingsValue] = useState(0);
  const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
  const [sortByLoanListings, setSortByLoanListings] = useState("created_at");
  const [sortOrderLoanListings, setSortOrderLoanListings] = useState("desc");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    created_at: new Date().toLocaleDateString(),
  });

  // Fetch loan listings from the API
  const loadLoanListings = () => {
    let url = `${API}/lenders/${user.id}/requests?limit=${loanListingsLimit}&offset=${loanListingsOffset}&sort=${sortByLoanListings}&order=${sortOrderLoanListings}`;
    if (searchTermLoanListings.length >= 3) {
      url += `&search=${searchTermLoanListings}`;
    }

    const options = {
      headers: { Authorization: token },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoanListings(data.loan_requests);
        setLoanListingsTotal(data.total);
        setLoanListingsValue(data.value);
      })
      .catch((err) => console.log(err));
  };

  // Fetch borrower details for expanded rows
  const fetchBorrowerDetails = async (borrowerId) => {
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setBorrowerDetails({
        business_name: data.business_name,
        industry: data.industry,
        credit_score: data.credit_score,
        street: data.street,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        fico_score_link: data.fico_score_link || "/mock-fico-score.pdf",
        secretary_of_state_link:
          data.secretary_of_state_link || "/mock-sos-certificate.pdf",
        drivers_license_link:
          data.drivers_license_link || "/mock-drivers-license.pdf",
      });
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  // Handle loan proposal change
  const handleProposalChange = (e) => {
    setLenderProposal({ ...lenderProposal, [e.target.name]: e.target.value });
  };

  // Handle proposal submission (POST)
  const handleSendProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount),
      interest_rate: parseFloat(lenderProposal.interest_rate),
      repayment_term: parseInt(lenderProposal.repayment_term, 10),
      created_at: new Date().toISOString(),
    };

    const endpoint = `${API}/lenders/${user.id}/requests/${expandedRowId}`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(proposalData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Proposal sent successfully");
        setExpandedRowId(null);
      } else {
        alert(result.error || "Error sending proposal.");
      }
    } catch (error) {
      alert(error.message || "Failed to send the proposal.");
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (rowId, borrowerId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
    if (borrowerId && expandedRowId !== rowId) {
      fetchBorrowerDetails(borrowerId);
    }
  };

  // Sorting and loading functions
  const handleSortChangeLoanListings = (event) => {
    setSortByLoanListings(event.target.value);
    loadLoanListings();
  };

  const handleSortOrderChangeLoanListings = () => {
    const newOrder = sortOrderLoanListings === "asc" ? "desc" : "asc";
    setSortOrderLoanListings(newOrder);
    loadLoanListings();
  };

  const handleSearchChangeLoanListings = (event) => {
    setSearchTermLoanListings(event.target.value.toLowerCase());
    loadLoanListings();
  };

  useEffect(() => {
    loadLoanListings();
  }, [loanListingsLimit, loanListingsOffset]);

  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
        <Typography
          variant="h5"
          sx={{ color: "#00a250", marginBottom: 2, textAlign: "center" }}
        >
          The MMM Loans Marketplace
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#00a250", marginBottom: 2, textAlign: "center" }}
        >
          Current Marketplace Volume:
          {loanListingsValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
        {/* Search, Sorting, and Table */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item>
            <TextField
              placeholder="Search Loan Listings"
              variant="outlined"
              value={searchTermLoanListings}
              onChange={handleSearchChangeLoanListings}
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#00a250" },
                  "&:hover fieldset": { borderColor: "#00a250" },
                  "&.Mui-focused fieldset": { borderColor: "#00a250" },
                },
              }}
            />
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
              <InputLabel id="sort-loan-listings-label">Sort By</InputLabel>
              <Select
                labelId="sort-loan-listings-label"
                value={sortByLoanListings}
                onChange={handleSortChangeLoanListings}
                label="Sort By"
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="value">Loan Amount</MenuItem>
                <MenuItem value="created_at">Date</MenuItem>
                <MenuItem value="description">Purpose of Loan</MenuItem>
                {/* <MenuItem value="industry">Industry</MenuItem> */}
                {/* <MenuItem value="state">State</MenuItem> */}
                {/* <MenuItem value="credit_score">Credit Score</MenuItem> */}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleSortOrderChangeLoanListings}
              startIcon={<SortIcon />}
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#007a3e",
                },
              }}
            >
              {sortOrderLoanListings === "asc" ? "Ascending" : "Descending"}
            </Button>
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Title", "Purpose of Loan", "Loan Amount", "Date"].map(
                  (header) => (
                    <TableCell key={header} align="center">
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loanListings.map((loan) => (
                <React.Fragment key={loan.id}>
                  <TableRow
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      toggleRowExpansion(loan.id, loan.borrower_id)
                    }
                  >
                    <TableCell align="left" sx={{ color: "#00a250" }}>
                      {loan.title}
                    </TableCell>
                    <TableCell align="left">{loan.description}</TableCell>
                    <TableCell align="right">
                      {parseFloat(loan.value).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(loan.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>

                  {/* Collapsible row for borrower details and SEND proposal form */}
                  {expandedRowId === loan.id && (
                    <TableRow key={`${loan.id}-collapse`}>
                      <TableCell colSpan={4}>
                        <Collapse in={expandedRowId === loan.id}>
                          <Box
                            margin={2}
                            sx={{
                              backgroundColor: "#fff",
                              padding: 2,
                              borderRadius: 2,
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#00a250",
                                    marginBottom: 1,
                                  }}
                                >
                                  Borrower Details
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                  <Typography>
                                    <strong>Business Name:</strong>{" "}
                                    {borrowerDetails.business_name}
                                  </Typography>
                                  <Typography>
                                    <strong>Industry:</strong>{" "}
                                    {borrowerDetails.industry}
                                  </Typography>
                                  <Typography>
                                    <strong>Credit Score:</strong>{" "}
                                    {borrowerDetails.credit_score}
                                  </Typography>
                                  <Typography>
                                    <strong>Location:</strong>{" "}
                                    {borrowerDetails.street},{" "}
                                    {borrowerDetails.city},{" "}
                                    {borrowerDetails.state}{" "}
                                    {borrowerDetails.zip_code}
                                  </Typography>
                                  {/* Verified Documents */}
                                  <Typography>
                                    <strong>Verified Documents:</strong>
                                  </Typography>
                                  <ul>
                                    <li>
                                      <Link
                                        href={borrowerDetails.fico_score_link}
                                        target="_blank"
                                        rel="noopener"
                                        sx={{ color: "#00a250" }}
                                      >
                                        FICO Score - Verified
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        href={
                                          borrowerDetails.secretary_of_state_link
                                        }
                                        target="_blank"
                                        rel="noopener"
                                        sx={{ color: "#00a250" }}
                                      >
                                        Secretary of State Certificate -
                                        Verified
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        href={
                                          borrowerDetails.drivers_license_link
                                        }
                                        target="_blank"
                                        rel="noopener"
                                        sx={{ color: "#00a250" }}
                                      >
                                        Driver's License - Verified
                                      </Link>
                                    </li>
                                  </ul>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#00a250",
                                    marginBottom: 1,
                                  }}
                                >
                                  Loan Proposal Form
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                  <TextField
                                    label="Title"
                                    fullWidth
                                    name="title"
                                    value={lenderProposal.title}
                                    onChange={handleProposalChange}
                                    sx={{ marginBottom: 2 }}
                                  />
                                  <TextField
                                    label="Description"
                                    fullWidth
                                    name="description"
                                    value={lenderProposal.description}
                                    onChange={handleProposalChange}
                                    multiline
                                    rows={3}
                                    sx={{ marginBottom: 2 }}
                                  />
                                  <TextField
                                    label="Loan Amount"
                                    fullWidth
                                    name="loan_amount"
                                    value={lenderProposal.loan_amount}
                                    onChange={handleProposalChange}
                                    sx={{ marginBottom: 2 }}
                                  />
                                  <TextField
                                    label="Interest Rate"
                                    fullWidth
                                    name="interest_rate"
                                    value={lenderProposal.interest_rate}
                                    onChange={handleProposalChange}
                                    sx={{ marginBottom: 2 }}
                                  />
                                  <TextField
                                    label="Repayment Term"
                                    fullWidth
                                    name="repayment_term"
                                    value={lenderProposal.repayment_term}
                                    onChange={handleProposalChange}
                                    sx={{ marginBottom: 2 }}
                                  />
                                  <Button
                                    variant="contained"
                                    sx={{
                                      backgroundColor: "#00a250",
                                      color: "#fff",
                                      marginRight: 2,
                                      "&:hover": {
                                        backgroundColor: "#007a3e",
                                      },
                                    }}
                                    onClick={handleSendProposal} // SEND Proposal for Loans Marketplace
                                  >
                                    Send Proposal
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      backgroundColor: "darkred",
                                      color: "#fff",
                                      "&:hover": {
                                        backgroundColor: "#b30000",
                                      },
                                    }}
                                    onClick={() => setExpandedRowId(null)}
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={loanListingsTotal}
          page={loanListingsOffset}
          onPageChange={(event, newPage) => setLoanListingsOffset(newPage)}
          rowsPerPage={loanListingsLimit}
          onRowsPerPageChange={(event) =>
            setLoanListingsLimit(event.target.value)
          }
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Paper>
    </Grid>
  );
}

LoansMarketplace.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
