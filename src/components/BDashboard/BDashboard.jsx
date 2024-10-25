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
  const [proposals, setProposals] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const [acceptedProposals, setAcceptedProposals] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [proposalSortConfig, setProposalSortConfig] = useState({});
  const [viewedRows, setViewedRows] = useState(() => {
    const storedViewedRows = localStorage.getItem(
      "viewedRowsBorrowerDashboard"
    );
    return storedViewedRows ? JSON.parse(storedViewedRows) : [];
  });
  const [notifications, setNotifications] = useState([]);
  const [noExpiringProposals, setNoExpiringProposals] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newProposalNotif, setNewProposalNotif] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const options = { headers: { Authorization: token } };
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
          checkForNewProposals(requestsProposals);
        });
      });
  }, [user.id, token]);

  const checkForExpiringProposals = (requestsProposals) => {
    const expiringProposals = [];
    const today = new Date();

    Object.keys(requestsProposals).forEach((requestId) => {
      requestsProposals[requestId].forEach((proposal) => {
        const expireDate = new Date(proposal.expire_at);
        const daysUntilExpire = Math.ceil(
          (expireDate - today) / (1000 * 60 * 60 * 24)
        );

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

  const checkForNewProposals = (requestsProposals) => {
    const today = new Date();
    let hasNewProposal = false;

    Object.keys(requestsProposals).forEach((requestId) => {
      requestsProposals[requestId].forEach((proposal) => {
        const proposalDate = new Date(proposal.created_at);
        const daysSinceCreated = Math.ceil(
          (today - proposalDate) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceCreated <= 7) {
          hasNewProposal = true;
        }
      });
    });

    setNewProposalNotif(hasNewProposal);
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const handleProposalSort = (requestId, column) => {
    const currentConfig = proposalSortConfig[requestId] || {
      key: null,
      direction: "asc",
    };
    let direction = "asc";
    if (currentConfig.key === column && currentConfig.direction === "asc") {
      direction = "desc";
    }
    setProposalSortConfig((prev) => ({
      ...prev,
      [requestId]: { key: column, direction },
    }));
  };

  const sortedRequests = requests.slice().sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  const getSortedProposals = (requestId) => {
    const proposalsForRequest = proposals[requestId] || [];
    const config = proposalSortConfig[requestId];
    if (!config || !config.key) return proposalsForRequest;

    return [...proposalsForRequest].sort((a, b) => {
      let aValue, bValue;

      switch (config.key) {
        case "loan_amount":
          aValue = parseFloat(a.loan_amount) || 0;
          bValue = parseFloat(b.loan_amount) || 0;
          break;
        case "interest_rate":
          aValue = parseFloat(a.interest_rate) * 100 || 0;
          bValue = parseFloat(b.interest_rate) * 100 || 0;
          break;
        case "repayment_term":
          aValue = parseInt(a.repayment_term) || 0;
          bValue = parseInt(b.repayment_term) || 0;
          break;
        case "monthlyPayment":
          aValue =
            (parseFloat(a.loan_amount) * (1 + parseFloat(a.interest_rate))) /
              parseInt(a.repayment_term) || 0;
          bValue =
            (parseFloat(b.loan_amount) * (1 + parseFloat(b.interest_rate))) /
              parseInt(b.repayment_term) || 0;
          break;
        default:
          return 0;
      }

      return config.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
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

  const openConfirmationDialog = (proposal, requestId) => {
    setSelectedProposal(proposal);
    setSelectedRequestId(requestId);
    setDialogOpen(true);
  };

  const confirmAcceptProposal = async () => {
    if (!selectedProposal || !selectedRequestId) return;

    const options = {
      method: "PUT",
      body: JSON.stringify({ proposal_id: selectedProposal.id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const response = await fetch(
        `${API}/borrowers/${user.id}/requests/${selectedRequestId}/proposals/`,
        options
      );
      if (response.ok) {
        setAcceptedProposals((prev) => ({
          ...prev,
          [selectedRequestId]: selectedProposal.id,
        }));
        setDialogOpen(false);
      } else {
        throw new Error("Failed to accept proposal.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
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
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" sx={{ color: "#00a250" }} />
          </IconButton>
        }
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "transparent",
            color: "#fff",
          },
        }}
      />

      {newProposalNotif && (
        <Alert
          severity="info"
          sx={{
            marginBottom: 3,
            backgroundColor: "transparent",
            color: "#00a250",
            "& .MuiAlert-icon": { color: "#00a250" },
          }}
        >
          You have new proposals available.
        </Alert>
      )}

      {!newProposalNotif && (
        <Alert
          severity="info"
          sx={{
            marginBottom: 3,
            backgroundColor: "transparent",
            color: "#00a250",
            "& .MuiAlert-icon": { color: "#00a250" },
          }}
        >
          No new proposals.
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
              onClick={() => navigate(`/borrowers/new-request`)}
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
                Purpose of Loan
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
            {sortedRequests.map((request) => (
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
                  <TableCell align="left" sx={{ color: "#00A250" }}>
                    {request.title}
                  </TableCell>
                  <TableCell align="left">{request.description}</TableCell>
                  <TableCell align="right">
                    ${parseFloat(request.value).toLocaleString()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
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
                                          proposalSortConfig[request.id]
                                            ?.key === "loan_amount"
                                        }
                                        direction={
                                          proposalSortConfig[request.id]
                                            ?.direction || "asc"
                                        }
                                        onClick={() =>
                                          handleProposalSort(
                                            request.id,
                                            "loan_amount"
                                          )
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
                                          proposalSortConfig[request.id]
                                            ?.key === "interest_rate"
                                        }
                                        direction={
                                          proposalSortConfig[request.id]
                                            ?.direction || "asc"
                                        }
                                        onClick={() =>
                                          handleProposalSort(
                                            request.id,
                                            "interest_rate"
                                          )
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
                                          proposalSortConfig[request.id]
                                            ?.key === "repayment_term"
                                        }
                                        direction={
                                          proposalSortConfig[request.id]
                                            ?.direction || "asc"
                                        }
                                        onClick={() =>
                                          handleProposalSort(
                                            request.id,
                                            "repayment_term"
                                          )
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
                                          proposalSortConfig[request.id]
                                            ?.key === "monthlyPayment"
                                        }
                                        direction={
                                          proposalSortConfig[request.id]
                                            ?.direction || "asc"
                                        }
                                        onClick={() =>
                                          handleProposalSort(
                                            request.id,
                                            "monthlyPayment"
                                          )
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
                                {getSortedProposals(request.id).map((offer) => {
                                  const today = new Date();
                                  const isExpiring =
                                    new Date(offer.expire_at) - today <=
                                    5 * 86400000;
                                  const isNew =
                                    Math.ceil(
                                      (today - new Date(offer.created_at)) /
                                        (1000 * 60 * 60 * 24)
                                    ) <= 7;
                                  const monthlyPayment =
                                    (parseFloat(offer.loan_amount) *
                                      (1 + parseFloat(offer.interest_rate))) /
                                    parseInt(offer.repayment_term);

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
                                        {isExpiring && (
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
                                        {isNew && (
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
                                      <TableCell align="center">
                                        {(
                                          parseFloat(offer.interest_rate) * 100
                                        ).toFixed(2)}
                                        %
                                      </TableCell>
                                      <TableCell align="center">
                                        {parseInt(offer.repayment_term)}
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
                                            openConfirmationDialog(
                                              offer,
                                              request.id
                                            )
                                          }
                                          disabled={
                                            acceptedProposals[request.id] &&
                                            acceptedProposals[request.id] !==
                                              offer.id
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
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
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

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Acceptance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to accept this proposal with the following
            terms?
            <ul>
              <li>
                <strong>Loan Amount:</strong> $
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
                    (1 + selectedProposal?.interest_rate)) /
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
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={confirmAcceptProposal}
            color="primary"
            variant="contained"
          >
            Accept
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
