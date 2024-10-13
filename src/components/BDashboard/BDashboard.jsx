// src/components/BDashboard/BDashboard.jsx
import PropTypes from "prop-types";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const API = import.meta.env.VITE_BASE_URL;

const BDashboard = ({ user, token }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState({}); // Store proposals by request ID
  const [error, setError] = useState(null);
  // const { id } = useParams();
  const [expandedRow, setExpandedRow] = useState(null); // Track expanded row

  const navigate = useNavigate();

  // Fetch the borrower and all loan requests initially
  useEffect(() => {
    setLoading(true);

    const options = {
      headers: {
        Authorization: token,
      },
    };
    fetch(`${API}/borrowers/${user.id}/requests`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          // do something
        }
      })
      .then((data) => {
        setRequests(data);
        const requestsProposals = {};
        for (const request of data) {
          const { id } = request;
          fetch(`${API}/borrowers/${user.id}/requests/${id}/proposals`, options)
            .then((res) => res.json())
            .then((data) => {
              requestsProposals[id] = data;
            });
        }
        console.log(requestsProposals);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  // useEffect(() => {
  //   const options = {
  //     headers: {
  //       Authorization: token,
  //     },
  //   };
  //   const requestsProposals = {};
  //   if (requests.length > 0) {
  //     for (const request of requests) {
  //       const { id } = request;
  //       fetch(`${API}/borrowers/${user.id}/requests/${id}/proposals`, options)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.id) {
  //             console.error(data);
  //             requestsProposals[id] = data;
  //           }
  //         });
  //     }
  //   }
  //   setProposals(requestsProposals);
  //   console.error(proposals);
  // }, [requests]);

  const openLoanApplicationForm = () => {
    navigate(`/borrowers/${user.id}/requests/new`);
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  const totalLoanRequests = requests.length;
  const loanRequestsWithProposals = requests.filter((request) => {
    const requestProposals = proposals[request.id] || [];
    return requestProposals.length > 0;
  }).length;

  // Determine the status of a loan request
  const getLoanStatus = (requestId) => {
    const hasProposals =
      proposals[requestId] && proposals[requestId].length > 0;
    return hasProposals ? "Active" : "Pending";
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "#8B0000";
    if (status === "Active") return "#056612";
    if (status === "Funded") return "#00A250";
    return "inherit";
  };

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  // const handleLinkClick = (e) => {
  //   e.preventDefault(); // Prevent the default link behavior
  //   setShowImage(true); // Show the image
  //   window.open("/mock_documents/fico_score.pdf", "_blank"); // Open the PDF in a new tab
  // };

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="h4"
              sx={{ color: "#00A250", textAlign: "center" }}
            >
              Welcome, {user.business_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              Your loan applications and offers are listed below.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00A250", color: "#f6f7f8" }}
              startIcon={<AddIcon />}
              onClick={openLoanApplicationForm}
            >
              New Application
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* KPI Section */}
      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#00A250",
              color: "#f6f7f8",
            }}
          >
            <Typography variant="h6">Total Loan Requests</Typography>
            <Typography variant="h4">{totalLoanRequests}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#008740",
              color: "#f6f7f8",
            }}
          >
            <Typography variant="h6">Loan Requests with Proposals</Typography>
            <Typography variant="h4">{loanRequestsWithProposals}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Loan Requests Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(requests) &&
              requests.map((request) => {
                const status = getLoanStatus(request.id);
                return (
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
                          color: getStatusColor(status),
                        }}
                      >
                        {status}
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
                              backgroundColor: "#75D481",
                              margin: 2,
                              border: "1px solid #00A250",
                            }}
                          >
                            <CardContent>
                              <Typography variant="h6">
                                Loan Proposals
                              </Typography>

                              {/* Loan Proposals Section */}
                              {proposals[request.id] &&
                              proposals[request.id].length > 0 ? (
                                proposals[request.id].map((offer) => (
                                  <Box
                                    key={offer.id}
                                    sx={{
                                      marginTop: 2,
                                      backgroundColor: "#f6f7f8",
                                      padding: "10px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <Typography variant="body2">
                                      Interest Rate: {offer.interest_rate}%
                                    </Typography>
                                    <Typography variant="body2">
                                      Loan Amount Offered: $
                                      {offer.loan_amount
                                        ? parseFloat(
                                            offer.loan_amount
                                          ).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })
                                        : "N/A"}
                                    </Typography>
                                    <Typography variant="body2">
                                      Term Length:{" "}
                                      {offer.repayment_term
                                        ? `${offer.repayment_term} months`
                                        : "N/A"}
                                    </Typography>
                                  </Box>
                                ))
                              ) : (
                                <Typography variant="body2">
                                  No proposals available.
                                </Typography>
                              )}
                            </CardContent>
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
    </Box>
  );
};

BDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default BDashboard;
