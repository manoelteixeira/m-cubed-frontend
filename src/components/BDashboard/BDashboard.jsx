// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   Grid,
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Collapse,
//   Card,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton,
//   Alert,
//   TableSortLabel,
//   Tooltip,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Chip, // Added for chips
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import confetti from "canvas-confetti";

// const API = import.meta.env.VITE_BASE_URL;
// const MMM_GREEN = "#00A250";
// const RED = "#8B0000"; // Define red color for expiring proposals

// const BDashboard = ({ user, token }) => {
//   const [requests, setRequests] = useState([]);
//   const [proposals, setProposals] = useState({});
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [acceptedProposals, setAcceptedProposals] = useState({});
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [proposalSortConfig, setProposalSortConfig] = useState({});
//   const [viewedRows, setViewedRows] = useState(() => {
//     const storedViewedRows = localStorage.getItem(
//       "viewedRowsBorrowerDashboard"
//     );
//     return storedViewedRows ? JSON.parse(storedViewedRows) : [];
//   });
//   const [notifications, setNotifications] = useState([]);
//   const [newProposalNotif, setNewProposalNotif] = useState(false);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [selectedProposalDetails, setSelectedProposalDetails] = useState(null);
//   const [acceptanceReason, setAcceptanceReason] = useState("");
//   const [otherReason, setOtherReason] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const options = { headers: { Authorization: token } };
//     fetch(`${API}/borrowers/${user.id}/requests`, options)
//       .then((res) => res.json())
//       .then((data) => {
//         let requestsProposals = {};
//         let fetchPromises = data.map((request) =>
//           fetch(
//             `${API}/borrowers/${user.id}/requests/${request.id}/proposals`,
//             options
//           )
//             .then((res) => res.json())
//             .then((proposalData) => {
//               requestsProposals[request.id] = proposalData;
//             })
//         );

//         Promise.all(fetchPromises).then(() => {
//           setRequests(data);
//           setProposals(requestsProposals);
//           checkForExpiringProposals(requestsProposals);
//           checkForNewProposals(requestsProposals);
//         });
//       });
//   }, [user.id, token]);

//   const checkForExpiringProposals = (requestsProposals) => {
//     const expiringProposals = [];
//     const today = new Date();

//     Object.keys(requestsProposals).forEach((requestId) => {
//       requestsProposals[requestId].forEach((proposal) => {
//         const expireDate = new Date(proposal.expire_at);
//         const daysUntilExpire = Math.ceil(
//           (expireDate - today) / (1000 * 60 * 60 * 24)
//         );

//         if (daysUntilExpire <= 5 && daysUntilExpire > 0) {
//           expiringProposals.push({
//             requestId,
//             proposalId: proposal.id,
//             title: proposal.title,
//             expireDate: expireDate.toLocaleDateString(),
//           });
//         }
//       });
//     });

//     setNotifications(expiringProposals);
//   };

//   const checkForNewProposals = (requestsProposals) => {
//     const today = new Date();
//     let hasNewProposal = false;

//     Object.keys(requestsProposals).forEach((requestId) => {
//       requestsProposals[requestId].forEach((proposal) => {
//         const proposalDate = new Date(proposal.created_at);
//         const daysSinceCreated = Math.ceil(
//           (today - proposalDate) / (1000 * 60 * 60 * 24)
//         );
//         if (daysSinceCreated <= 7) {
//           hasNewProposal = true;
//         }
//       });
//     });

//     setNewProposalNotif(hasNewProposal);
//   };

//   const handleSort = (column) => {
//     let direction = "asc";
//     if (sortConfig.key === column && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key: column, direction });
//   };

//   const handleProposalSort = (requestId, column) => {
//     const currentConfig = proposalSortConfig[requestId] || {
//       key: null,
//       direction: "asc",
//     };
//     let direction = "asc";
//     if (currentConfig.key === column && currentConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setProposalSortConfig((prev) => ({
//       ...prev,
//       [requestId]: { key: column, direction },
//     }));
//   };

//   const sortedRequests = requests.slice().sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const aValue = a[sortConfig.key];
//     const bValue = b[sortConfig.key];
//     return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
//   });

//   const getSortedProposals = (requestId) => {
//     const proposalsForRequest = proposals[requestId] || [];
//     const config = proposalSortConfig[requestId];
//     if (!config || !config.key) return proposalsForRequest;

//     return [...proposalsForRequest].sort((a, b) => {
//       let aValue, bValue;

//       switch (config.key) {
//         case "loan_amount":
//           aValue = parseFloat(a.loan_amount) || 0;
//           bValue = parseFloat(b.loan_amount) || 0;
//           break;
//         case "interest_rate":
//           aValue = parseFloat(a.interest_rate) * 100 || 0;
//           bValue = parseFloat(b.interest_rate) * 100 || 0;
//           break;
//         case "repayment_term":
//           aValue = parseInt(a.repayment_term) || 0;
//           bValue = parseInt(b.repayment_term) || 0;
//           break;
//         case "monthlyPayment":
//           aValue =
//             (parseFloat(a.loan_amount) * (1 + parseFloat(a.interest_rate))) /
//               parseInt(a.repayment_term) || 0;
//           bValue =
//             (parseFloat(b.loan_amount) * (1 + parseFloat(b.interest_rate))) /
//               parseInt(b.repayment_term) || 0;
//           break;
//         default:
//           return 0;
//       }

//       return config.direction === "asc" ? aValue - bValue : bValue - aValue;
//     });
//   };

//   const handleRowClick = (rowId) => {
//     if (!viewedRows.includes(rowId)) {
//       const updatedViewedRows = [...viewedRows, rowId];
//       setViewedRows(updatedViewedRows);
//       localStorage.setItem(
//         "viewedRowsBorrowerDashboard",
//         JSON.stringify(updatedViewedRows)
//       );
//     }
//     setExpandedRow(expandedRow === rowId ? null : rowId);
//   };

//   const openConfirmationDialog = (proposal) => {
//     setSelectedProposalDetails(proposal);
//     setConfirmDialogOpen(true);
//   };

//   const handleConfirmAccept = () => {
//     if (selectedProposalDetails) {
//       setAcceptedProposals((prev) => ({
//         ...prev,
//         [selectedProposalDetails.requestId]: selectedProposalDetails.id,
//       }));
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6 },
//       });
//       setConfirmDialogOpen(false);

//       const reason =
//         acceptanceReason === "Other" ? otherReason : acceptanceReason;
//       updateRequestStatusToFundingOngoing(
//         selectedProposalDetails.requestId,
//         reason
//       );
//     }
//   };

//   const updateRequestStatusToFundingOngoing = async (requestId, reason) => {
//     try {
//       await fetch(`${API}/borrowers/${user.id}/requests/${requestId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({ status: "Funding Ongoing", reason }),
//       });
//       console.log("Status updated to 'Funding Ongoing'");
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   return (
//     <Box sx={{ padding: "20px", paddingTop: "50px", paddingBottom: "80px" }}>
//       {/* Expiring Proposals Alert */}
//       {notifications.length > 0 && (
//         <Alert
//           severity="warning"
//           sx={{
//             marginBottom: -3,
//             backgroundColor: "transparent",
//             color: "#8B0000",
//             "& .MuiAlert-icon": { color: "#8B0000" },
//           }}
//         >
//           You have {notifications.length} proposal/s expiring within 5 days.
//         </Alert>
//       )}

//       {/* New Proposals Alert */}
//       {newProposalNotif && (
//         <Alert
//           severity="info"
//           sx={{
//             marginBottom: 3,
//             backgroundColor: "transparent",
//             color: MMM_GREEN,
//             "& .MuiAlert-icon": { color: MMM_GREEN },
//           }}
//         >
//           You have new proposals available.
//         </Alert>
//       )}

//       {/* Welcome Section */}
//       <Paper
//         elevation={0}
//         sx={{
//           padding: "20px",
//           marginBottom: "20px",
//           backgroundColor: "#f6f7f8",
//         }}
//       >
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Typography variant="h4" sx={{ color: "black", textAlign: "left" }}>
//               Welcome,{" "}
//               <span style={{ color: MMM_GREEN }}>{user.business_name}</span>
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ color: "black", textAlign: "left" }}
//             >
//               What can we do to get your funding moving today? Your loan details
//               and updates are ready below.
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: MMM_GREEN,
//                 color: "#f6f7f8",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   boxShadow: "0 8px 20px rgba(0, 162, 80, 0.5)",
//                   backgroundColor: "#75D481",
//                 },
//               }}
//               startIcon={<AddIcon />}
//               onClick={() => navigate(`/borrowers/new-request`)}
//             >
//               Start your Loan Request
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* KPIs Section */}
//       <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
//         <Grid item xs={12} sm={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               padding: "20px",
//               textAlign: "center",
//               backgroundColor: "#f6f7f8",
//             }}
//           >
//             <Typography variant="h6" sx={{ color: MMM_GREEN }}>
//               Total Loan Requests
//             </Typography>
//             <Typography variant="h4" sx={{ color: MMM_GREEN }}>
//               {requests.length}
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               padding: "20px",
//               textAlign: "center",
//               backgroundColor: "#f6f7f8",
//             }}
//           >
//             <Typography variant="h6" sx={{ color: MMM_GREEN }}>
//               Loan Requests with Proposals
//             </Typography>
//             <Typography variant="h4" sx={{ color: MMM_GREEN }}>
//               {
//                 requests.filter(
//                   (request) =>
//                     proposals[request.id] && proposals[request.id].length > 0
//                 ).length
//               }
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               padding: "20px",
//               textAlign: "center",
//               backgroundColor: "#f6f7f8",
//             }}
//           >
//             <Typography variant="h6" sx={{ color: MMM_GREEN }}>
//               Total Loan Amount Requested
//             </Typography>
//             <Typography variant="h4" sx={{ color: MMM_GREEN }}>
//               $
//               {requests
//                 .reduce((total, request) => {
//                   return total + (parseFloat(request.value) || 0);
//                 }, 0)
//                 .toLocaleString("en-US", {
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2,
//                 })}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Loan Requests Table */}
//       <TableContainer component={Paper} elevation={0}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center" sx={{ color: MMM_GREEN }}>
//                 <Tooltip title="Sort">
//                   <TableSortLabel
//                     active={sortConfig.key === "title"}
//                     direction={sortConfig.direction}
//                     onClick={() => handleSort("title")}
//                   >
//                     Title
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//               <TableCell align="center" sx={{ color: MMM_GREEN }}>
//                 Purpose of Loan
//               </TableCell>
//               <TableCell align="center" sx={{ color: MMM_GREEN }}>
//                 <Tooltip title="Sort">
//                   <TableSortLabel
//                     active={sortConfig.key === "value"}
//                     direction={sortConfig.direction}
//                     onClick={() => handleSort("value")}
//                   >
//                     Loan Amount
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//               <TableCell align="center" sx={{ color: MMM_GREEN }}>
//                 Status
//               </TableCell>
//               <TableCell align="center" sx={{ color: MMM_GREEN }}>
//                 Days on Marketplace
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sortedRequests.map((request) => (
//               <React.Fragment key={request.id}>
//                 <TableRow
//                   hover
//                   onClick={() => handleRowClick(request.id)}
//                   style={{
//                     backgroundColor: viewedRows.includes(request.id)
//                       ? "#d3d3d3"
//                       : "#fff",
//                   }}
//                 >
//                   <TableCell align="left" sx={{ color: MMM_GREEN }}>
//                     {request.title}
//                     {proposals[request.id]?.some((proposal) => {
//                       const daysSinceCreated = Math.ceil(
//                         (new Date() - new Date(proposal.created_at)) /
//                           (1000 * 60 * 60 * 24)
//                       );
//                       return (
//                         daysSinceCreated <= 7 &&
//                         !viewedRows.includes(request.id)
//                       );
//                     }) && (
//                       <Chip
//                         label="New"
//                         color="success"
//                         size="small"
//                         sx={{ marginLeft: 1 }}
//                       />
//                     )}
//                     {proposals[request.id]?.some((proposal) => {
//                       const expireDate = new Date(proposal.expire_at);
//                       const daysUntilExpire = Math.ceil(
//                         (expireDate - new Date()) / (1000 * 60 * 60 * 24)
//                       );
//                       return (
//                         daysUntilExpire <= 5 && !viewedRows.includes(request.id)
//                       );
//                     }) && (
//                       <Chip
//                         label="Expiring"
//                         color="error"
//                         size="small"
//                         sx={{ marginLeft: 1 }}
//                       />
//                     )}
//                   </TableCell>
//                   <TableCell align="left">{request.description}</TableCell>
//                   <TableCell align="right">
//                     ${parseFloat(request.value).toLocaleString()}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       color: proposals[request.id]?.length
//                         ? "#056612"
//                         : "#8B0000",
//                     }}
//                   >
//                     {proposals[request.id]?.length ? "Active" : "Pending"}
//                   </TableCell>
//                   <TableCell align="center">
//                     {Math.floor(
//                       (new Date() - new Date(request.created_at)) /
//                         (1000 * 60 * 60 * 24)
//                     )}{" "}
//                     days
//                   </TableCell>
//                 </TableRow>

//                 <TableRow>
//                   <TableCell colSpan={5} sx={{ padding: 0, border: 0 }}>
//                     <Collapse
//                       in={expandedRow === request.id}
//                       timeout="auto"
//                       unmountOnExit
//                     >
//                       <Card
//                         elevation={2}
//                         sx={{
//                           backgroundColor: "#fff",
//                           margin: 2,
//                           textAlign: "center",
//                         }}
//                       >
//                         <Box sx={{ padding: "20px" }}>
//                           <Typography
//                             variant="h5"
//                             sx={{
//                               fontWeight: "bold",
//                               color: "#056612",
//                               marginBottom: "20px",
//                               fontSize: "1.5rem",
//                             }}
//                           >
//                             LOAN PROPOSALS
//                           </Typography>
//                           <TableContainer component={Paper}>
//                             <Table>
//                               <TableHead>
//                                 <TableRow>
//                                   <TableCell
//                                     align="center"
//                                     sx={{ color: MMM_GREEN }}
//                                   >
//                                     <Tooltip title="Sort">
//                                       <TableSortLabel
//                                         active={
//                                           proposalSortConfig[request.id]
//                                             ?.key === "loan_amount"
//                                         }
//                                         direction={
//                                           proposalSortConfig[request.id]
//                                             ?.direction || "asc"
//                                         }
//                                         onClick={() =>
//                                           handleProposalSort(
//                                             request.id,
//                                             "loan_amount"
//                                           )
//                                         }
//                                       >
//                                         Loan Amount Offered
//                                       </TableSortLabel>
//                                     </Tooltip>
//                                   </TableCell>
//                                   <TableCell
//                                     align="center"
//                                     sx={{ color: MMM_GREEN }}
//                                   >
//                                     <Tooltip title="Sort">
//                                       <TableSortLabel
//                                         active={
//                                           proposalSortConfig[request.id]
//                                             ?.key === "interest_rate"
//                                         }
//                                         direction={
//                                           proposalSortConfig[request.id]
//                                             ?.direction || "asc"
//                                         }
//                                         onClick={() =>
//                                           handleProposalSort(
//                                             request.id,
//                                             "interest_rate"
//                                           )
//                                         }
//                                       >
//                                         Interest Rate
//                                       </TableSortLabel>
//                                     </Tooltip>
//                                   </TableCell>
//                                   <TableCell
//                                     align="center"
//                                     sx={{ color: MMM_GREEN }}
//                                   >
//                                     <Tooltip title="Sort">
//                                       <TableSortLabel
//                                         active={
//                                           proposalSortConfig[request.id]
//                                             ?.key === "repayment_term"
//                                         }
//                                         direction={
//                                           proposalSortConfig[request.id]
//                                             ?.direction || "asc"
//                                         }
//                                         onClick={() =>
//                                           handleProposalSort(
//                                             request.id,
//                                             "repayment_term"
//                                           )
//                                         }
//                                       >
//                                         Term Length (months)
//                                       </TableSortLabel>
//                                     </Tooltip>
//                                   </TableCell>
//                                   <TableCell
//                                     align="center"
//                                     sx={{ color: MMM_GREEN }}
//                                   >
//                                     <Tooltip title="Sort">
//                                       <TableSortLabel
//                                         active={
//                                           proposalSortConfig[request.id]
//                                             ?.key === "monthlyPayment"
//                                         }
//                                         direction={
//                                           proposalSortConfig[request.id]
//                                             ?.direction || "asc"
//                                         }
//                                         onClick={() =>
//                                           handleProposalSort(
//                                             request.id,
//                                             "monthlyPayment"
//                                           )
//                                         }
//                                       >
//                                         Monthly Payment
//                                       </TableSortLabel>
//                                     </Tooltip>
//                                   </TableCell>
//                                   <TableCell
//                                     align="center"
//                                     sx={{ color: MMM_GREEN }}
//                                   >
//                                     Expiration Date
//                                   </TableCell>
//                                   <TableCell
//                                     align="center"
//                                     sx={{ color: MMM_GREEN }}
//                                   >
//                                     Decision
//                                   </TableCell>
//                                 </TableRow>
//                               </TableHead>
//                               <TableBody>
//                                 {getSortedProposals(request.id).map((offer) => (
//                                   <TableRow key={offer.id}>
//                                     <TableCell align="center">
//                                       $
//                                       {parseFloat(
//                                         offer.loan_amount
//                                       ).toLocaleString("en-US", {
//                                         minimumFractionDigits: 2,
//                                         maximumFractionDigits: 2,
//                                       })}
//                                       {proposals[request.id]?.some(
//                                         (prop) =>
//                                           prop.id === offer.id &&
//                                           Math.ceil(
//                                             (new Date() -
//                                               new Date(prop.created_at)) /
//                                               (1000 * 60 * 60 * 24)
//                                           ) <= 7
//                                       ) && (
//                                         <Chip
//                                           label="New"
//                                           color="success"
//                                           size="small"
//                                           sx={{ marginLeft: 1 }}
//                                         />
//                                       )}
//                                       {proposals[request.id]?.some(
//                                         (prop) =>
//                                           prop.id === offer.id &&
//                                           Math.ceil(
//                                             (new Date(prop.expire_at) -
//                                               new Date()) /
//                                               (1000 * 60 * 60 * 24)
//                                           ) <= 5
//                                       ) && (
//                                         <Chip
//                                           label="Expiring"
//                                           color="error"
//                                           size="small"
//                                           sx={{ marginLeft: 1 }}
//                                         />
//                                       )}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                       {(
//                                         parseFloat(offer.interest_rate) * 100
//                                       ).toFixed(2)}
//                                       %
//                                     </TableCell>
//                                     <TableCell align="center">
//                                       {parseInt(offer.repayment_term)}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                       $
//                                       {(
//                                         (parseFloat(offer.loan_amount) *
//                                           (1 +
//                                             parseFloat(offer.interest_rate))) /
//                                         parseInt(offer.repayment_term)
//                                       ).toLocaleString("en-US", {
//                                         minimumFractionDigits: 2,
//                                         maximumFractionDigits: 2,
//                                       })}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                       {new Date(
//                                         offer.expire_at
//                                       ).toLocaleDateString()}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                       <Button
//                                         variant="contained"
//                                         sx={{
//                                           backgroundColor:
//                                             acceptedProposals[request.id] ===
//                                             offer.id
//                                               ? MMM_GREEN
//                                               : acceptedProposals[request.id]
//                                               ? "#d3d3d3"
//                                               : MMM_GREEN,
//                                           color:
//                                             acceptedProposals[request.id] ===
//                                             offer.id
//                                               ? "#fff"
//                                               : "#f6f7f8",
//                                           "&.Mui-disabled": {
//                                             backgroundColor:
//                                               acceptedProposals[request.id] ===
//                                               offer.id
//                                                 ? MMM_GREEN
//                                                 : "#d3d3d3",
//                                             color:
//                                               acceptedProposals[request.id] ===
//                                               offer.id
//                                                 ? "#fff"
//                                                 : "#8B8B8B",
//                                           },
//                                         }}
//                                         disabled={
//                                           !!acceptedProposals[request.id]
//                                         }
//                                         onClick={() =>
//                                           openConfirmationDialog({
//                                             ...offer,
//                                             requestId: request.id,
//                                           })
//                                         }
//                                       >
//                                         {acceptedProposals[request.id] ===
//                                         offer.id
//                                           ? "Funding in Progress"
//                                           : acceptedProposals[request.id]
//                                           ? "Rejected"
//                                           : "Accept"}
//                                       </Button>
//                                     </TableCell>
//                                   </TableRow>
//                                 ))}
//                               </TableBody>
//                             </Table>
//                           </TableContainer>
//                         </Box>
//                       </Card>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {selectedProposalDetails && (
//         <Dialog
//           open={confirmDialogOpen}
//           onClose={() => setConfirmDialogOpen(false)}
//           fullWidth
//           maxWidth="sm"
//         >
//           <DialogTitle
//             sx={{ color: MMM_GREEN, fontFamily: "Roboto", fontSize: "1.5rem" }}
//           >
//             Confirm Proposal Acceptance
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText
//               sx={{ color: "#000", textAlign: "left", fontFamily: "Roboto" }}
//             >
//               Are you sure you want to accept this proposal?
//             </DialogContentText>
//             <DialogContentText
//               sx={{
//                 marginTop: 2,
//                 color: "#000",
//                 textAlign: "left",
//                 fontFamily: "Roboto",
//               }}
//             >
//               <strong>Loan Amount Offered:</strong> $
//               {parseFloat(selectedProposalDetails.loan_amount).toLocaleString(
//                 "en-US",
//                 { minimumFractionDigits: 2, maximumFractionDigits: 2 }
//               )}
//               <br />
//               <strong>Interest Rate:</strong>{" "}
//               {(
//                 parseFloat(selectedProposalDetails.interest_rate) * 100
//               ).toFixed(2)}
//               %<br />
//               <strong>Term Length:</strong>{" "}
//               {selectedProposalDetails.repayment_term} months
//               <br />
//               <strong>Monthly Payment:</strong> $
//               {(
//                 (parseFloat(selectedProposalDetails.loan_amount) *
//                   (1 + parseFloat(selectedProposalDetails.interest_rate))) /
//                 parseInt(selectedProposalDetails.repayment_term)
//               ).toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </DialogContentText>

//             <FormControl fullWidth sx={{ marginTop: 2 }}>
//               <InputLabel
//                 sx={{
//                   color: MMM_GREEN,
//                   "&.Mui-focused": { color: MMM_GREEN },
//                 }}
//                 shrink
//               >
//                 Reason for Choosing this Proposal
//               </InputLabel>
//               <Select
//                 value={acceptanceReason}
//                 onChange={(e) => setAcceptanceReason(e.target.value)}
//                 sx={{
//                   color: MMM_GREEN,
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: MMM_GREEN,
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: MMM_GREEN,
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: MMM_GREEN,
//                   },
//                   marginTop: "8px",
//                 }}
//               >
//                 <MenuItem value="Lowest Interest Rate">
//                   Lowest Interest Rate
//                 </MenuItem>
//                 <MenuItem value="Longest Term Repayment">
//                   Longest Term Repayment
//                 </MenuItem>
//                 <MenuItem value="Lowest Monthly Payment">
//                   Lowest Monthly Payment
//                 </MenuItem>
//                 <MenuItem value="Other">Other</MenuItem>
//               </Select>
//             </FormControl>
//             {acceptanceReason === "Other" && (
//               <TextField
//                 margin="dense"
//                 fullWidth
//                 variant="outlined"
//                 value={otherReason}
//                 onChange={(e) => setOtherReason(e.target.value)}
//                 placeholder="Specify your reason"
//                 sx={{
//                   "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
//                     borderColor: MMM_GREEN,
//                   },
//                   "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
//                     { borderColor: MMM_GREEN },
//                   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                     { borderColor: MMM_GREEN },
//                   "& .MuiOutlinedInput-input": { color: MMM_GREEN },
//                   "&::placeholder": { color: MMM_GREEN, opacity: 1 },
//                 }}
//               />
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => setConfirmDialogOpen(false)}
//               sx={{ color: MMM_GREEN, fontFamily: "Roboto" }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleConfirmAccept}
//               sx={{
//                 backgroundColor: MMM_GREEN,
//                 color: "#fff",
//                 fontFamily: "Roboto",
//               }}
//               autoFocus
//               disabled={!!acceptedProposals[selectedProposalDetails.requestId]}
//             >
//               {acceptedProposals[selectedProposalDetails.requestId]
//                 ? "Funding in Progress"
//                 : "Accept"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </Box>
//   );
// };

// BDashboard.propTypes = {
//   user: PropTypes.object,
//   token: PropTypes.string,
// };

// export default BDashboard;

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
  IconButton,
  Alert,
  TableSortLabel,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import confetti from "canvas-confetti";

const API = import.meta.env.VITE_BASE_URL;
const MMM_GREEN = "#00A250";
const RED = "#8B0000";

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
  const [newProposalNotif, setNewProposalNotif] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedProposalDetails, setSelectedProposalDetails] = useState(null);
  const [acceptanceReason, setAcceptanceReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

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

  const openConfirmationDialog = (proposal) => {
    setSelectedProposalDetails(proposal);
    setConfirmDialogOpen(true);
  };

  const handleConfirmAccept = () => {
    if (selectedProposalDetails) {
      setAcceptedProposals((prev) => ({
        ...prev,
        [selectedProposalDetails.requestId]: selectedProposalDetails.id,
      }));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setConfirmDialogOpen(false);

      const reason =
        acceptanceReason === "Other" ? otherReason : acceptanceReason;
      updateRequestStatusToFundingOngoing(
        selectedProposalDetails.requestId,
        reason
      );
    }
  };

  const updateRequestStatusToFundingOngoing = async (requestId, reason) => {
    try {
      await fetch(`${API}/borrowers/${user.id}/requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status: "Funding Ongoing", reason }),
      });
      console.log("Status updated to 'Funding Ongoing'");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px", paddingTop: "50px", paddingBottom: "80px" }}>
      {/* Expiring Proposals Alert */}
      {notifications.length > 0 && (
        <Alert
          severity="warning"
          sx={{
            marginBottom: -3,
            backgroundColor: "transparent",
            color: "#8B0000",
            "& .MuiAlert-icon": { color: "#8B0000" },
          }}
        >
          You have {notifications.length} proposal/s expiring within 5 days.
        </Alert>
      )}

      {/* New Proposals Alert */}
      {newProposalNotif && (
        <Alert
          severity="info"
          sx={{
            marginBottom: 3,
            backgroundColor: "transparent",
            color: MMM_GREEN,
            "& .MuiAlert-icon": { color: MMM_GREEN },
          }}
        >
          You have new proposals available.
        </Alert>
      )}

      {/* Welcome Section */}
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
              <span style={{ color: MMM_GREEN }}>{user.business_name}</span>
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
                backgroundColor: MMM_GREEN,
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

      {/* KPIs Section */}
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
            <Typography variant="h6" sx={{ color: MMM_GREEN }}>
              Total Loan Requests
            </Typography>
            <Typography variant="h4" sx={{ color: MMM_GREEN }}>
              {requests.length}
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
            <Typography variant="h6" sx={{ color: MMM_GREEN }}>
              Loan Requests with Proposals
            </Typography>
            <Typography variant="h4" sx={{ color: MMM_GREEN }}>
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
            elevation={0}
            sx={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f6f7f8",
            }}
          >
            <Typography variant="h6" sx={{ color: MMM_GREEN }}>
              Total Loan Amount Requested
            </Typography>
            <Typography variant="h4" sx={{ color: MMM_GREEN }}>
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
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: MMM_GREEN }}>
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
              <TableCell align="center" sx={{ color: MMM_GREEN }}>
                Purpose of Loan
              </TableCell>
              <TableCell align="center" sx={{ color: MMM_GREEN }}>
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
              <TableCell align="center" sx={{ color: MMM_GREEN }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ color: MMM_GREEN }}>
                Days on Marketplace
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
                  <TableCell align="left" sx={{ color: MMM_GREEN }}>
                    {request.title}
                    {proposals[request.id]?.some((proposal) => {
                      const daysSinceCreated = Math.ceil(
                        (new Date() - new Date(proposal.created_at)) /
                          (1000 * 60 * 60 * 24)
                      );
                      return (
                        daysSinceCreated <= 7 &&
                        !viewedRows.includes(request.id)
                      );
                    }) && (
                      <Chip
                        label="New"
                        color="success"
                        size="small"
                        sx={{ marginLeft: 1 }}
                      />
                    )}
                    {proposals[request.id]?.some((proposal) => {
                      const expireDate = new Date(proposal.expire_at);
                      const daysUntilExpire = Math.ceil(
                        (expireDate - new Date()) / (1000 * 60 * 60 * 24)
                      );
                      return (
                        daysUntilExpire <= 5 && !viewedRows.includes(request.id)
                      );
                    }) && (
                      <Chip
                        label="Expiring"
                        color="error"
                        size="small"
                        sx={{ marginLeft: 1 }}
                      />
                    )}
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
                  <TableCell align="center">
                    {Math.floor(
                      (new Date() - new Date(request.created_at)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={5} sx={{ padding: 0, border: 0 }}>
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
                                    sx={{ color: MMM_GREEN }}
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
                                    sx={{ color: MMM_GREEN }}
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
                                    sx={{ color: MMM_GREEN }}
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
                                    sx={{ color: MMM_GREEN }}
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
                                    sx={{ color: MMM_GREEN }}
                                  >
                                    <Tooltip title="Sort">
                                      <TableSortLabel
                                        active={
                                          proposalSortConfig[request.id]
                                            ?.key === "requirements"
                                        }
                                        direction={
                                          proposalSortConfig[request.id]
                                            ?.direction || "asc"
                                        }
                                        onClick={() =>
                                          handleProposalSort(
                                            request.id,
                                            "requirements"
                                          )
                                        }
                                      >
                                        Addtl Requirements
                                      </TableSortLabel>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{ color: MMM_GREEN }}
                                  >
                                    Offer Valid Until
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    sx={{ color: MMM_GREEN }}
                                  >
                                    Decision
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {getSortedProposals(request.id).map((offer) => (
                                  <TableRow key={offer.id}>
                                    <TableCell align="center">
                                      $
                                      {parseFloat(
                                        offer.loan_amount
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                      {proposals[request.id]?.some(
                                        (prop) =>
                                          prop.id === offer.id &&
                                          Math.ceil(
                                            (new Date() -
                                              new Date(prop.created_at)) /
                                              (1000 * 60 * 60 * 24)
                                          ) <= 7
                                      ) && (
                                        <Chip
                                          label="New"
                                          color="success"
                                          size="small"
                                          sx={{ marginLeft: 1 }}
                                        />
                                      )}
                                      {proposals[request.id]?.some(
                                        (prop) =>
                                          prop.id === offer.id &&
                                          Math.ceil(
                                            (new Date(prop.expire_at) -
                                              new Date()) /
                                              (1000 * 60 * 60 * 24)
                                          ) <= 5
                                      ) && (
                                        <Chip
                                          label="Expiring"
                                          color="error"
                                          size="small"
                                          sx={{ marginLeft: 1 }}
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
                                      {(
                                        (parseFloat(offer.loan_amount) *
                                          (1 +
                                            parseFloat(offer.interest_rate))) /
                                        parseInt(offer.repayment_term)
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                    </TableCell>
                                    <TableCell align="center">
                                      {offer.requirements.join(", ") || "None"}
                                    </TableCell>
                                    <TableCell align="center">
                                      {new Date(
                                        offer.expire_at
                                      ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                      <Button
                                        variant="contained"
                                        sx={{
                                          backgroundColor:
                                            acceptedProposals[request.id] ===
                                            offer.id
                                              ? MMM_GREEN
                                              : acceptedProposals[request.id]
                                              ? "#d3d3d3"
                                              : MMM_GREEN,
                                          color:
                                            acceptedProposals[request.id] ===
                                            offer.id
                                              ? "#fff"
                                              : "#f6f7f8",
                                          "&.Mui-disabled": {
                                            backgroundColor:
                                              acceptedProposals[request.id] ===
                                              offer.id
                                                ? MMM_GREEN
                                                : "#d3d3d3",
                                            color:
                                              acceptedProposals[request.id] ===
                                              offer.id
                                                ? "#fff"
                                                : "#8B8B8B",
                                          },
                                        }}
                                        disabled={
                                          !!acceptedProposals[request.id]
                                        }
                                        onClick={() =>
                                          openConfirmationDialog({
                                            ...offer,
                                            requestId: request.id,
                                          })
                                        }
                                      >
                                        {acceptedProposals[request.id] ===
                                        offer.id
                                          ? "Funding in Progress"
                                          : acceptedProposals[request.id]
                                          ? "Rejected"
                                          : "Accept"}
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
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

      {selectedProposalDetails && (
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{ color: MMM_GREEN, fontFamily: "Roboto", fontSize: "1.5rem" }}
          >
            Confirm Proposal Acceptance
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "#000", textAlign: "left", fontFamily: "Roboto" }}
            >
              Are you sure you want to accept this proposal?
            </DialogContentText>
            <DialogContentText
              sx={{
                marginTop: 2,
                color: "#000",
                textAlign: "left",
                fontFamily: "Roboto",
              }}
            >
              <strong>Loan Amount Offered:</strong> $
              {parseFloat(selectedProposalDetails.loan_amount).toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )}
              <br />
              <strong>Interest Rate:</strong>{" "}
              {(
                parseFloat(selectedProposalDetails.interest_rate) * 100
              ).toFixed(2)}
              %<br />
              <strong>Term Length:</strong>{" "}
              {selectedProposalDetails.repayment_term} months
              <br />
              <strong>Monthly Payment:</strong> $
              {(
                (parseFloat(selectedProposalDetails.loan_amount) *
                  (1 + parseFloat(selectedProposalDetails.interest_rate))) /
                parseInt(selectedProposalDetails.repayment_term)
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </DialogContentText>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel
                sx={{
                  color: MMM_GREEN,
                  "&.Mui-focused": { color: MMM_GREEN },
                }}
                shrink
              >
                Reason for Choosing this Proposal
              </InputLabel>
              <Select
                value={acceptanceReason}
                onChange={(e) => setAcceptanceReason(e.target.value)}
                sx={{
                  color: MMM_GREEN,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: MMM_GREEN,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: MMM_GREEN,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: MMM_GREEN,
                  },
                  marginTop: "8px",
                }}
              >
                <MenuItem value="Lowest Interest Rate">
                  Lowest Interest Rate
                </MenuItem>
                <MenuItem value="Longest Term Repayment">
                  Longest Term Repayment
                </MenuItem>
                <MenuItem value="Lowest Monthly Payment">
                  Lowest Monthly Payment
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {acceptanceReason === "Other" && (
              <TextField
                margin="dense"
                fullWidth
                variant="outlined"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Specify your reason"
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: MMM_GREEN,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: MMM_GREEN,
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: MMM_GREEN,
                    },
                  "& .MuiOutlinedInput-input": { color: MMM_GREEN },
                  "&::placeholder": { color: MMM_GREEN, opacity: 1 },
                }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              sx={{ color: MMM_GREEN, fontFamily: "Roboto" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAccept}
              sx={{
                backgroundColor: MMM_GREEN,
                color: "#fff",
                fontFamily: "Roboto",
              }}
              autoFocus
              disabled={!!acceptedProposals[selectedProposalDetails.requestId]}
            >
              {acceptedProposals[selectedProposalDetails.requestId]
                ? "Funding in Progress"
                : "Accept"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

BDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default BDashboard;
