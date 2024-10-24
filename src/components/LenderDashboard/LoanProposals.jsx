// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Grid,
//   Button,
//   Collapse,
//   Box,
//   Link,
//   Checkbox,
//   FormControlLabel,
//   TablePagination,
//   TableSortLabel,
// } from "@mui/material";
// import PropTypes from "prop-types";

// const API = import.meta.env.VITE_BASE_URL;

// export default function LoanProposals({
//   user,
//   token,
//   loanProposals = [],
//   loadLoanProposals,
//   filteredLoanProposals = [],
//   setFilteredLoanProposals,
// }) {
//   const [pageLoanProposals, setPageLoanProposals] = useState(0);
//   const [rowsPerPageLoanProposals, setRowsPerPageLoanProposals] = useState(5);
//   const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");
//   const [expandedRowId, setExpandedRowId] = useState(null);
//   const [borrowerDetails, setBorrowerDetails] = useState({});
//   const [creditReports, setCreditReports] = useState([]);
//   const [lenderProposal, setLenderProposal] = useState({
//     title: "",
//     description: "",
//     loan_amount: "",
//     interest_rate: "",
//     repayment_term: "",
//     requirements: [], // Array of requirements
//     created_at: "",
//     expire_at: "",
//   });
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [sortBy, setSortBy] = useState("title");

//   const totalProposals = filteredLoanProposals.length;
//   const totalLoanParticipation = Array.isArray(filteredLoanProposals)
//     ? filteredLoanProposals.reduce(
//         (acc, loan) => acc + parseFloat(loan.loan_amount),
//         0
//       )
//     : 0;
//   const averageInterestRate =
//     Array.isArray(filteredLoanProposals) && filteredLoanProposals.length > 0
//       ? filteredLoanProposals.reduce(
//           (acc, loan) => acc + parseFloat(loan.interest_rate),
//           0
//         ) / filteredLoanProposals.length
//       : 0;

//   const acceptedProposals = filteredLoanProposals.filter(
//     (loan) => loan.accepted === true
//   ).length;
//   const pendingProposals = filteredLoanProposals.filter(
//     (loan) => loan.accepted === null || loan.accepted === undefined
//   ).length;
//   const rejectedProposals = filteredLoanProposals.filter(
//     (loan) => loan.accepted === false
//   ).length;

//   const fetchBorrowerDetails = async (borrowerId) => {
//     if (!borrowerId) return;
//     try {
//       const res = await fetch(`${API}/borrowers/${borrowerId}`, {
//         headers: { Authorization: token },
//       });
//       if (!res.ok) throw new Error("Failed to fetch borrower details");
//       const data = await res.json();

//       setBorrowerDetails({
//         business_name: data.borrower.business_name || "N/A",
//         industry: data.borrower.industry || "N/A",
//         street: data.borrower.street || "N/A",
//         city: data.borrower.city || "N/A",
//         state: data.borrower.state || "N/A",
//         zip_code: data.borrower.zip_code || "N/A",
//         fico_score_link:
//           data.borrower.fico_score_link || "/mock-fico-score.pdf",
//         secretary_of_state_link:
//           data.borrower.secretary_of_state_link || "/mock-sos-certificate.pdf",
//         drivers_license_link:
//           data.borrower.drivers_license_link || "/mock-drivers-license.pdf",
//       });
//       setCreditReports(data.credit_reports);
//     } catch (error) {
//       console.error("Failed to fetch borrower details", error);
//     }
//   };

//   const toggleRowExpansion = (rowId, borrowerId, proposal) => {
//     if (expandedRowId === rowId) {
//       setExpandedRowId(null);
//     } else {
//       setExpandedRowId(rowId);
//       fetchBorrowerDetails(borrowerId);
//       if (proposal) {
//         setLenderProposal({
//           title: proposal.title,
//           description: proposal.description,
//           loan_amount: proposal.loan_amount.toString(),
//           interest_rate: proposal.interest_rate.toString(), // Initially store as string for form
//           repayment_term: proposal.repayment_term.toString(),
//           requirements: proposal.requirements || [],
//           created_at: proposal.created_at,
//           expire_at: proposal.expire_at,
//         });
//       }
//     }
//   };

//   const handleProposalChange = (event) => {
//     const { name, value } = event.target;
//     setLenderProposal((prevProposal) => ({
//       ...prevProposal,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (event) => {
//     const { name } = event.target;
//     setLenderProposal((prevProposal) => ({
//       ...prevProposal,
//       requirements: prevProposal.requirements.includes(name)
//         ? prevProposal.requirements.filter((req) => req !== name)
//         : [...prevProposal.requirements, name],
//     }));
//   };

//   const handleResubmitProposal = async () => {
//     const proposalData = {
//       ...lenderProposal,
//       loan_amount: parseFloat(lenderProposal.loan_amount), // Convert back to float for API
//       interest_rate: parseFloat(lenderProposal.interest_rate), // Convert back to float for API
//       repayment_term: parseInt(lenderProposal.repayment_term, 10),
//     };

//     const endpoint = `${API}/lenders/${user.id}/proposals/${expandedRowId}`;
//     try {
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify(proposalData),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Proposal resubmitted successfully.");
//         setExpandedRowId(null);
//       } else {
//         alert(result.error || "Error resubmitting proposal.");
//       }
//     } catch (error) {
//       alert(error.message || "Failed to resubmit the proposal.");
//     }
//   };

//   const handleSearchChangeLoanProposals = (event) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTermLoanProposals(term);

//     const filteredProposals = loanProposals.filter(
//       (loan) =>
//         loan.title?.toLowerCase().includes(term) ||
//         loan.description?.toLowerCase().includes(term)
//     );

//     setFilteredLoanProposals(filteredProposals);
//   };

//   const handleSort = (property) => {
//     const isAsc = sortBy === property && sortDirection === "asc";
//     setSortDirection(isAsc ? "desc" : "asc");
//     setSortBy(property);
//     const sortedProposals = [...filteredLoanProposals].sort((a, b) => {
//       if (isAsc) {
//         return a[property] < b[property] ? -1 : 1;
//       }
//       return a[property] > b[property] ? -1 : 1;
//     });
//     setFilteredLoanProposals(sortedProposals);
//   };

//   const handleDeleteProposal = async () => {
//     const endpoint = `${API}/lenders/${user.id}/proposals/${expandedRowId}`;
//     try {
//       const response = await fetch(endpoint, {
//         method: "DELETE",
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (response.ok) {
//         alert("Proposal deleted successfully.");
//         setFilteredLoanProposals((prevProposals) =>
//           prevProposals.filter((proposal) => proposal.id !== expandedRowId)
//         );
//         setExpandedRowId(null);
//       } else {
//         const result = await response.json();
//         alert(result.error || "Error deleting proposal.");
//       }
//     } catch (error) {
//       alert(error.message || "Failed to delete the proposal.");
//     }
//   };

//   useEffect(() => {
//     loadLoanProposals();
//   }, [user]);

//   return (
//     <Grid item xs={12}>
//       {/* Title */}
//       <Typography
//         variant="h4"
//         sx={{
//           color: "#00a250",
//           marginBottom: 2,
//           textAlign: "center",
//           fontWeight: "bold",
//         }}
//       >
//         Loan Proposals
//       </Typography>

//       {/* KPI Section */}
//       <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
//         {/* KPI boxes */}
//         <Grid item xs={12} sm={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               padding: "20px",
//               textAlign: "center",
//               backgroundColor: "#f6f7f8",
//             }}
//           >
//             <Typography variant="h6" sx={{ color: "#00a250" }}>
//               Total Proposals
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#00a250" }}>
//               {totalProposals}
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
//             <Typography variant="h6" sx={{ color: "#00a250" }}>
//               Average Interest Rate
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#00a250" }}>
//               {isNaN(averageInterestRate)
//                 ? "N/A"
//                 : averageInterestRate.toFixed(2)}
//               %
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
//             <Typography variant="h6" sx={{ color: "#00a250" }}>
//               Total Loan Participation
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#00a250" }}>
//               $
//               {totalLoanParticipation.toLocaleString("en-US", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </Typography>
//           </Paper>
//         </Grid>

//         {/* Second Row */}
//         <Grid item xs={12} sm={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               padding: "20px",
//               textAlign: "center",
//               backgroundColor: "#f6f7f8",
//             }}
//           >
//             <Typography variant="h6" sx={{ color: "#00a250" }}>
//               Accepted Proposals
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#00a250" }}>
//               {acceptedProposals}
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
//             <Typography variant="h6" sx={{ color: "#00a250" }}>
//               Proposals Pending Decision
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#00a250" }}>
//               {pendingProposals}
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
//             <Typography variant="h6" sx={{ color: "#00a250" }}>
//               Rejected Proposals
//             </Typography>
//             <Typography variant="h4" sx={{ color: "#00a250" }}>
//               {rejectedProposals}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Table */}
//       <Paper elevation={0} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
//         <Grid
//           container
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ marginBottom: 2 }}
//         >
//           <Grid item>
//             <TextField
//               placeholder="Search Loan Proposals"
//               variant="outlined"
//               value={searchTermLoanProposals}
//               onChange={handleSearchChangeLoanProposals}
//               sx={{
//                 backgroundColor: "#fff",
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": { borderColor: "#00a250" },
//                   "&:hover fieldset": { borderColor: "#00a250" },
//                   "&.Mui-focused fieldset": { borderColor: "#00a250" },
//                 },
//               }}
//             />
//           </Grid>
//         </Grid>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {[
//                   { header: "Title", sortKey: "title", align: "center" },
//                   {
//                     header: "Description",
//                     sortKey: "description",
//                     align: "center",
//                   },
//                   {
//                     header: "Loan Amount",
//                     sortKey: "loan_amount",
//                     align: "center",
//                   },
//                   {
//                     header: "Interest Rate",
//                     sortKey: "interest_rate",
//                     align: "center",
//                   },
//                   {
//                     header: "Repayment Term",
//                     sortKey: "repayment_term",
//                     align: "center",
//                   },
//                   { header: "Status", sortKey: "accepted", align: "center" },
//                 ].map(({ header, sortKey, align }) => (
//                   <TableCell
//                     key={header}
//                     align={align}
//                     sx={{ color: "#00a250", fontWeight: "bold" }}
//                   >
//                     <TableSortLabel
//                       active={sortBy === sortKey}
//                       direction={sortDirection}
//                       onClick={() => handleSort(sortKey)}
//                     >
//                       {header}
//                     </TableSortLabel>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredLoanProposals
//                 .slice(
//                   pageLoanProposals * rowsPerPageLoanProposals,
//                   pageLoanProposals * rowsPerPageLoanProposals +
//                     rowsPerPageLoanProposals
//                 )
//                 .map((loan) => (
//                   <React.Fragment key={loan.id}>
//                     <TableRow
//                       hover
//                       style={{ cursor: "pointer" }}
//                       onClick={() =>
//                         toggleRowExpansion(loan.id, loan.borrower_id, loan)
//                       }
//                     >
//                       <TableCell align="left" sx={{ color: "#00a250" }}>
//                         {loan.title}
//                       </TableCell>
//                       <TableCell align="left">{loan.description}</TableCell>
//                       <TableCell align="center">
//                         {parseFloat(loan.loan_amount).toLocaleString("en-US", {
//                           style: "currency",
//                           currency: "USD",
//                         })}
//                       </TableCell>
//                       <TableCell align="center">
//                         {parseFloat(loan.interest_rate).toFixed(2)}%
//                       </TableCell>
//                       <TableCell align="center">
//                         {loan.repayment_term} months
//                       </TableCell>
//                       <TableCell align="center">
//                         {loan.accepted === null || loan.accepted === undefined
//                           ? "Pending"
//                           : loan.accepted
//                           ? "Accepted"
//                           : "Rejected"}
//                       </TableCell>
//                     </TableRow>

//                     {expandedRowId === loan.id && (
//                       <TableRow key={`${loan.id}-collapse`}>
//                         <TableCell colSpan={6}>
//                           <Collapse in={expandedRowId === loan.id}>
//                             <Box
//                               margin={2}
//                               sx={{
//                                 backgroundColor: "#fff",
//                                 padding: 2,
//                                 borderRadius: 2,
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <Grid container spacing={2}>
//                                 <Grid item xs={6}>
//                                   <Typography
//                                     variant="h6"
//                                     sx={{ color: "#00a250", marginBottom: 1 }}
//                                   >
//                                     Borrower Details
//                                   </Typography>
//                                   <Box sx={{ marginTop: 2 }}>
//                                     <Typography>
//                                       <strong>Business Name:</strong>{" "}
//                                       {borrowerDetails.business_name}
//                                     </Typography>
//                                     <Typography>
//                                       <strong>Industry:</strong>{" "}
//                                       {borrowerDetails.industry}
//                                     </Typography>
//                                     <Typography>
//                                       <strong>Location:</strong>{" "}
//                                       {borrowerDetails.street},{" "}
//                                       {borrowerDetails.city},{" "}
//                                       {borrowerDetails.state}{" "}
//                                       {borrowerDetails.zip_code}
//                                     </Typography>

//                                     <Typography
//                                       variant="subtitle1"
//                                       sx={{ marginTop: 2 }}
//                                     >
//                                       Credit Reports:
//                                     </Typography>
//                                     {creditReports.length > 0 ? (
//                                       <ul>
//                                         {creditReports.map((report, index) => {
//                                           const isExpired =
//                                             new Date(report.expire_at) <
//                                             new Date();
//                                           return (
//                                             <li
//                                               key={index}
//                                               style={{
//                                                 color: isExpired
//                                                   ? "red"
//                                                   : "black",
//                                               }}
//                                             >
//                                               Bureau: {report.credit_bureau},
//                                               Score:{" "}
//                                               <Link
//                                                 href={
//                                                   borrowerDetails.fico_score_link
//                                                 }
//                                                 target="_blank"
//                                                 sx={{ color: "#00a250" }}
//                                               >
//                                                 {report.score}
//                                               </Link>
//                                               , Expires on:{" "}
//                                               {new Date(
//                                                 report.expire_at
//                                               ).toLocaleDateString()}{" "}
//                                               {isExpired && "(EXPIRED)"}
//                                             </li>
//                                           );
//                                         })}
//                                       </ul>
//                                     ) : (
//                                       <Typography>
//                                         No reports available
//                                       </Typography>
//                                     )}

//                                     <Typography
//                                       variant="subtitle1"
//                                       sx={{ marginTop: 2 }}
//                                     >
//                                       Verified Documents:
//                                     </Typography>
//                                     <ul>
//                                       <li
//                                         style={{
//                                           color: creditReports.some(
//                                             (report) =>
//                                               new Date(report.expire_at) <
//                                               new Date()
//                                           )
//                                             ? "red"
//                                             : "#00a250",
//                                         }}
//                                       >
//                                         Credit Score - Verified{" "}
//                                         {creditReports.some(
//                                           (report) =>
//                                             new Date(report.expire_at) <
//                                             new Date()
//                                         ) && "(EXPIRED)"}
//                                       </li>
//                                       <li>
//                                         <Link
//                                           href={
//                                             borrowerDetails.secretary_of_state_link
//                                           }
//                                           target="_blank"
//                                           rel="noopener"
//                                           sx={{ color: "#00a250" }}
//                                         >
//                                           Secretary of State Certificate -
//                                           Verified
//                                         </Link>
//                                       </li>
//                                       <li>
//                                         <Link
//                                           href={
//                                             borrowerDetails.drivers_license_link
//                                           }
//                                           target="_blank"
//                                           rel="noopener"
//                                           sx={{ color: "#00a250" }}
//                                         >
//                                           Driver's License - Verified
//                                         </Link>
//                                       </li>
//                                     </ul>
//                                   </Box>
//                                 </Grid>

//                                 <Grid item xs={6}>
//                                   <Typography
//                                     variant="h6"
//                                     sx={{ color: "#00a250", marginBottom: 1 }}
//                                   >
//                                     Edit Loan Proposal
//                                   </Typography>
//                                   <Box sx={{ marginTop: 2 }}>
//                                     <TextField
//                                       label="Title"
//                                       fullWidth
//                                       name="title"
//                                       value={lenderProposal.title}
//                                       onChange={handleProposalChange}
//                                       sx={{ marginBottom: 2 }}
//                                     />
//                                     <TextField
//                                       label="Loan Amount"
//                                       fullWidth
//                                       name="loan_amount"
//                                       value={parseFloat(
//                                         lenderProposal.loan_amount
//                                       ).toLocaleString("en-US", {
//                                         style: "currency",
//                                         currency: "USD",
//                                       })}
//                                       InputProps={{
//                                         readOnly: true,
//                                         sx: { color: "gray" },
//                                       }}
//                                       sx={{ marginBottom: 2 }}
//                                     />
//                                     <TextField
//                                       label="Interest Rate"
//                                       fullWidth
//                                       name="interest_rate"
//                                       value={lenderProposal.interest_rate} // Editable interest rate
//                                       onChange={handleProposalChange}
//                                       sx={{ marginBottom: 2 }}
//                                     />
//                                     <TextField
//                                       label="Repayment Term"
//                                       fullWidth
//                                       name="repayment_term"
//                                       value={lenderProposal.repayment_term}
//                                       onChange={handleProposalChange}
//                                       sx={{ marginBottom: 2 }}
//                                     />
//                                     <Typography variant="subtitle1">
//                                       Additional Requirements
//                                     </Typography>
//                                     <FormControlLabel
//                                       control={
//                                         <Checkbox
//                                           checked={lenderProposal.requirements.includes(
//                                             "downpayment"
//                                           )}
//                                           onChange={handleCheckboxChange}
//                                           name="downpayment"
//                                           sx={{
//                                             color: "#00a250",
//                                             "&.Mui-checked": {
//                                               color: "#00a250",
//                                             },
//                                           }}
//                                         />
//                                       }
//                                       label="Downpayment"
//                                     />
//                                     <FormControlLabel
//                                       control={
//                                         <Checkbox
//                                           checked={lenderProposal.requirements.includes(
//                                             "personal_guarantee"
//                                           )}
//                                           onChange={handleCheckboxChange}
//                                           name="personal_guarantee"
//                                           sx={{
//                                             color: "#00a250",
//                                             "&.Mui-checked": {
//                                               color: "#00a250",
//                                             },
//                                           }}
//                                         />
//                                       }
//                                       label="Personal Guarantee"
//                                     />
//                                     <FormControlLabel
//                                       control={
//                                         <Checkbox
//                                           checked={lenderProposal.requirements.includes(
//                                             "others"
//                                           )}
//                                           onChange={handleCheckboxChange}
//                                           name="others"
//                                           sx={{
//                                             color: "#00a250",
//                                             "&.Mui-checked": {
//                                               color: "#00a250",
//                                             },
//                                           }}
//                                         />
//                                       }
//                                       label="Others"
//                                     />
//                                     <TextField
//                                       label="Description"
//                                       fullWidth
//                                       name="description"
//                                       value={lenderProposal.description}
//                                       onChange={handleProposalChange}
//                                       multiline
//                                       rows={3}
//                                       sx={{ marginTop: 2, marginBottom: 2 }}
//                                     />
//                                     <TextField
//                                       label="Created At"
//                                       fullWidth
//                                       name="created_at"
//                                       value={new Date(
//                                         lenderProposal.created_at
//                                       ).toLocaleDateString()}
//                                       InputProps={{
//                                         readOnly: true,
//                                         sx: { color: "gray" },
//                                       }}
//                                       sx={{ marginBottom: 2 }}
//                                     />
//                                     <TextField
//                                       label="Proposal Valid Until"
//                                       fullWidth
//                                       name="expire_at"
//                                       value={
//                                         lenderProposal.expire_at
//                                           ? new Date(
//                                               lenderProposal.expire_at
//                                             ).toLocaleDateString("en-US", {
//                                               weekday: "short",
//                                               year: "numeric",
//                                               month: "short",
//                                               day: "numeric",
//                                             })
//                                           : ""
//                                       }
//                                       onChange={handleProposalChange}
//                                       sx={{ marginBottom: 2 }}
//                                     />
//                                     <Box
//                                       sx={{
//                                         display: "flex",
//                                         justifyContent: "flex-start",
//                                         gap: "10px",
//                                         marginTop: 2,
//                                       }}
//                                     >
//                                       <Button
//                                         variant="contained"
//                                         sx={{
//                                           backgroundColor: "#00a250",
//                                           color: "#fff",
//                                           "&:hover": {
//                                             backgroundColor: "#007a3e",
//                                           },
//                                         }}
//                                         onClick={handleResubmitProposal}
//                                       >
//                                         Resend Proposal
//                                       </Button>
//                                       <Button
//                                         variant="contained"
//                                         sx={{
//                                           backgroundColor: "darkred",
//                                           color: "#fff",
//                                           "&:hover": {
//                                             backgroundColor: "#b30000",
//                                           },
//                                         }}
//                                         onClick={handleDeleteProposal}
//                                       >
//                                         Delete Proposal
//                                       </Button>
//                                       <Button
//                                         variant="contained"
//                                         sx={{
//                                           backgroundColor: "gray",
//                                           color: "#fff",
//                                           "&:hover": {
//                                             backgroundColor: "black",
//                                           },
//                                         }}
//                                         onClick={() => setExpandedRowId(null)}
//                                       >
//                                         Cancel
//                                       </Button>
//                                     </Box>
//                                   </Box>
//                                 </Grid>
//                               </Grid>
//                             </Box>
//                           </Collapse>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </React.Fragment>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           component="div"
//           count={filteredLoanProposals.length || 0}
//           page={pageLoanProposals}
//           onPageChange={(event, newPage) => setPageLoanProposals(newPage)}
//           rowsPerPage={rowsPerPageLoanProposals}
//           onRowsPerPageChange={(event) =>
//             setRowsPerPageLoanProposals(parseInt(event.target.value, 10))
//           }
//           rowsPerPageOptions={[5, 10, 25, 50, 100]}
//         />
//       </Paper>
//     </Grid>
//   );
// }

// LoanProposals.propTypes = {
//   user: PropTypes.object,
//   token: PropTypes.string,
//   loanProposals: PropTypes.array,
//   loadLoanProposals: PropTypes.func,
//   filteredLoanProposals: PropTypes.array,
//   setFilteredLoanProposals: PropTypes.func,
// };

import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Button,
  Collapse,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
  TablePagination,
  TableSortLabel,
  Alert,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;

export default function LoanProposals({
  user,
  token,
  loanProposals = [],
  loadLoanProposals,
  filteredLoanProposals = [],
  setFilteredLoanProposals,
}) {
  const [pageLoanProposals, setPageLoanProposals] = useState(0);
  const [rowsPerPageLoanProposals, setRowsPerPageLoanProposals] = useState(5);
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [creditReports, setCreditReports] = useState([]);
  const [viewedRows, setViewedRows] = useState(() => {
    const storedViewedRows = localStorage.getItem("viewedRowsProposals");
    return storedViewedRows ? JSON.parse(storedViewedRows) : [];
  });

  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    requirements: [],
    created_at: "",
    expire_at: "",
  });
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("title");
  const [notification, setNotification] = useState(null);

  const totalProposals = filteredLoanProposals.length;
  const totalLoanParticipation = Array.isArray(filteredLoanProposals)
    ? filteredLoanProposals.reduce(
        (acc, loan) => acc + parseFloat(loan.loan_amount),
        0
      )
    : 0;
  const averageInterestRate =
    Array.isArray(filteredLoanProposals) && filteredLoanProposals.length > 0
      ? filteredLoanProposals.reduce(
          (acc, loan) => acc + parseFloat(loan.interest_rate),
          0
        ) / filteredLoanProposals.length
      : 0;

  const acceptedProposals = filteredLoanProposals.filter(
    (loan) => loan.accepted === true
  ).length;
  const pendingProposals = filteredLoanProposals.filter(
    (loan) => loan.accepted === null || loan.accepted === undefined
  ).length;
  const rejectedProposals = filteredLoanProposals.filter(
    (loan) => loan.accepted === false
  ).length;

  const fetchBorrowerDetails = async (borrowerId) => {
    if (!borrowerId) return;
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      if (!res.ok) throw new Error("Failed to fetch borrower details");
      const data = await res.json();

      setBorrowerDetails({
        business_name: data.borrower.business_name || "N/A",
        industry: data.borrower.industry || "N/A",
        street: data.borrower.street || "N/A",
        city: data.borrower.city || "N/A",
        state: data.borrower.state || "N/A",
        zip_code: data.borrower.zip_code || "N/A",
        fico_score_link:
          data.borrower.fico_score_link || "/mock-fico-score.pdf",
        secretary_of_state_link:
          data.borrower.secretary_of_state_link || "/mock-sos-certificate.pdf",
        drivers_license_link:
          data.borrower.drivers_license_link || "/mock-drivers-license.pdf",
      });
      setCreditReports(data.credit_reports);
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  const toggleRowExpansion = (rowId, borrowerId, proposal) => {
    // Mark the row as viewed
    if (!viewedRows.includes(rowId)) {
      const updatedViewedRows = [...viewedRows, rowId];
      setViewedRows(updatedViewedRows);
      localStorage.setItem(
        "viewedRowsProposals",
        JSON.stringify(updatedViewedRows)
      );
    }

    // Toggle row expansion
    if (expandedRowId === rowId) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(rowId);
      fetchBorrowerDetails(borrowerId);
      if (proposal) {
        setLenderProposal({
          title: proposal.title,
          description: proposal.description,
          loan_amount: proposal.loan_amount.toString(),
          interest_rate: proposal.interest_rate.toString(),
          repayment_term: proposal.repayment_term.toString(),
          requirements: proposal.requirements || [],
          created_at: proposal.created_at,
          expire_at: proposal.expire_at,
        });
      }
    }
  };

  const handleProposalChange = (event) => {
    const { name, value } = event.target;
    setLenderProposal((prevProposal) => ({
      ...prevProposal,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setLenderProposal((prevProposal) => ({
      ...prevProposal,
      requirements: prevProposal.requirements.includes(name)
        ? prevProposal.requirements.filter((req) => req !== name)
        : [...prevProposal.requirements, name],
    }));
  };

  const handleResubmitProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount),
      interest_rate: parseFloat(lenderProposal.interest_rate),
      repayment_term: parseInt(lenderProposal.repayment_term, 10),
    };

    const endpoint = `${API}/lenders/${user.id}/proposals/${expandedRowId}`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(proposalData),
      });

      const result = await response.json();
      if (response.ok) {
        setNotification({
          message: "Proposal resubmitted successfully.",
          severity: "success",
        });
        setExpandedRowId(null);
      } else {
        setNotification({
          message: result.error || "Error resubmitting proposal.",
          severity: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: error.message || "Failed to resubmit the proposal.",
        severity: "error",
      });
    }
  };

  const handleSearchChangeLoanProposals = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanProposals(term);

    const filteredProposals = loanProposals.filter(
      (loan) =>
        loan.title?.toLowerCase().includes(term) ||
        loan.description?.toLowerCase().includes(term)
    );

    setFilteredLoanProposals(filteredProposals);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);

    const sortedProposals = [...filteredLoanProposals].sort((a, b) => {
      if (property === "expire_at") {
        const dateA = new Date(a.expire_at);
        const dateB = new Date(b.expire_at);
        return isAsc ? dateA - dateB : dateB - dateA;
      } else if (property === "requirements") {
        return isAsc
          ? a.requirements.length - b.requirements.length
          : b.requirements.length - a.requirements.length;
      } else {
        return isAsc
          ? a[property] < b[property]
            ? -1
            : 1
          : a[property] > b[property]
            ? -1
            : 1;
      }
    });

    setFilteredLoanProposals(sortedProposals);
  };

  const handleDeleteProposal = async () => {
    const endpoint = `${API}/lenders/${user.id}/proposals/${expandedRowId}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        setNotification({
          message: "Proposal deleted successfully.",
          severity: "success",
        });
        setFilteredLoanProposals((prevProposals) =>
          prevProposals.filter((proposal) => proposal.id !== expandedRowId)
        );
        setExpandedRowId(null);
      } else {
        const result = await response.json();
        setNotification({
          message: result.error || "Error deleting proposal.",
          severity: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: error.message || "Failed to delete the proposal.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    loadLoanProposals();

    // Check if all proposals are still pending
    if (
      pendingProposals > 0 &&
      acceptedProposals === 0 &&
      rejectedProposals === 0
    ) {
      setNotification({
        message: "All proposals are still pending.",
        severity: "info",
      });
    }
  }, [user]);

  return (
    <Grid item xs={12}>
      <Typography
        variant="h4"
        sx={{
          color: "#00a250",
          marginBottom: 2,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Loan Proposals
      </Typography>

      {notification && (
        <Alert
          severity={notification.severity}
          onClose={() => setNotification(null)}
          sx={{
            marginBottom: 2,
            backgroundColor: "transparent",
            color: "#00a250",
            "& .MuiAlert-icon": {
              color: "#00a250",
            },
          }}
        >
          {notification.message}
        </Alert>
      )}

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
            <Typography variant="h6" sx={{ color: "#00a250" }}>
              Total Proposals
            </Typography>
            <Typography variant="h4" sx={{ color: "#00a250" }}>
              {totalProposals}
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
            <Typography variant="h6" sx={{ color: "#00a250" }}>
              Average Interest Rate
            </Typography>
            <Typography variant="h4" sx={{ color: "#00a250" }}>
              {isNaN(averageInterestRate)
                ? "N/A"
                : averageInterestRate.toFixed(2)}
              %
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
            <Typography variant="h6" sx={{ color: "#00a250" }}>
              Total Loan Participation
            </Typography>
            <Typography variant="h4" sx={{ color: "#00a250" }}>
              $
              {totalLoanParticipation.toLocaleString("en-US", {
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
            <Typography variant="h6" sx={{ color: "#00a250" }}>
              Accepted Proposals
            </Typography>
            <Typography variant="h4" sx={{ color: "#00a250" }}>
              {acceptedProposals}
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
            <Typography variant="h6" sx={{ color: "#00a250" }}>
              Proposals Pending Decision
            </Typography>
            <Typography variant="h4" sx={{ color: "#00a250" }}>
              {pendingProposals}
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
            <Typography variant="h6" sx={{ color: "#00a250" }}>
              Rejected Proposals
            </Typography>
            <Typography variant="h4" sx={{ color: "#00a250" }}>
              {rejectedProposals}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item>
            <TextField
              placeholder="Search Loan Proposals"
              variant="outlined"
              value={searchTermLoanProposals}
              onChange={handleSearchChangeLoanProposals}
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
                  { header: "Title", sortKey: "title", align: "center" },
                  {
                    header: "Description",
                    sortKey: "description",
                    align: "center",
                  },
                  {
                    header: "Loan Amount",
                    sortKey: "loan_amount",
                    align: "center",
                  },
                  {
                    header: "Interest Rate",
                    sortKey: "interest_rate",
                    align: "center",
                  },
                  {
                    header: "Repayment Term",
                    sortKey: "repayment_term",
                    align: "center",
                  },
                  {
                    header: "Offer Valid Until",
                    sortKey: "expire_at",
                    align: "center",
                  },
                  {
                    header: "Additional Requirements",
                    sortKey: "requirements",
                    align: "center",
                  },
                  { header: "Status", sortKey: "accepted", align: "center" },
                ].map(({ header, sortKey, align }) => (
                  <TableCell
                    key={header}
                    align={align}
                    sx={{ color: "#00a250", fontWeight: "bold" }}
                  >
                    <TableSortLabel
                      active={sortBy === sortKey}
                      direction={sortDirection}
                      onClick={() => handleSort(sortKey)}
                    >
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLoanProposals
                .slice(
                  pageLoanProposals * rowsPerPageLoanProposals,
                  pageLoanProposals * rowsPerPageLoanProposals +
                    rowsPerPageLoanProposals
                )
                .map((loan) => (
                  <React.Fragment key={loan.id}>
                    <TableRow
                      hover
                      style={{
                        cursor: "pointer",
                        backgroundColor: viewedRows.includes(loan.id)
                          ? "#d3d3d3" // Light gray for viewed rows
                          : "#fff", // White for unviewed rows
                      }}
                      onClick={() =>
                        toggleRowExpansion(loan.id, loan.borrower_id, loan)
                      }
                    >
                      <TableCell align="left" sx={{ color: "#00a250" }}>
                        {loan.title}
                      </TableCell>
                      <TableCell align="left">{loan.description}</TableCell>
                      <TableCell align="center">
                        {parseFloat(loan.loan_amount).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {parseFloat(loan.interest_rate).toFixed(2)}%
                      </TableCell>
                      <TableCell align="center">
                        {loan.repayment_term} months
                      </TableCell>
                      <TableCell align="center">
                        {loan.expire_at
                          ? new Date(loan.expire_at).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {loan.requirements && loan.requirements.length > 0
                          ? loan.requirements.join(", ")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {loan.accepted === null || loan.accepted === undefined
                          ? "Pending"
                          : loan.accepted
                          ? "Accepted"
                          : "Rejected"}
                      </TableCell>
                    </TableRow>

                    {expandedRowId === loan.id && (
                      <TableRow key={`${loan.id}-collapse`}>
                        <TableCell colSpan={8}>
                          <Collapse in={expandedRowId === loan.id}>
                            <Box
                              margin={2}
                              sx={{
                                backgroundColor: "#fff",
                                padding: 2,
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#00a250", marginBottom: 1 }}
                                  >
                                    Borrower Details
                                  </Typography>
                                  <Box sx={{ marginTop: 2 }}>
                                    <Typography>
                                      <strong>Business Name:</strong>{" "}
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
                                      sx={{ marginTop: 2 }}
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
                                      Verified Documents:
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
                                    sx={{ color: "#00a250", marginBottom: 1 }}
                                  >
                                    Edit Loan Proposal
                                  </Typography>
                                  <Box sx={{ marginTop: 2 }}>
                                    <TextField
                                      label="Title"
                                      fullWidth
                                      name="title"
                                      value={lenderProposal.title}
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Loan Amount"
                                      fullWidth
                                      name="loan_amount"
                                      value={parseFloat(
                                        lenderProposal.loan_amount
                                      ).toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                      })}
                                      InputProps={{
                                        readOnly: true,
                                        sx: { color: "gray" },
                                      }}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Interest Rate"
                                      fullWidth
                                      name="interest_rate"
                                      value={lenderProposal.interest_rate}
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Repayment Term"
                                      fullWidth
                                      name="repayment_term"
                                      value={lenderProposal.repayment_term}
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <Typography variant="subtitle1">
                                      Additional Requirements
                                    </Typography>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={lenderProposal.requirements.includes(
                                            "downpayment"
                                          )}
                                          onChange={handleCheckboxChange}
                                          name="downpayment"
                                          sx={{
                                            color: "#00a250",
                                            "&.Mui-checked": {
                                              color: "#00a250",
                                            },
                                          }}
                                        />
                                      }
                                      label="Downpayment"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={lenderProposal.requirements.includes(
                                            "personal_guarantee"
                                          )}
                                          onChange={handleCheckboxChange}
                                          name="personal_guarantee"
                                          sx={{
                                            color: "#00a250",
                                            "&.Mui-checked": {
                                              color: "#00a250",
                                            },
                                          }}
                                        />
                                      }
                                      label="Personal Guarantee"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={lenderProposal.requirements.includes(
                                            "others"
                                          )}
                                          onChange={handleCheckboxChange}
                                          name="others"
                                          sx={{
                                            color: "#00a250",
                                            "&.Mui-checked": {
                                              color: "#00a250",
                                            },
                                          }}
                                        />
                                      }
                                      label="Others"
                                    />
                                    <TextField
                                      label="Description"
                                      fullWidth
                                      name="description"
                                      value={lenderProposal.description}
                                      onChange={handleProposalChange}
                                      multiline
                                      rows={3}
                                      sx={{ marginTop: 2, marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Created At"
                                      fullWidth
                                      name="created_at"
                                      value={new Date(
                                        lenderProposal.created_at
                                      ).toLocaleDateString()}
                                      InputProps={{
                                        readOnly: true,
                                        sx: { color: "gray" },
                                      }}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Proposal Valid Until"
                                      fullWidth
                                      name="expire_at"
                                      value={
                                        lenderProposal.expire_at
                                          ? new Date(
                                              lenderProposal.expire_at
                                            ).toLocaleDateString("en-US", {
                                              weekday: "short",
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                            })
                                          : ""
                                      }
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
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
                                        onClick={handleResubmitProposal}
                                      >
                                        Resend Proposal
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
                                        onClick={handleDeleteProposal}
                                      >
                                        Delete Proposal
                                      </Button>
                                      <Button
                                        variant="contained"
                                        sx={{
                                          backgroundColor: "gray",
                                          color: "#fff",
                                          "&:hover": {
                                            backgroundColor: "black",
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
          count={filteredLoanProposals.length || 0}
          page={pageLoanProposals}
          onPageChange={(event, newPage) => setPageLoanProposals(newPage)}
          rowsPerPage={rowsPerPageLoanProposals}
          onRowsPerPageChange={(event) =>
            setRowsPerPageLoanProposals(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Paper>
    </Grid>
  );
}

LoanProposals.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  loanProposals: PropTypes.array,
  loadLoanProposals: PropTypes.func,
  filteredLoanProposals: PropTypes.array,
  setFilteredLoanProposals: PropTypes.func,
};
