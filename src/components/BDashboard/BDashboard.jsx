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
  Snackbar,
  IconButton,
  Chip,
  Alert,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;

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
  const [notifications, setNotifications] = useState([]);
  const [noExpiringProposals, setNoExpiringProposals] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [viewedRows, setViewedRows] = useState(() => {
    const storedViewedRows = localStorage.getItem(
      "viewedRowsBorrowerDashboard"
    );
    return storedViewedRows ? JSON.parse(storedViewedRows) : [];
  });

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
          checkForExpiringProposals(requestsProposals);
        });
      })
      .catch((err) => setError("Error fetching data: " + err.message))
      .finally(() => setLoading(false));
  }, [user, token]);

  const checkForExpiringProposals = (requestsProposals) => {
    const expiringProposals = [];
    const today = new Date();

    Object.keys(requestsProposals).forEach((requestId) => {
      requestsProposals[requestId].forEach((proposal) => {
        const expireDate = new Date(proposal.expire_at);
        const timeDiff = expireDate - today;
        const daysUntilExpire = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysUntilExpire <= 5 && daysUntilExpire > 0) {
          expiringProposals.push({
            requestId,
            proposalId: proposal.id,
            title: proposal.title,
            expireDate: expireDate.toLocaleDateString(),
          });
        }
      });
    });

    setNotifications(expiringProposals);
    setNoExpiringProposals(expiringProposals.length === 0);
    setSnackbarOpen(expiringProposals.length > 0);
  };

  const handleRowClick = (rowId) => {
    if (!viewedRows.includes(rowId)) {
      const updatedViewedRows = [...viewedRows, rowId];
      setViewedRows(updatedViewedRows);
      localStorage.setItem(
        "viewedRowsBorrowerDashboard",
        JSON.stringify(updatedViewedRows)
      );
    }

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

  const isNewProposal = (createdAt, requestId) => {
    const today = new Date();
    const proposalDate = new Date(createdAt);
    const timeDiff = today - proposalDate;
    const daysSinceCreated = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysSinceCreated <= 7 && !viewedRows.includes(requestId);
  };

  const isNewLoanRequest = (createdAt, requestId) => {
    const today = new Date();
    const requestDate = new Date(createdAt);
    const timeDiff = today - requestDate;
    const daysSinceCreated = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysSinceCreated <= 7 && !viewedRows.includes(requestId);
  };

  return (
    <Box sx={{ padding: "20px", paddingTop: "50px", paddingBottom: "80px" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={`You have ${notifications.length} proposals expiring within 5 days.`}
        action={
          <>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" sx={{ color: "#00a250" }} />
            </IconButton>
          </>
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "transparent",
            color: "#fff",
          },
        }}
      />

      {noExpiringProposals && (
        <Alert
          severity="info"
          sx={{
            marginBottom: 3,
            backgroundColor: "transparent",
            color: "#00a250",
            "& .MuiAlert-icon": {
              color: "#00a250",
            },
          }}
        >
          No proposals are expiring in the next 5 days.
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#f6f7f8",
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

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#00A250" }}>
                <Tooltip title="Sort">
                  <TableSortLabel
                    active={sortConfig.key === "title"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ color: "#00A250" }}>
                <Tooltip title="Sort">
                  <TableSortLabel
                    active={sortConfig.key === "description"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("description")}
                  >
                    Purpose of Loan
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ color: "#00A250" }}>
                <Tooltip title="Sort">
                  <TableSortLabel
                    active={sortConfig.key === "value"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("value")}
                  >
                    Loan Amount
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ color: "#00A250" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => {
              const today = new Date();
              const expireDate = new Date(request.expire_at);
              const timeDiff = expireDate - today;
              const daysUntilExpire = Math.ceil(
                timeDiff / (1000 * 60 * 60 * 24)
              );

              return (
                <React.Fragment key={request.id}>
                  <TableRow
                    hover
                    onClick={() => handleRowClick(request.id)}
                    style={{
                      backgroundColor: viewedRows.includes(request.id)
                        ? "#d3d3d3"
                        : "#fff",
                    }}
                  >
                    <TableCell
                      align="left"
                      sx={{ cursor: "pointer", color: "#00A250" }}
                    >
                      {request.title}
                      {daysUntilExpire <= 5 && (
                        <Chip
                          label="Exp"
                          size="small"
                          sx={{
                            backgroundColor: "red",
                            color: "white",
                            marginLeft: 1,
                          }}
                        />
                      )}
                      {isNewLoanRequest(request.created_at, request.id) && (
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
                    <TableCell align="left" sx={{ cursor: "pointer" }}>
                      {request.description}
                    </TableCell>
                    <TableCell align="center" sx={{ cursor: "pointer" }}>
                      $
                      {request.value
                        ? parseFloat(request.value).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell
                      align="center"
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
                                fontSize: "1.5rem",
                              }}
                            >
                              LOAN PROPOSALS
                            </Typography>
                            {proposals[request.id]?.length > 0 ? (
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
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
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
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
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
                                        <Tooltip title="Sort">
                                          <TableSortLabel
                                            active={
                                              sortConfig.key ===
                                              "repayment_term"
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
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
                                        <Tooltip title="Sort">
                                          <TableSortLabel
                                            active={
                                              sortConfig.key ===
                                              "monthlyPayment"
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
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
                                        Expiration Date
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
                                        Requirements
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{ color: "#00A250" }}
                                      >
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
                                              {(
                                                offer.interest_rate * 100
                                              ).toFixed(2)}
                                              %
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
                                              {new Date(
                                                offer.expire_at
                                              ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="center">
                                              <ul>
                                                {offer.requirements.map(
                                                  (req, idx) => (
                                                    <li key={idx}>{req}</li>
                                                  )
                                                )}
                                              </ul>
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
                                                {acceptedProposals[
                                                  request.id
                                                ] === offer.id
                                                  ? "Accepted"
                                                  : acceptedProposals[
                                                      request.id
                                                    ]
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
              );
            })}
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
                {(selectedProposal?.interest_rate * 100).toFixed(2)}%
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
