import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getBorrower,
  getAllLoanRequests,
  deleteRequest,
  getProposalsByRequestId,
} from "../services/serviceRequest";
const BDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [borrowerData, setBorrowerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching borrower data with ID:", id);
        const borrower = await getBorrower(id);
        if (borrower) {
          setBorrowerData(borrower);
        } else {
          setError("No borrower data returned.");
          return;
        }
        const loanRequests = await getAllLoanRequests(id);
        if (Array.isArray(loanRequests)) {
          setRequests(loanRequests);
        } else {
          setRequests([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    if (requests.length > 0) {
      const fetchLoanOffers = async () => {
        try {
          const loanOffers = [];
          for (const request of requests) {
            const proposals = await getProposalsByRequestId(id, request.id);
            loanOffers.push(...proposals);
          }
          setOffers(loanOffers);
        } catch (error) {
          console.error("Error fetching loan offers:", error);
          setError("Error fetching loan offers.");
        }
      };
      fetchLoanOffers();
    }
  }, [requests, id]);
  const openLoanApplicationForm = () => {
    navigate(`/borrowers/${id}/requests/new`);
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
    const requestProposals = offers.filter(
      (offer) => offer.request_id === request.id
    );
    return requestProposals.length > 0;
  }).length;
  console.log(loanRequestsWithProposals);
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ color: "#00A250" }}>
              Welcome, {borrowerData.business_name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Your loan applications and offers are listed below.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00A250", color: "#FFFFFF" }}
              startIcon={<AddIcon />}
              onClick={openLoanApplicationForm}
            >
              New Application
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              backgroundColor: "#00A250",
              color: "#FFFFFF",
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
              color: "#FFFFFF",
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
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(requests) &&
              requests.map((request) => {
                const hasProposals = offers.some(
                  (offer) => offer.request_id === request.id
                );
                return (
                  <TableRow key={request.id} hover>
                    <TableCell
                      sx={{ cursor: "pointer", color: "#00A250" }}
                      onClick={() =>
                        navigate(
                          `/borrowers/${id}/borrowerloandetails/${request.id}`
                        )
                      }
                    >
                      {request.title}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${request.id}`)
                      }
                    >
                      {request.description}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${request.id}`)
                      }
                    >
                      ${parseFloat(request.value).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${request.id}`)
                      }
                    >
                      {hasProposals ? "Active" : "Pending"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default BDashboard;
