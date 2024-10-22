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
  IconButton,
  TablePagination,
  Paper,
  TableSortLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

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
  const [submittedProposals, setSubmittedProposals] = useState([]); // Track submitted proposals
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

  // Load submitted proposals from local storage
  useEffect(() => {
    const storedProposals = localStorage.getItem("submittedProposals");
    if (storedProposals) {
      setSubmittedProposals(JSON.parse(storedProposals));
    }
  }, []);

  // Function to load loan listings
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
    const { name, value } = e.target;
    setLenderProposal({ ...lenderProposal, [name]: value });
  };

  const handleRequirementsChange = (index, value) => {
    const newRequirements = [...lenderProposal.requirements];
    newRequirements[index] = value;
    setLenderProposal((prev) => ({ ...prev, requirements: newRequirements }));
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

        // Add the loan ID to the submittedProposals list
        const updatedSubmittedProposals = [
          ...submittedProposals,
          expandedRowId,
        ];
        setSubmittedProposals(updatedSubmittedProposals);

        // Store the submitted proposals in localStorage
        localStorage.setItem(
          "submittedProposals",
          JSON.stringify(updatedSubmittedProposals)
        );

        // Remove the loan listing that was just proposed from the frontend state
        setLoanListings((prev) =>
          prev.filter((loan) => loan.id !== expandedRowId)
        );

        setExpandedRowId(null);

        // Load loan proposals to update the proposals table
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

  // Filter out loans that have already had proposals submitted
  const filteredLoanListings = loanListings.filter(
    (loan) => !submittedProposals.includes(loan.id)
  );

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

      <Box sx={{ padding: 3, backgroundColor: "#f6f7f8", border: "none" }}>
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
              {filteredLoanListings.map((loan) => (
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
                                    sx={{
                                      marginBottom: 2,
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#00a250",
                                        },
                                      },
                                    }}
                                  />
                                  <TextField
                                    label="Description"
                                    fullWidth
                                    name="description"
                                    value={lenderProposal.description}
                                    onChange={handleProposalChange}
                                    multiline
                                    rows={3}
                                    sx={{
                                      marginBottom: 2,
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#00a250",
                                        },
                                      },
                                    }}
                                  />
                                  <TextField
                                    label="Loan Amount"
                                    fullWidth
                                    name="loan_amount"
                                    value={lenderProposal.loan_amount}
                                    disabled
                                    sx={{
                                      marginBottom: 2,
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#00a250",
                                        },
                                      },
                                    }}
                                  />
                                  <TextField
                                    label="Interest Rate"
                                    fullWidth
                                    name="interest_rate"
                                    value={lenderProposal.interest_rate}
                                    onChange={handleProposalChange}
                                    sx={{
                                      marginBottom: 2,
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#00a250",
                                        },
                                      },
                                    }}
                                  />
                                  <TextField
                                    label="Repayment Term"
                                    fullWidth
                                    name="repayment_term"
                                    value={lenderProposal.repayment_term}
                                    onChange={handleProposalChange}
                                    sx={{
                                      marginBottom: 2,
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#00a250",
                                        },
                                      },
                                    }}
                                  />

                                  <TextField
                                    label="Expiration Date"
                                    fullWidth
                                    name="expire_at"
                                    type="date"
                                    value={lenderProposal.expire_at}
                                    onChange={handleProposalChange}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    sx={{
                                      marginBottom: 2,
                                      "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                          borderColor: "#00a250",
                                        },
                                      },
                                    }}
                                  />

                                  <Typography variant="subtitle1">
                                    Requirements
                                  </Typography>
                                  {lenderProposal.requirements.map(
                                    (requirement, index) => (
                                      <Grid
                                        container
                                        key={index}
                                        spacing={1}
                                        alignItems="center"
                                      >
                                        <Grid item xs={10}>
                                          <FormControl fullWidth>
                                            <InputLabel
                                              id={`requirement-label-${index}`}
                                            >
                                              Select Requirement
                                            </InputLabel>
                                            <Select
                                              labelId={`requirement-label-${index}`}
                                              value={requirement}
                                              onChange={(e) =>
                                                handleRequirementsChange(
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                              sx={{
                                                marginBottom: 2,
                                                "& .MuiOutlinedInput-root": {
                                                  "& fieldset": {
                                                    borderColor: "#00a250",
                                                  },
                                                },
                                              }}
                                            >
                                              <MenuItem value="None">
                                                None
                                              </MenuItem>
                                              <MenuItem value="Downpayment">
                                                Downpayment
                                              </MenuItem>
                                              <MenuItem value="Personal Guarantee">
                                                Personal Guarantee
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                          <IconButton
                                            color="error"
                                            onClick={() =>
                                              removeRequirement(index)
                                            }
                                          >
                                            <RemoveCircle />
                                          </IconButton>
                                        </Grid>
                                      </Grid>
                                    )
                                  )}
                                  <Button
                                    startIcon={
                                      <AddCircle sx={{ color: "#00a250" }} />
                                    }
                                    sx={{ marginBottom: 2, color: "#00a250" }}
                                    onClick={addRequirement}
                                  >
                                    Add Requirement
                                  </Button>

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
          count={loanListingsTotal || 0}
          page={loanListingsOffset}
          onPageChange={(event, newPage) => setLoanListingsOffset(newPage)}
          rowsPerPage={loanListingsLimit}
          onRowsPerPageChange={(event) =>
            setLoanListingsLimit(event.target.value)
          }
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
