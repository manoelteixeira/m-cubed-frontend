import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;
// adding a comment to test the CI/CD pipeline
const BDashboard = ({ user, token }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState({});
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [acceptedProposals, setAcceptedProposals] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    fetch(`${API}/borrowers/${user.id}/requests`, options)
      .then((res) => res.json())
      .then((data) => {
        let requestsProposals = {};
        let fetchPromises = data.map((request) =>
          fetch(
            `${API}/borrowers/${user.id}/requests/${request.id}/proposals`,
            options
          )
            .then((res) => res.json())
            .then((proposalData) => {
              requestsProposals[request.id] = proposalData;
            })
        );

        Promise.all(fetchPromises).then(() => {
          setRequests(data);
          setProposals(requestsProposals);
        });
      })
      .catch((err) => setError("Error fetching data: " + err.message))
      .finally(() => setLoading(false));
  }, [user, token]);

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  const handleAcceptProposal = async (proposalId, requestId) => {
    const selected = proposals[requestId].find((p) => p.id === proposalId);
    const options = {
      method: "PUT",
      body: JSON.stringify({ proposal_id: proposalId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const response = await fetch(
        `${API}/borrowers/${user.id}/requests/${requestId}/proposals/`,
        options
      );
      if (response.ok) {
        setAcceptedProposals((prev) => ({ ...prev, [requestId]: proposalId }));
        setSelectedProposal(selected);
        setDialogOpen(true);
      } else {
        throw new Error("Failed to accept proposal.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const sortProposals = (proposals) => {
    const sortedProposals = [...proposals];
    if (sortConfig.key) {
      sortedProposals.sort((a, b) => {
        const valA =
          sortConfig.key === "monthlyPayment"
            ? (a.loan_amount * (1 + a.interest_rate / 100)) / a.repayment_term
            : a[sortConfig.key];
        const valB =
          sortConfig.key === "monthlyPayment"
            ? (b.loan_amount * (1 + b.interest_rate / 100)) / b.repayment_term
            : b[sortConfig.key];

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortedProposals;
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const openLoanApplicationForm = () => {
    navigate(`/borrowers/new-request`);
  };

  return (
    <Box sx={{ padding: "20px", paddingTop: "50px", paddingBottom: "80px" }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#f6f7f8",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ color: "black", textAlign: "left" }}>
              Welcome,{" "}
              <span style={{ color: "#00A250" }}>{user.business_name}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "black", textAlign: "left" }}
            >
              What can we do to get your funding moving today? Your loan details
              and updates are ready below.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00A250",
                color: "#f6f7f8",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0, 162, 80, 0.5)",
                  backgroundColor: "#75D481",
                },
              }}
              startIcon={<AddIcon />}
              onClick={openLoanApplicationForm}
            >
              Start your Loan Request
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* KPI Section */}
      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#00A250" }}>
              Total Loan Requests
            </Typography>
            <Typography variant="h4" sx={{ color: "#00A250" }}>
              {requests.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#00A250" }}>
              Loan Requests with Proposals
            </Typography>
            <Typography variant="h4" sx={{ color: "#00A250" }}>
              {
                requests.filter(
                  (request) =>
                    proposals[request.id] && proposals[request.id].length > 0
                ).length
              }
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#00A250" }}>
              Total Loan Amount Requested
            </Typography>
            <Typography variant="h4" sx={{ color: "#00A250" }}>
              $
              {requests
                .reduce((total, request) => {
                  return total + (parseFloat(request.value) || 0);
                }, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Loan Requests Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#00A250" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ color: "#00A250" }}>
                Purpose of Loan
              </TableCell>
              <TableCell sx={{ color: "#00A250" }}>Loan Amount</TableCell>
              <TableCell sx={{ color: "#00A250" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <React.Fragment key={request.id}>
                <TableRow hover onClick={() => handleRowClick(request.id)}>
                  <TableCell
                    align="left"
                    sx={{ cursor: "pointer", color: "#00A250" }}
                  >
                    {request.title}
                  </TableCell>
                  <TableCell align="left" sx={{ cursor: "pointer" }}>
                    {request.description}
                  </TableCell>
                  <TableCell sx={{ cursor: "pointer" }}>
                    $
                    {request.value
                      ? parseFloat(request.value).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      color: proposals[request.id]?.length
                        ? "#056612"
                        : "#8B0000",
                    }}
                  >
                    {proposals[request.id]?.length ? "Active" : "Pending"}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} sx={{ padding: 0, border: 0 }}>
                    <Collapse
                      in={expandedRow === request.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Card
                        elevation={2}
                        sx={{
                          backgroundColor: "#fff",
                          margin: 2,
                          textAlign: "center",
                        }}
                      >
                        <Box sx={{ padding: "20px" }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: "bold",
                              color: "#056612",
                              marginBottom: "20px",
                            }}
                          >
                            LOAN PROPOSALS
                          </Typography>
                          {proposals[request.id]?.length > 0 ? (
                            <TableContainer component={Paper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <Tooltip title="Sort">
                                        <TableSortLabel
                                          active={
                                            sortConfig.key === "loan_amount"
                                          }
                                          direction={sortConfig.direction}
                                          onClick={() =>
                                            handleSort("loan_amount")
                                          }
                                        >
                                          Loan Amount Offered
                                        </TableSortLabel>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                      <Tooltip title="Sort">
                                        <TableSortLabel
                                          active={
                                            sortConfig.key === "interest_rate"
                                          }
                                          direction={sortConfig.direction}
                                          onClick={() =>
                                            handleSort("interest_rate")
                                          }
                                        >
                                          Interest Rate
                                        </TableSortLabel>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                      <Tooltip title="Sort">
                                        <TableSortLabel
                                          active={
                                            sortConfig.key === "repayment_term"
                                          }
                                          direction={sortConfig.direction}
                                          onClick={() =>
                                            handleSort("repayment_term")
                                          }
                                        >
                                          Term Length (months)
                                        </TableSortLabel>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                      <Tooltip title="Sort">
                                        <TableSortLabel
                                          active={
                                            sortConfig.key === "monthlyPayment"
                                          }
                                          direction={sortConfig.direction}
                                          onClick={() =>
                                            handleSort("monthlyPayment")
                                          }
                                        >
                                          Monthly Payment
                                        </TableSortLabel>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                      <Tooltip title="Sort">
                                        <TableSortLabel
                                          active={
                                            sortConfig.key ===
                                            "totalInterestPaid"
                                          }
                                          direction={sortConfig.direction}
                                          onClick={() =>
                                            handleSort("totalInterestPaid")
                                          }
                                        >
                                          Total Interest Paid
                                        </TableSortLabel>
                                      </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                      Decision
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {sortProposals(proposals[request.id]).map(
                                    (offer) => {
                                      const monthlyPayment =
                                        (offer.loan_amount *
                                          (1 + offer.interest_rate / 100)) /
                                        offer.repayment_term;
                                      const totalInterestPaid =
                                        monthlyPayment * offer.repayment_term -
                                        offer.loan_amount;

                                      return (
                                        <TableRow key={offer.id}>
                                          <TableCell align="center">
                                            $
                                            {parseFloat(
                                              offer.loan_amount
                                            ).toLocaleString("en-US", {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            })}
                                          </TableCell>
                                          <TableCell align="center">
                                            {offer.interest_rate}%
                                          </TableCell>
                                          <TableCell align="center">
                                            {offer.repayment_term}
                                          </TableCell>
                                          <TableCell align="center">
                                            $
                                            {monthlyPayment.toLocaleString(
                                              "en-US",
                                              {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                              }
                                            )}
                                          </TableCell>
                                          <TableCell align="center">
                                            $
                                            {totalInterestPaid.toLocaleString(
                                              "en-US",
                                              {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                              }
                                            )}
                                          </TableCell>
                                          <TableCell align="center">
                                            <Button
                                              variant="contained"
                                              sx={{
                                                backgroundColor: "#00A250",
                                                color: "#f6f7f8",
                                              }}
                                              onClick={() =>
                                                handleAcceptProposal(
                                                  offer.id,
                                                  request.id
                                                )
                                              }
                                              disabled={
                                                acceptedProposals[
                                                  request.id
                                                ] !== undefined &&
                                                acceptedProposals[
                                                  request.id
                                                ] !== offer.id
                                              }
                                            >
                                              {acceptedProposals[request.id] ===
                                              offer.id
                                                ? "Accepted"
                                                : acceptedProposals[request.id]
                                                ? "Rejected"
                                                : "Accept"}
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    }
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <Typography variant="body2">
                              No proposals available yet.
                            </Typography>
                          )}
                        </Box>
                      </Card>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Proposal Accepted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have accepted the following proposal:
            <ul>
              <li>
                <strong>Loan Amount Offered:</strong> $
                {selectedProposal?.loan_amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </li>
              <li>
                <strong>Interest Rate:</strong>{" "}
                {selectedProposal?.interest_rate}%
              </li>
              <li>
                <strong>Term Length:</strong> {selectedProposal?.repayment_term}{" "}
                months
              </li>
              <li>
                <strong>Monthly Payment:</strong> $
                {(
                  (selectedProposal?.loan_amount *
                    (1 + selectedProposal?.interest_rate / 100)) /
                  selectedProposal?.repayment_term
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </li>
              <li>
                <strong>Total Interest Paid:</strong> $
                {(
                  ((selectedProposal?.loan_amount *
                    (1 + selectedProposal?.interest_rate / 100)) /
                    selectedProposal?.repayment_term) *
                    selectedProposal?.repayment_term -
                  selectedProposal?.loan_amount
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

BDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default BDashboard;
