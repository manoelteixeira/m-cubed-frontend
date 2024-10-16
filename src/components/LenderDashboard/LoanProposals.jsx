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
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Collapse,
  Box,
  Link,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;

export default function LoanProposals({ user, token }) {
  const [loanProposals, setLoanProposals] = useState([]);
  const [filteredLoanProposals, setFilteredLoanProposals] = useState([]);
  const [pageLoanProposals, setPageLoanProposals] = useState(0);
  const [rowsPerPageLoanProposals, setRowsPerPageLoanProposals] = useState(5);
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [sortByLoanProposals, setSortByLoanProposals] = useState("created_at");
  const [sortOrderLoanProposals, setSortOrderLoanProposals] = useState("desc");

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

  // Fetch loan proposals from the API
  const loadLoanProposals = () => {
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/lenders/${user.id}/proposals`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoanProposals(data);
        setFilteredLoanProposals(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetch borrower details for expanded rows
  const fetchBorrowerDetails = async (borrowerId) => {
    if (!borrowerId) return; // Ensure borrowerId is not null or undefined
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      if (!res.ok) throw new Error("Failed to fetch borrower details");
      const data = await res.json();
      setBorrowerDetails({
        business_name: data.business_name || "N/A",
        industry: data.industry || "N/A",
        credit_score: data.credit_score || "N/A",
        street: data.street || "N/A",
        city: data.city || "N/A",
        state: data.state || "N/A",
        zip_code: data.zip_code || "N/A",
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

  // Handle row expansion and fetch borrower details
  const toggleRowExpansion = (rowId, borrowerId, proposal) => {
    if (expandedRowId === rowId) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(rowId);
      fetchBorrowerDetails(borrowerId); // Fetch details when the row is expanded
      if (proposal) {
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

  // Handle input changes for lender proposal form
  const handleProposalChange = (event) => {
    const { name, value } = event.target;
    setLenderProposal((prevProposal) => ({
      ...prevProposal,
      [name]: value,
    }));
  };

  // Resubmit (edit) loan proposal function (PUT)
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
        alert("Proposal resubmitted successfully.");
        setExpandedRowId(null);
      } else {
        alert(result.error || "Error resubmitting proposal.");
      }
    } catch (error) {
      alert(error.message || "Failed to resubmit the proposal.");
    }
  };

  // Handle sorting
  const sortLoanProposals = (sortBy, sortOrder) => {
    const sorted = [...filteredLoanProposals].sort((a, b) => {
      if (sortBy === "loan_amount" || sortBy === "interest_rate") {
        return sortOrder === "asc"
          ? a[sortBy] - b[sortBy]
          : b[sortBy] - a[sortBy];
      } else if (sortBy === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else {
        return sortOrder === "asc"
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy]);
      }
    });
    setFilteredLoanProposals(sorted);
  };

  // Sorting function
  const handleSortChangeLoanProposals = (event) => {
    setSortByLoanProposals(event.target.value);
    sortLoanProposals(event.target.value, sortOrderLoanProposals);
  };

  const handleSortOrderChangeLoanProposals = () => {
    const newOrder = sortOrderLoanProposals === "asc" ? "desc" : "asc";
    setSortOrderLoanProposals(newOrder);
    sortLoanProposals(sortByLoanProposals, newOrder);
  };

  // Handle search
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

  useEffect(() => {
    loadLoanProposals();
  }, [user]);

  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
        <Typography variant="h5" sx={{ color: "#00a250", marginBottom: 2 }}>
          Loan Proposals
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
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
          <Grid item>
            <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
              <InputLabel id="sort-loan-proposals-label">Sort By</InputLabel>
              <Select
                labelId="sort-loan-proposals-label"
                value={sortByLoanProposals}
                onChange={handleSortChangeLoanProposals}
                label="Sort By"
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="loan_amount">Loan Amount</MenuItem>
                <MenuItem value="interest_rate">Interest Rate</MenuItem>
                <MenuItem value="created_at">Created At</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleSortOrderChangeLoanProposals}
              startIcon={<SortIcon />}
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#007a3e",
                },
              }}
            >
              {sortOrderLoanProposals === "asc" ? "Ascending" : "Descending"}
            </Button>
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
                  >
                    {header}
                  </TableCell>
                ))}
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
                      <TableCell align="center">{loan.description}</TableCell>
                      <TableCell align="right">
                        {parseFloat(loan.loan_amount).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
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
                                    sx={{ color: "#00a250", marginBottom: 1 }}
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

                                {/* Proposal Form on Right */}
                                <Grid item xs={6}>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#00a250", marginBottom: 1 }}
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
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        marginTop: 2,
                                      }}
                                    >
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
  );
}

LoanProposals.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
