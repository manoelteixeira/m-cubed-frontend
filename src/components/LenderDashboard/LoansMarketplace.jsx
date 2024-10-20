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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;

export default function LoansMarketplace({ user, token, loadLoanProposals }) {
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
  const [creditReports, setCreditReports] = useState([]);
  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    additional_requirements: {
      downpayment: false,
      personal_guarantee: false,
      others: false,
    },
    created_at: new Date().toLocaleDateString(),
  });

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
        setLoanListings(data.loan_requests);
        setLoanListingsTotal(data.total);
        setLoanListingsValue(data.value);
      })
      .catch((err) => console.log(err));
  };

  const fetchBorrowerDetails = async (borrowerId) => {
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      const { borrower, credit_reports } = await res.json();
      setBorrowerDetails({
        ...borrower,
        fico_score_link: borrower.fico_score_link || "/mock-fico-score.pdf",
        secretary_of_state_link:
          borrower.secretary_of_state_link || "/mock-sos-certificate.pdf",
        drivers_license_link:
          borrower.drivers_license_link || "/mock-drivers-license.pdf",
      });
      setCreditReports(credit_reports);
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  const handleProposalChange = (e) => {
    setLenderProposal({ ...lenderProposal, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setLenderProposal((prev) => ({
      ...prev,
      additional_requirements: {
        ...prev.additional_requirements,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  const handleSendProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount.replace(/,/g, "")),
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
        loadLoanProposals();
      } else {
        alert(result.error || "Error sending proposal.");
      }
    } catch (error) {
      alert(error.message || "Failed to send the proposal.");
    }
  };

  const toggleRowExpansion = (rowId, borrowerId, loanAmount) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
    if (borrowerId && expandedRowId !== rowId) {
      fetchBorrowerDetails(borrowerId);
      setLenderProposal((prev) => ({
        ...prev,
        loan_amount: parseFloat(loanAmount).toLocaleString("en-US"),
      }));
    }
  };

  const handleSearchChangeLoanListings = (event) => {
    setSearchTermLoanListings(event.target.value.toLowerCase());
  };

  const handleSortChangeLoanListings = (event) => {
    setSortByLoanListings(event.target.value);
    loadLoanListings();
  };

  const handleSortOrderChangeLoanListings = () => {
    const newOrder = sortOrderLoanListings === "asc" ? "desc" : "asc";
    setSortOrderLoanListings(newOrder);
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
                      toggleRowExpansion(loan.id, loan.borrower_id, loan.value)
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
                                    <strong>Legal Name:</strong>{" "}
                                    {borrowerDetails.business_name}
                                  </Typography>
                                  <Typography>
                                    <strong>Industry:</strong>{" "}
                                    {borrowerDetails.industry}
                                  </Typography>
                                  <Typography>
                                    <strong>Location:</strong>{" "}
                                    {borrowerDetails.street},{" "}
                                    {borrowerDetails.city},{" "}
                                    {borrowerDetails.state}{" "}
                                    {borrowerDetails.zip_code}
                                  </Typography>

                                  <Typography
                                    variant="subtitle1"
                                    sx={{ mt: 2 }}
                                  >
                                    Credit Reports:
                                  </Typography>
                                  {creditReports.length > 0 ? (
                                    <ul>
                                      {creditReports.map((report, index) => {
                                        const isExpired =
                                          new Date(report.expire_at) <
                                          new Date();
                                        return (
                                          <li
                                            key={index}
                                            style={{
                                              color: isExpired
                                                ? "red"
                                                : "black",
                                            }}
                                          >
                                            Bureau: {report.credit_bureau},
                                            Score:{" "}
                                            <Link
                                              href={
                                                borrowerDetails.fico_score_link
                                              }
                                              target="_blank"
                                              sx={{ color: "#00a250" }}
                                            >
                                              {report.score}
                                            </Link>
                                            , Expires on:{" "}
                                            {new Date(
                                              report.expire_at
                                            ).toLocaleDateString()}{" "}
                                            {isExpired && "(EXPIRED)"}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  ) : (
                                    <Typography>
                                      No reports available
                                    </Typography>
                                  )}

                                  <Typography
                                    variant="subtitle1"
                                    sx={{ marginTop: 2 }}
                                  >
                                    Documents:
                                  </Typography>
                                  <ul>
                                    <li
                                      style={{
                                        color: creditReports.some(
                                          (report) =>
                                            new Date(report.expire_at) <
                                            new Date()
                                        )
                                          ? "red"
                                          : "#00a250",
                                      }}
                                    >
                                      Credit Score - Verified{" "}
                                      {creditReports.some(
                                        (report) =>
                                          new Date(report.expire_at) <
                                          new Date()
                                      ) && "(EXPIRED)"}
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
                                    label="Loan Amount"
                                    fullWidth
                                    name="loan_amount"
                                    value={lenderProposal.loan_amount}
                                    disabled
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
                                  <Typography variant="subtitle1">
                                    Additional Requirements
                                  </Typography>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          lenderProposal.additional_requirements
                                            .downpayment
                                        }
                                        onChange={handleCheckboxChange}
                                        name="downpayment"
                                        sx={{
                                          color: "#00a250",
                                          "&.Mui-checked": {
                                            color: "#00a250",
                                          },
                                        }}
                                      />
                                    }
                                    label="Downpayment"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          lenderProposal.additional_requirements
                                            .personal_guarantee
                                        }
                                        onChange={handleCheckboxChange}
                                        name="personal_guarantee"
                                        sx={{
                                          color: "#00a250",
                                          "&.Mui-checked": {
                                            color: "#00a250",
                                          },
                                        }}
                                      />
                                    }
                                    label="Personal Guarantee"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          lenderProposal.additional_requirements
                                            .others
                                        }
                                        onChange={handleCheckboxChange}
                                        name="others"
                                        sx={{
                                          color: "#00a250",
                                          "&.Mui-checked": {
                                            color: "#00a250",
                                          },
                                        }}
                                      />
                                    }
                                    label="Others"
                                  />
                                  <TextField
                                    label="Description"
                                    fullWidth
                                    name="description"
                                    value={lenderProposal.description}
                                    onChange={handleProposalChange}
                                    multiline
                                    rows={3}
                                    sx={{ marginTop: 2, marginBottom: 2 }}
                                  />
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      gap: "10px",
                                      marginTop: 2,
                                    }}
                                  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        backgroundColor: "#00a250",
                                        color: "#fff",
                                        "&:hover": {
                                          backgroundColor: "#007a3e",
                                        },
                                      }}
                                      onClick={handleSendProposal}
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
  loadLoanProposals: PropTypes.func,
};
