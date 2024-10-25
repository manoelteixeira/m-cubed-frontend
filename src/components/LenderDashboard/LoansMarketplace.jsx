import React, { useEffect, useState } from "react";
import {
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
  Link,
  Chip,
  TablePagination,
  Paper,
  TableSortLabel,
  Alert,
} from "@mui/material";
import { Link as ReactLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API = import.meta.env.VITE_BASE_URL;

export default function LoansMarketplace({ user, token, loadLoanProposals }) {
  const [loanListings, setLoanListings] = useState([]);
  const [loanListingsLimit, setLoanListingsLimit] = useState(10);
  const [loanListingsOffset, setLoanListingsOffset] = useState(0);
  const [loanListingsTotal, setLoanListingsTotal] = useState(null);
  const [loanListingsValue, setLoanListingsValue] = useState(0);
  const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
  const [sortByLoanListings, setSortByLoanListings] = useState("created_at");
  const [sortOrderLoanListings, setSortOrderLoanListings] = useState("desc");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [creditReports, setCreditReports] = useState([]);
  const [viewedRows, setViewedRows] = useState(() => {
    const storedViewedRows = localStorage.getItem("viewedRowsMarketplace");
    return storedViewedRows ? JSON.parse(storedViewedRows) : [];
  });

  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    requirements: [""],
    expire_at: "",
    created_at: new Date().toLocaleDateString(),
  });

  const [newLoans, setNewLoans] = useState([]);
  const [expiringLoans, setExpiringLoans] = useState([]);

  const loadLoanListings = () => {
    let url = `${API}/lenders/${
      user.id
    }/requests?limit=${loanListingsLimit}&offset=${loanListingsOffset}&sort=${sortByLoanListings}&order=${sortOrderLoanListings}&timestamp=${new Date().getTime()}`;
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

        // New logic to track new loans created in the past 5 minutes
        const currentLoans = data.loan_requests;
        const newlyCreatedLoans = currentLoans.filter((loan) => {
          const createdAt = new Date(loan.created_at);
          const now = new Date();
          const timeDiff = (now - createdAt) / 1000; // Difference in seconds
          return timeDiff <= 300; // 5 minutes (300 seconds)
        });

        setNewLoans(newlyCreatedLoans.map((loan) => loan.id)); // Store only the IDs of new loans
        console.log("New Loans Count:", newlyCreatedLoans.length); // Log the count for debugging

        const today = new Date();
        const expiringLoansIds = currentLoans
          .filter((loan) => {
            const expireAt = new Date(loan.expire_at);
            const daysUntilExpire = Math.ceil(
              (expireAt - today) / (1000 * 60 * 60 * 24)
            );
            return daysUntilExpire <= 5 && daysUntilExpire >= 0;
          })
          .map((loan) => loan.id);

        setExpiringLoans(expiringLoansIds);
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
      localStorage.setItem("borrowerInfo",JSON.stringify(borrower))
      setCreditReports(credit_reports);
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  const handleProposalChange = (e) => {
    const { name, value } = e.target;
    setLenderProposal({ ...lenderProposal, [name]: value });
  };

  const addRequirement = () => {
    setLenderProposal((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = [...lenderProposal.requirements];
    newRequirements.splice(index, 1);
    setLenderProposal((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const handleSendProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount.replace(/,/g, "")),
      interest_rate: parseFloat(lenderProposal.interest_rate),
      repayment_term: parseInt(lenderProposal.repayment_term, 10),
      expire_at: new Date(lenderProposal.expire_at).toISOString(),
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
        loadLoanListings();
      } else {
        alert(result.error || "Error sending proposal.");
      }
    } catch (error) {
      alert(error.message || "Failed to send the proposal.");
    }
  };

  const toggleRowExpansion = (rowId, borrowerId, loanAmount) => {
    if (!viewedRows.includes(rowId)) {
      const newViewedRows = [...viewedRows, rowId];
      setViewedRows(newViewedRows);
      localStorage.setItem(
        "viewedRowsMarketplace",
        JSON.stringify(newViewedRows)
      );
    }

    if (expandedRowId !== rowId) {
      fetchBorrowerDetails(borrowerId);
      setLenderProposal((prev) => ({
        ...prev,
        loan_amount: parseFloat(loanAmount).toLocaleString("en-US"),
      }));
      setNewLoans((prev) => prev.filter((loanId) => loanId !== rowId)); // Remove the loan ID from the new loans array
    }

    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const handleSearchChangeLoanListings = (event) => {
    setSearchTermLoanListings(event.target.value.toLowerCase());
  };

  const handleSort = (sortKey) => {
    const isAsc =
      sortByLoanListings === sortKey && sortOrderLoanListings === "asc";
    setSortByLoanListings(sortKey);
    setSortOrderLoanListings(isAsc ? "desc" : "asc");
    loadLoanListings();
  };

  useEffect(() => {
    loadLoanListings();
  }, [
    loanListingsLimit,
    loanListingsOffset,
    sortByLoanListings,
    sortOrderLoanListings,
  ]);
  console.log(borrowerDetails)

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#f6f7f8",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#00a250", marginBottom: 3 }}
        >
          The Loans Marketplace
        </Typography>

        {newLoans.length > 0 && (
          <Alert
            severity="info"
            sx={{
              marginBottom: -3,
              backgroundColor: "transparent",
              color: "#00a250",
              "& .MuiAlert-icon": {
                color: "#00a250",
              },
            }}
          >
            You have {newLoans.length} new loan requests in the marketplace.
          </Alert>
        )}

        {expiringLoans.length > 0 ? (
          <Alert
            severity="warning"
            sx={{
              marginBottom: 0,
              backgroundColor: "transparent",
              color: "darkred",
              "& .MuiAlert-icon": {
                color: "darkred",
              },
            }}
          >
            You have {expiringLoans.length} loan requests expiring in 5 days.
          </Alert>
        ) : (
          <Alert
            severity="info"
            sx={{
              marginBottom: 5,
              backgroundColor: "transparent",
              color: "#00a250",
              "& .MuiAlert-icon": {
                color: "#00a250",
              },
            }}
          >
            No loan requests are expiring in the next 5 days.
          </Alert>
        )}

        <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={0}
              sx={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f6f7f8",
              }}
            >
              <Typography variant="h6" sx={{ color: "#00A250" }}>
                Total Loan Listings
              </Typography>
              <Typography variant="h4" sx={{ color: "#00A250" }}>
                {loanListingsTotal}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={0}
              sx={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f6f7f8",
              }}
            >
              <Typography variant="h6" sx={{ color: "#00A250" }}>
                Total Marketplace Volume
              </Typography>
              <Typography variant="h4" sx={{ color: "#00A250" }}>
                {loanListingsValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={0}
              sx={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#f6f7f8",
              }}
            >
              <Typography variant="h6" sx={{ color: "#00A250" }}>
                Average Loan Amount
              </Typography>
              <Typography variant="h4" sx={{ color: "#00A250" }}>
                {(loanListingsValue / (loanListingsTotal || 1)).toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
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
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { label: "Title", key: "title" },
                  { label: "Purpose of Loan", key: "description" },
                  { label: "Loan Amount", key: "value" },
                  { label: "Date", key: "created_at" },
                ].map(({ label, key }) => (
                  <TableCell
                    key={key}
                    align="center"
                    sx={{ color: "#00a250", fontWeight: "bold" }}
                  >
                    <TableSortLabel
                      active={sortByLoanListings === key}
                      direction={sortOrderLoanListings}
                      onClick={() => handleSort(key)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loanListings.map((loan) => (
                <React.Fragment key={loan.id}>
                  <TableRow
                    hover
                    style={{
                      cursor: "pointer",
                      backgroundColor: viewedRows.includes(loan.id)
                        ? "#d3d3d3"
                        : "#fff",
                    }}
                    onClick={() =>
                      toggleRowExpansion(loan.id, loan.borrower_id, loan.value)
                    }
                  >
                    <TableCell align="left" sx={{ color: "#00a250" }}>
                      {loan.title}
                      {newLoans.includes(loan.id) && (
                        <Chip
                          label="New"
                          size="small"
                          sx={{
                            backgroundColor: "#00A250",
                            color: "white",
                            marginLeft: 1,
                          }}
                        />
                      )}
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
                                  sx={{ color: "#00a250", marginBottom: 1 }}
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
                                              component={ReactLink}
                                              to={{
                                                pathname: "/mock-fico-score",
                                                state: { userInfo: borrowerDetails, borrowerId: loan.borrower_id } 
                                              }}
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
                                    <li>
                                      <Link
                                        component={ReactLink}
                                        to={{
                                          pathname: "/mock-sos-certificate",
                                          state: { userInfo: borrowerDetails} 
                                        }}
                                        rel="noopener"
                                        sx={{ color: "#00a250" }}
                                      >
                                        Secretary of State Certificate -
                                        Verified
                                      </Link>
                                    </li>
                                    <li>
                                      <ReactLink
                                        component={ReactLink}
                                        to={{
                                          pathname: "/mock-drivers-license",
                                          state: { userInfo: borrowerDetails, borrowerId: loan.borrower_id } 
                                        }}
                                        target="_blank"
                                        rel="noopener"
                                        sx={{ color: "#00a250" }}
                                      >
                                        Driver's License - Verified
                                      
                                      </ReactLink>
                                    </li>
                                  </ul>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography
                                  variant="h6"
                                  sx={{ color: "#00a250", marginBottom: 1 }}
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
                                  <TextField
                                    label="Expiration Date"
                                    fullWidth
                                    name="expire_at"
                                    type="date"
                                    value={lenderProposal.expire_at}
                                    onChange={handleProposalChange}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ marginBottom: 2 }}
                                  />
                                  <Button
                                    variant="contained"
                                    sx={{
                                      backgroundColor: "#00a250",
                                      color: "#fff",
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
          count={loanListingsTotal || 0}
          page={loanListingsOffset}
          onPageChange={(event, newPage) => setLoanListingsOffset(newPage)}
          rowsPerPage={loanListingsLimit}
          onRowsPerPageChange={(event) =>
            setLoanListingsLimit(event.target.value)
          }
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Box>
    </Grid>
  );
}

LoansMarketplace.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  loadLoanProposals: PropTypes.func,
};
