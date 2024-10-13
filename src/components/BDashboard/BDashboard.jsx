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
  Collapse,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  getBorrower,
  getAllLoanRequests,
  getProposalsByRequestId,
  updateRequest,
} from "../services/serviceRequest";

const BDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [borrowerData, setBorrowerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
  });
  const [showImage, setShowImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const getStatusColor = (status) => {
    if (status === "Pending") return "#8B0000";
    if (status === "Active") return "#056612";
    if (status === "Funded") return "#00A250";
    return "inherit";
  };

  const handleRowClick = (rowId, request) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
    setFormData({
      title: request.title,
      description: request.description,
      value: request.value,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (requestId) => {
    try {
      const updatedRequest = await updateRequest(requestId, formData);

      const updatedRequests = requests.map((request) =>
        request.id === requestId ? { ...request, ...formData } : request
      );
      setRequests(updatedRequests);

      setExpandedRow(null);
    } catch (error) {
      console.error("Error updating loan request:", error);
    }
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
              Welcome, {borrowerData.business_name}
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
                const hasProposals = offers.some(
                  (offer) => offer.request_id === request.id
                );
                const status = hasProposals ? "Active" : "Pending";
                return (
                  <>
                    <TableRow
                      key={request.id}
                      hover
                      onClick={() => handleRowClick(request.id, request)}
                    >
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
                        {parseFloat(request.value).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
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
                                Edit Loan Request
                              </Typography>
                              <TextField
                                label="Loan Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                              />
                              <TextField
                                label="Loan Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                              />
                              <TextField
                                label="Loan Amount"
                                name="value"
                                value={formData.value}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                              />
                              <Box sx={{ marginTop: 2 }}>
                                <Typography variant="h6">
                                  Attachments
                                </Typography>
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                  sx={{ marginTop: 1 }}
                                >
                                  <Grid item>
                                    <Button
                                      variant="contained"
                                      startIcon={<VerifiedIcon />}
                                      sx={{
                                        backgroundColor: "#00A250",
                                        color: "#f6f7f8",
                                        '&:hover': {
                                          backgroundColor: "#008740",
                                        }
                                      }}
                                      onClick={() => window.open(`/borrowers/${request.id}/approved-documents`, "_blank")}
                                    >
                                      View Approved Documents
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Box>
                            </CardContent>
                            <CardActions>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#00A250",
                                  color: "#f6f7f8",
                                }}
                                onClick={() => handleSubmit(request.id)} // Submit the form
                              >
                                Submit Edited Loan Request
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  color: "#00A250",
                                  borderColor: "#00A250",
                                }}
                                onClick={() => setExpandedRow(null)} // Close the expanded row
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="text"
                                sx={{ color: "#00A250" }}
                                onClick={() => console.log("Save draft")}
                              >
                                Save Draft
                              </Button>
                            </CardActions>
                          </Card>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BDashboard;
