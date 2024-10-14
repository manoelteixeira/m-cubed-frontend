// // src/components/LenderDashboard/LenderDashboard.jsx
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
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
  Collapse,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableSortLabel,
  Link,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const API = import.meta.env.VITE_BASE_URL;

export default function LenderDashboard({ user, token }) {
  const [loanProposals, setLoanProposals] = useState([]);
  const [loanListings, setLoanListings] = useState([]);
  const [filteredLoanProposals, setFilteredLoanProposals] = useState([]);
  const [filteredLoanListings, setFilteredLoanListings] = useState([]);
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageLoanProposals, setPageLoanProposals] = useState(0);
  const [rowsPerPageLoanProposals, setRowsPerPageLoanProposals] = useState(5);
  const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");

  const [borrowerDetails, setBorrowerDetails] = useState({
    business_name: "",
    industry: "",
    credit_score: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    fico_score_link: "#",
    secretary_of_state_link: "#",
    drivers_license_link: "#",
  });

  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    created_at: new Date().toLocaleDateString(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  const toggleRowExpansion = (rowId, borrowerId, proposal) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
    if (borrowerId && expandedRowId !== rowId) {
      fetchBorrowerDetails(borrowerId);
      if (proposal) {
        // Only for the Resend Proposal case
        setLenderProposal({
          title: proposal.title,
          description: proposal.description,
          loan_amount: proposal.loan_amount.toString(),
          interest_rate: proposal.interest_rate.toString(),
          repayment_term: proposal.repayment_term.toString(),
          created_at: proposal.created_at,
        });
      }
    }
  };

  const fetchBorrowerDetails = async (borrowerId) => {
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setBorrowerDetails({
        ...data,
        fico_score_link: "/mock-fico-score.pdf",
        secretary_of_state_link: "/mock-sos-certificate.pdf",
        drivers_license_link: "/mock-drivers-license.pdf",
      });
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  const handleProposalChange = (e) => {
    setLenderProposal({ ...lenderProposal, [e.target.name]: e.target.value });
  };

  // SEND Proposal Function for Loans Marketplace Table (POST)
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
        setDialogTitle("Success");
        setDialogMessage("Proposal sent successfully.");
        setExpandedRowId(null);
      } else {
        setDialogTitle("Error");
        setDialogMessage(result.error || "Error sending proposal.");
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage(error.message || "Failed to send the proposal.");
    } finally {
      setDialogOpen(true);
    }
  };

  // RESUBMIT Proposal Function for Pending Loan Proposals Table (PUT)
  const handleResubmitProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount),
      interest_rate: parseFloat(lenderProposal.interest_rate),
      repayment_term: parseInt(lenderProposal.repayment_term, 10),
      created_at: new Date().toISOString(),
    };

    const endpoint = `${API}/lenders/${user.id}/proposals/${expandedRowId}`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(proposalData),
      });

      const result = await response.json();
      if (response.ok) {
        setDialogTitle("Success");
        setDialogMessage("Proposal resubmitted successfully.");
        setExpandedRowId(null);
      } else {
        setDialogTitle("Error");
        setDialogMessage(result.error || "Error resubmitting proposal.");
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage(error.message || "Failed to resubmit the proposal.");
    } finally {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const loanListingValueTotal = () => {
    let loanTotal = loanListings.reduce((total, loan) => {
      return total + (parseFloat(loan.value) || 0);
    }, 0);

    return loanTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSearchChangeLoanListings = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanListings(term);

    const filteredListings = loanListings.filter(
      (listing) =>
        listing.title?.toLowerCase().includes(term) ||
        listing.description?.toLowerCase().includes(term)
    );

    setFilteredLoanListings(filteredListings);
  };

  const handleSearchChangeLoanProposals = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanProposals(term);

    const filteredProposals = loanProposals.filter(
      (loan) =>
        loan.title?.toLowerCase().includes(term) ||
        loan.description?.toLowerCase().includes(term)
    );

    setFilteredLoanProposals(filteredProposals);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteProposal = async (proposalId) => {
    const endpoint = `${API}/lenders/${user.id}/proposals/${proposalId}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setDialogTitle("Success");
        setDialogMessage("Proposal deleted successfully.");
        // Remove the deleted proposal from the state
        setLoanProposals(loanProposals.filter(proposal => proposal.id !== proposalId));
        setFilteredLoanProposals(filteredLoanProposals.filter(proposal => proposal.id !== proposalId));
        setExpandedRowId(null);
      } else {
        const result = await response.json();
        setDialogTitle("Error");
        setDialogMessage(result.error || "Error deleting proposal.");
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage(error.message || "Failed to delete the proposal.");
    } finally {
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/lenders/${user.id}/proposals`, options)
      .then((res) => res.json())
      .then((data) => {
        // FIX THIS HACK LATER
        if (!data.error) {
          setLoanProposals(data);
          setFilteredLoanProposals(data);
        }
      })
      .catch((err) => console.log(err));
    fetch(`${API}/lenders/${user.id}/requests`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoanListings(data);

        setFilteredLoanListings(data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="lender-dashboard" style={{ backgroundColor: "#f6f7f8" }}>
      <AppBar position="static" sx={{ backgroundColor: "#00a250" }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" sx={{ color: "#f6f7f8" }}>
                Welcome
              </Typography>
              <Typography variant="h6" sx={{ color: "#f6f7f8" }}>
                <em>{user.business_name}</em>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Loan Listings Table - SEND Proposal (POST) */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
            <Typography
              variant="h5"
              sx={{ color: "#00a250", marginBottom: 2, textAlign: "center" }}
            >
              The Loans Marketplace
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#00a250", marginBottom: 2, textAlign: "center" }}
            >
              Current Loans Marketplace Volume: {loanListingValueTotal()}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
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
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Title", "Purpose of Loan", "Loan Amount", "Date"].map(
                      (header) => (
                        <TableCell
                          key={header}
                          align="center"
                          sortDirection={
                            orderBy === header.toLowerCase() ? order : false
                          }
                        >
                          <TableSortLabel
                            active={orderBy === header.toLowerCase()}
                            direction={
                              orderBy === header.toLowerCase() ? order : "asc"
                            }
                            onClick={() =>
                              handleRequestSort(header.toLowerCase())
                            }
                          >
                            {header}
                          </TableSortLabel>
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLoanListings
                    .slice(
                      pageBorrowers * rowsPerPageBorrowers,
                      pageBorrowers * rowsPerPageBorrowers +
                        rowsPerPageBorrowers
                    )
                    .map((loan) => (
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
                                              href={
                                                borrowerDetails.fico_score_link
                                              }
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
              count={filteredLoanListings.length}
              page={pageBorrowers}
              onPageChange={(event, newPage) => setPageBorrowers(newPage)}
              rowsPerPage={rowsPerPageBorrowers}
              onRowsPerPageChange={(event) =>
                setRowsPerPageBorrowers(parseInt(event.target.value, 10))
              }
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Loan Proposals Table - RESUBMIT Proposal (PUT) */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
            <Typography variant="h5" sx={{ color: "#00a250", marginBottom: 2 }}>
              Pending Loan Proposals
            </Typography>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <TextField
                  placeholder="Search Loan Proposals"
                  variant="outlined"
                  value={searchTermLoanProposals}
                  onChange={handleSearchChangeLoanProposals}
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
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "Title",
                      "Description",
                      "Loan Amount",
                      "Interest Rate",
                      "Repayment Term",
                      "Created At",
                      "Status",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        align={
                          header === "Loan Amount" || header === "Interest Rate"
                            ? "right"
                            : "center"
                        }
                        sortDirection={
                          orderBy === header.toLowerCase() ? order : false
                        }
                      >
                        <TableSortLabel
                          active={orderBy === header.toLowerCase()}
                          direction={
                            orderBy === header.toLowerCase() ? order : "asc"
                          }
                          onClick={() =>
                            handleRequestSort(header.toLowerCase())
                          }
                        >
                          {header}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLoanProposals
                    .slice(
                      pageLoanProposals * rowsPerPageLoanProposals,
                      pageLoanProposals * rowsPerPageLoanProposals +
                        rowsPerPageLoanProposals
                    )
                    .map((loan) => (
                      <React.Fragment key={loan.id}>
                        <TableRow
                          hover
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            toggleRowExpansion(loan.id, loan.borrower_id, loan)
                          }
                        >
                          <TableCell align="center" sx={{ color: "#00a250" }}>
                            {loan.title}
                          </TableCell>
                          <TableCell align="center">
                            {loan.description}
                          </TableCell>
                          <TableCell align="right">
                            {parseFloat(loan.loan_amount).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {parseFloat(loan.interest_rate).toFixed(2)}%
                          </TableCell>
                          <TableCell align="center">
                            {loan.repayment_term} months
                          </TableCell>
                          <TableCell align="center">
                            {new Date(loan.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            {loan.accepted === null
                              ? "Pending"
                              : loan.accepted
                              ? "Accepted"
                              : "Rejected"}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProposal(loan.id);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>

                        {/* Collapsible row for borrower details and RESEND proposal form */}
                        {expandedRowId === loan.id && (
                          <TableRow key={`${loan.id}-collapse`}>
                            <TableCell colSpan={8}>
                              <Collapse in={expandedRowId === loan.id}>
                                <Box
                                  margin={2}
                                  sx={{
                                    backgroundColor: "#fff",
                                    padding: 2,
                                    borderRadius: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Grid container spacing={2}>
                                    {/* Borrower Info on Left */}
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
                                              href={
                                                borrowerDetails.fico_score_link
                                              }
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

                                    {/* Proposal Form on Right */}
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: "#00a250",
                                          marginBottom: 1,
                                        }}
                                      >
                                        Edit Loan Proposal
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
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
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
                                            onClick={handleResubmitProposal}
                                          >
                                            Resend Proposal
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            sx={{
                                              marginRight: 2,
                                              backgroundColor: "darkred",
                                              "&:hover": {
                                                backgroundColor: "#b30000",
                                              },
                                            }}
                                            onClick={() => handleDeleteProposal(loan.id)}
                                          >
                                            Delete
                                          </Button>
                                          <Button
                                            variant="contained"
                                            sx={{
                                              backgroundColor: "gray",
                                              color: "#fff",
                                              "&:hover": {
                                                backgroundColor: "black",
                                              },
                                            }}
                                            onClick={() => setExpandedRowId(null)}
                                          >
                                            Cancel
                                          </Button>
                                        </Box>
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
              count={filteredLoanProposals.length}
              page={pageLoanProposals}
              onPageChange={(event, newPage) => setPageLoanProposals(newPage)}
              rowsPerPage={rowsPerPageLoanProposals}
              onRowsPerPageChange={(event) =>
                setRowsPerPageLoanProposals(parseInt(event.target.value, 10))
              }
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Dialog for Proposal Submission */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
LenderDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};