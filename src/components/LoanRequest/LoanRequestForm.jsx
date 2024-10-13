// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { addRequest } from "../services/serviceRequest";
// import {
//   TextField,
//   Button,
//   Container,
//   Typography,
//   Snackbar,
//   IconButton,
//   Box,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import "./LoanRequest.css";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#00a250",
//     },
//     secondary: {
//       main: "#ffffff",
//     },
//   },
// });

// const LoanRequestForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [timestamp, setTimestamp] = useState("");
//   const [submissionStatus, setSubmissionStatus] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     value: "",
//     created_at: "",
//     borrower_id: id,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const loanData = {
//         title: formData.title,
//         description: formData.description,
//         value: parseFloat(formData.value),
//         created_at: new Date().toISOString(),
//         borrower_id: id,
//       };

//       const addedRequest = await addRequest(id, loanData);

//       if (addedRequest) {
//         setRequests((prevRequests) => [...prevRequests, addedRequest]);
//         navigate(`/borrowers/${id}`);
//       }
//     } catch (err) {
//       setError("Error adding request.");
//       console.error("Submission error:", err);
//     }
//   };

//   const handleSaveDraft = () => {
//     const now = new Date();
//     const formattedTimestamp = now.toISOString();
//     setTimestamp(`Draft saved on: ${formattedTimestamp}`);

//     localStorage.setItem("loanDraft", JSON.stringify(formData));
//     setSubmissionStatus("Draft saved!");
//   };

//   const handleCloseSnackbar = () => {
//     setError(null);
//     setSubmissionStatus("");
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container
//         maxWidth="sm"
//         style={{
//           backgroundColor: "#f6f7f8",
//           padding: "2rem",
//           borderRadius: "8px",
//           boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           style={{ color: "#00a250" }}
//         >
//           Loan Application Form
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Tite"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputLabelProps={{ style: { color: "#00a250" } }}
//             InputProps={{
//               style: {
//                 borderColor: "#00a250",
//               },
//             }}
//           />

//           <TextField
//             label="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputLabelProps={{ style: { color: "#00a250" } }}
//             InputProps={{
//               style: {
//                 borderColor: "#00a250",
//               },
//             }}
//           />

//           <TextField
//             label="Loan Amount Requested"
//             name="value"
//             type="number"
//             value={formData.value}
//             onChange={handleChange}
//             required
//             fullWidth
//             margin="normal"
//             variant="outlined"
//             InputLabelProps={{ style: { color: "#00a250" } }}
//             InputProps={{
//               style: {
//                 borderColor: "#00a250",
//               },
//             }}
//           />

//           <Box display="flex" justifyContent="space-between" marginTop="1.5rem">
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               startIcon={<SendIcon />}
//               style={{ backgroundColor: "#00a250", color: "white" }}
//             >
//               Submit Application
//             </Button>

//             <Button
//               type="button"
//               onClick={handleSaveDraft}
//               variant="outlined"
//               startIcon={<SaveIcon />}
//               style={{ borderColor: "#00a250", color: "#00a250" }}
//             >
//               Save Draft
//             </Button>
//           </Box>
//         </form>

//         {timestamp && (
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             align="center"
//             style={{ marginTop: "1rem" }}
//           >
//             {timestamp}
//           </Typography>
//         )}

//         <Snackbar
//           open={!!submissionStatus}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message={submissionStatus}
//           action={
//             <IconButton
//               size="small"
//               aria-label="close"
//               color="inherit"
//               onClick={handleCloseSnackbar}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           }
//         />

//         <Snackbar
//           open={!!error}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message={error}
//           action={
//             <IconButton
//               size="small"
//               aria-label="close"
//               color="inherit"
//               onClick={handleCloseSnackbar}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           }
//         />
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default LoanRequestForm;

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
import PercentIcon from "@mui/icons-material/Percent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FundedIcon from "@mui/icons-material/CheckCircle";
import {
  getBorrower,
  getAllLoanRequests,
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

  // Calculate KPIs
  const activeLoanRequests = requests.filter(
    (request) => request.status === "active"
  ).length;

  const activeLoanProposals = offers.filter((offer) =>
    requests.some(
      (request) =>
        request.id === offer.request_id && request.status === "active"
    )
  ).length;

  const fundedProjects = requests.filter(
    (request) => request.status === "funded"
  ).length;

  const totalFinancingReceived = fundedProjects
    .reduce((sum, project) => sum + parseFloat(project.value), 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const averageInterestRate = (
    offers.reduce((sum, offer) => sum + parseFloat(offer.interest_rate), 0) /
      offers.length || 0
  ).toFixed(2);

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Borrower Greeting */}
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
              sx={{ backgroundColor: "#00A250", color: "#f6f7f8" }}
              startIcon={<AddIcon />}
              onClick={openLoanApplicationForm}
            >
              New Application
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* KPIs */}
      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        {/* Total Active Loan Requests */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "15px",
              backgroundColor: "#00A250",
              color: "#c8e265",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Total Active Loan Requests
            </Typography>
            <Typography variant="h4" textAlign="center">
              {activeLoanRequests}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Active Loan Proposals */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "15px",
              backgroundColor: "#056612",
              color: "#c8e265",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Total Active Loan Proposals
            </Typography>
            <Typography variant="h4" textAlign="center">
              {activeLoanProposals}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Projects Funded */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "15px",
              backgroundColor: "#00A250",
              color: "#c8e265",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Total Projects Funded
            </Typography>
            <Typography variant="h4" textAlign="center">
              <FundedIcon /> {fundedProjects}
            </Typography>
          </Paper>
        </Grid>

        {/* Total Financing Received */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "15px",
              backgroundColor: "#00A250",
              color: "#c8e265",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Total Financing Received on MMM
            </Typography>
            <Typography variant="h4" textAlign="center">
              <AttachMoneyIcon /> {totalFinancingReceived}
            </Typography>
          </Paper>
        </Grid>

        {/* Average Interest Rate */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "15px",
              backgroundColor: "#00A250",
              color: "#c8e265",
            }}
          >
            <Typography variant="h6" textAlign="center">
              Average Interest Rate
            </Typography>
            <Typography variant="h4" textAlign="center">
              <PercentIcon /> {averageInterestRate}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Loan Requests Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Loan Amount</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(requests) &&
              requests.map((request) => {
                const hasProposals = offers.some(
                  (offer) => offer.request_id === request.id
                );

                let statusColor;
                if (request.status === "pending") {
                  statusColor = "#FF0000"; // Dark Red for Pending
                } else if (request.status === "active") {
                  statusColor = "#056612"; // Dark Green for Active
                } else if (request.status === "funded") {
                  statusColor = "#00A250"; // MMM Green for Funded
                }

                return (
                  <TableRow key={request.id} hover>
                    <TableCell
                      sx={{ cursor: "pointer", color: "#00A250" }}
                      align="left"
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
                      align="left"
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${request.id}`)
                      }
                    >
                      {request.description}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      align="center"
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${request.id}`)
                      }
                    >
                      $
                      {parseFloat(request.value).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer", color: statusColor }}
                      align="center"
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${request.id}`)
                      }
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Funded Projects Table */}
      {fundedProjects.length > 0 && (
        <Box sx={{ marginTop: "30px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", color: "#00A250" }}
          >
            Funded Projects
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="center">Loan Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fundedProjects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell
                      sx={{ cursor: "pointer", color: "#00A250" }}
                      align="left"
                      onClick={() =>
                        navigate(
                          `/borrowers/${id}/borrowerloandetails/${project.id}`
                        )
                      }
                    >
                      {project.title}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      align="left"
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${project.id}`)
                      }
                    >
                      {project.description}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      align="center"
                      onClick={() =>
                        navigate(`/borrowers/${id}/edit-request/${project.id}`)
                      }
                    >
                      $
                      {parseFloat(project.value).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};
export default BDashboard;
