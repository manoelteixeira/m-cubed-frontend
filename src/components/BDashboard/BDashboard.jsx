import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: token,
      },
    };
    fetch(`${API}/borrowers/${user.id}/requests`, options)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching requests");
        return res.json();
      })
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

  const openLoanApplicationForm = () => {
    navigate(`/borrowers/new-request`);
  };

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

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ padding: "20px", paddingTop: "50px", paddingBottom: "80px" }}>
      {/* Gradient Header Section */}
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          marginBottom: "20px",
          background: "linear-gradient(90deg, #00A250, #75D481, #c8e265)",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="h4"
              sx={{ color: "#FFFBEA", textAlign: "left" }}
            >
              Welcome,{" "}
              <span style={{ color: "#FFFBEA" }}>{user.business_name}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#FFFBEA", textAlign: "left" }}
            >
              What can we do to get your funding moving today? Your loan details
              and updates are ready below.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00A250", color: "#f6f7f8" }}
              startIcon={<AddIcon />}
              onClick={openLoanApplicationForm}
            >
              Start your Loan Request
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* KPI Section */}
      <Grid
        container
        spacing={3}
        sx={{ marginBottom: "20px" }}
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#00A250",
              color: "#f6f7f8",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Total Loan Requests</Typography>
            <Typography variant="h4">{requests.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#008740",
              color: "#f6f7f8",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Loan Requests with Proposals</Typography>
            <Typography variant="h4">
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
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#009150",
              color: "#f6f7f8",
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Total Loan Amount Requested</Typography>
            <Typography variant="h4">
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
          <TableHead sx={{ backgroundColor: "#15A452" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "#FFFBEA" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ color: "#FFFBEA" }}>
                Purpose of Loan
              </TableCell>
              <TableCell sx={{ color: "#FFFBEA" }}>Loan Amount</TableCell>
              <TableCell sx={{ color: "#FFFBEA" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(requests) &&
              requests.map((request) => (
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

                  {/* Expanded Row Content in a Card */}
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
                            backgroundColor: "#f6f7f8",
                            margin: 2,
                            boxShadow: "0px 4px 8px rgba(0, 162, 80, 0.1)",
                            textAlign: "center",
                          }}
                        >
                          <CardContent
                            sx={{
                              backgroundColor: "#f6f7f8",
                            }}
                          >
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

                            {proposals[request.id] &&
                            proposals[request.id].length > 0 ? (
                              <Grid container spacing={3}>
                                {proposals[request.id].map((offer) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={offer.id}
                                  >
                                    <Card
                                      sx={{
                                        backgroundColor: "#def4df",
                                        boxShadow:
                                          "0px 4px 8px rgba(0, 162, 80, 0.1)",
                                      }}
                                    >
                                      <CardContent>
                                        <Typography variant="body2">
                                          Interest Rate: {offer.interest_rate}%
                                        </Typography>
                                        <Typography variant="body2">
                                          Loan Amount Offered: $
                                          {parseFloat(
                                            offer.loan_amount
                                          ).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })}
                                        </Typography>
                                        <Typography variant="body2">
                                          Term Length: {offer.repayment_term}{" "}
                                          months
                                        </Typography>
                                        <Button
                                          variant="contained"
                                          sx={{
                                            backgroundColor: "#00A250",
                                            color: "#f6f7f8",
                                            marginTop: "10px",
                                          }}
                                          onClick={() =>
                                            handleAcceptProposal(
                                              offer.id,
                                              request.id
                                            )
                                          }
                                          disabled={
                                            acceptedProposals[request.id] !==
                                              undefined &&
                                            acceptedProposals[request.id] !==
                                              offer.id
                                          }
                                        >
                                          {acceptedProposals[request.id] ===
                                          offer.id
                                            ? "Accepted"
                                            : "Accept Proposal"}
                                        </Button>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                ))}
                              </Grid>
                            ) : (
                              <Typography variant="body2">
                                No proposals available yet.
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Accept Proposal Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Proposal Accepted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            It's a match! You have successfully accepted the proposal with:
            <ul>
              <li>
                <strong>Interest Rate:</strong>{" "}
                {selectedProposal?.interest_rate}%
              </li>
              <li>
                <strong>Loan Amount:</strong> $
                {selectedProposal?.loan_amount
                  ? parseFloat(selectedProposal.loan_amount).toLocaleString(
                      "en-US",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )
                  : "N/A"}
              </li>
              <li>
                <strong>Term Length:</strong> {selectedProposal?.repayment_term}{" "}
                months
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
