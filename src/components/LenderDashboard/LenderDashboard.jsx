// // src/components/LenderDashboard/LenderDashboard.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   TablePagination,
//   TextField,
// } from "@mui/material";
// import "./LenderDashboard.scss";

// const API = import.meta.env.VITE_BASE_URL;

// export default function LenderDashboard({ user, token }) {
//   // states for listings
//   const [loanProposals, setLoanProposals] = useState([]);
//   const [loanListings, setLoanListings] = useState([]);
//   // filtering for listings
//   const [filteredloanProposals, setFilteredLoanProposals] = useState([]);
//   const [filteredloanListings, setFilteredLoanListings] = useState([]);
//   // Paginations
//   const [pageBorrowers, setPageBorrowers] = useState(0);
//   const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
//   const [pageloanProposals, setPageloanProposals] = useState(0);
//   const [rowsPerPageloanProposals, setRowsPerPageloanProposals] = useState(5);
//   // Filter states to search Listing and Proposals
//   const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
//   const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");

//   const calculateTotalLoanVolume = () => {
//     if (!Array.isArray(loanProposals) || loanProposals.length === 0) {
//       return "0.00";
//     }
//     const total = loanProposals.reduce((total, loan) => {
//       const loanValue = parseFloat(loan.loan_amount) || 0;
//       return total + loanValue;
//     }, 0);

//     return total
//       .toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       })
//       .replace("$", "");
//   };

//   // PAGINATION CODE START!!
//   const handleChangePageBorrowers = (event, newPage) => {
//     setPageBorrowers(newPage);
//   };

//   const handleChangeRowsPerPageBorrowers = (event) => {
//     setRowsPerPageBorrowers(parseInt(event.target.value, 10));
//     setPageBorrowers(0);
//   };

//   const handleChangePageloanProposals = (event, newPage) => {
//     setPageloanProposals(newPage);
//   };

//   const handleChangeRowsPerPageloanProposals = (event) => {
//     setRowsPerPageloanProposals(parseInt(event.target.value, 10));
//     setPageloanProposals(0);
//   };
//   // PAGINATION CODE END!!!

//   // Search bar for Loan Listings
//   const handleSearchChangeLoanListings = (event) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTermLoanListings(term);

//     const filteredListings = loanListings.filter(
//       (listing) =>
//         listing.title.toLowerCase().includes(term) ||
//         listing.description.toLowerCase().includes(term)
//     );

//     setFilteredLoanListings(filteredListings);
//   };

//   // Search bar for Loan Proposals
//   const handleSearchChangeLoanProposals = (event) => {
//     const term = event.target.value.toLowerCase();
//     setSearchTermLoanProposals(term);

//     const filteredProposals = loanProposals.filter(
//       (loan) =>
//         loan.title.toLowerCase().includes(term) ||
//         loan.description.toLowerCase().includes(term)
//     );
//     setFilteredLoanProposals(filteredProposals);
//   };

//   const handleDelete = (loanRequestId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this Proposal?"
//     );

//     if (!confirmed) return;
//     const options = {
//       method: "DELETE",
//       headers: {
//         Authorization: token,
//       },
//     };
//     console.log(`${API}/lenders/${user.id}/proposals/${loanRequestId}`);
//     fetch(`${API}/lenders/${user.id}/proposals/${loanRequestId}`, options)
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           alert("Something went wrong during deletion");
//         }
//       })
//       .then((res) => {
//         const filteredIDX = filteredloanProposals.findIndex(
//           (proposal) => proposal.id == res.id
//         );
//         const proposalIdx = loanProposals.findIndex(
//           (proposal) => proposal.id == res.id
//         );

//         let loanProposalsArr = filteredloanProposals;
//         loanProposalsArr.splice(filteredIDX, 1);
//         setFilteredLoanListings(loanProposals);

//         loanProposalsArr = loanProposals;
//         loanProposalsArr.slplice(proposalIdx, 1);
//         setLoanProposals(loanProposalsArr);
//       })
//       .catch((err) => {
//         alert(`Failed to delete proposal: ${err.message}`);
//       });
//   };

//   // adds commas and converts the number into proper display.
//   const loanListingValueTotal = () => {
//     let loanTotal = loanListings.reduce((total, loan) => {
//       return total + (parseFloat(loan.value) || 0);
//     }, 0);
//     return loanTotal
//       .toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       })
//       .replace("$", "");
//   };

//   useEffect(() => {
//     const options = {
//       headers: {
//         Authorization: token,
//       },
//     };
//     // Load Proposals
//     fetch(`${API}/lenders/${user.id}/proposals`, options)
//       .then((res) => res.json())
//       .then((data) => {
//         setLoanProposals(data);
//         setFilteredLoanProposals(data);
//       })
//       .catch((err) => console.log(err));
//     // Load available requests
//     fetch(`${API}/lenders/${user.id}/requests`, options)
//       .then((res) => res.json())
//       .then((data) => {
//         setLoanListings(data);
//         setFilteredLoanListings(data);
//       })
//       .catch((err) => console.log(err));
//   }, [user]);

//   return (
//     <div className="lender-dashboard">
//       <AppBar position="static" color="secondary" className="app-bar">
//         <Toolbar
//           style={{ width: "100%" }}
//           sx={{ background: "rgb(1, 162, 80)" }}
//         >
//           <Grid container justifyContent="space-between" alignItems="center">
//             {/* Left Side: Welcome Message */}
//             <Grid item>
//               <Typography variant="h1" className="welcome-title">
//                 Welcome
//               </Typography>
//               <Typography
//                 className="lender-name"
//                 variant="h3"
//                 ml={"4em"}
//                 mb={"10px"}
//               >
//                 {/* <em>{`${userlenderData.business_name}`}</em> */}
//                 <em>{`${user.business_name}`}</em>
//               </Typography>
//             </Grid>

//             {/* Right Side: Total Loan Volume */}
//             <Grid item>
//               <Paper elevation={3} className="total-loan-volume">
//                 <Typography variant="h6">
//                   Portfolio Volume: $
//                   <span style={{ color: "green", fontStyle: "italic" }}>
//                     {loanProposals.length === 0
//                       ? 0
//                       : calculateTotalLoanVolume()}
//                   </span>
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>

//       <Grid container spacing={3}>
//         {/* Loan Listings Table */}
//         <Grid item xs={12} md={12}>
//           <Paper elevation={3} className="loan-listings-table">
//             <Typography variant="h6" component="div">
//               <Grid
//                 container
//                 justifyContent="space-between"
//                 alignItems="center"
//                 spacing={0}
//                 sx={{ padding: "0", m: "0" }}
//               >
//                 {/* Left: Title */}
//                 <Grid item>Available Loan Listings</Grid>
//                 <Grid item>
//                   Current Loan Listing Value:{" "}
//                   <span style={{ color: "green" }}>
//                     {loanListingValueTotal()}
//                   </span>
//                 </Grid>

//                 {/* Right: Search Bar */}
//                 <Grid item>
//                   <TextField
//                     placeholder="Search Loan Listings"
//                     variant="outlined"
//                     value={searchTermLoanListings}
//                     onChange={handleSearchChangeLoanListings}
//                     className="search-bar"
//                     inputProps={{
//                       style: { textAlign: "center" },
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow className="table-header">
//                     <TableCell>Title</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Value</TableCell>
//                     <TableCell>Created On</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody className="table-body">
//                   {filteredloanListings
//                     .slice(
//                       pageBorrowers * rowsPerPageBorrowers,
//                       pageBorrowers * rowsPerPageBorrowers +
//                         rowsPerPageBorrowers
//                     )
//                     .map((loan) => (
//                       <TableRow key={loan.id}>
//                         <TableCell>{loan.title}</TableCell>
//                         <TableCell>{loan.description}</TableCell>
//                         <TableCell>
//                           {parseFloat(loan.value)
//                             .toLocaleString("en-US", {
//                               style: "currency",
//                               currency: "USD",
//                               minimumFractionDigits: 2,
//                               maximumFractionDigits: 2,
//                             })
//                             .replace("$", "")}
//                         </TableCell>
//                         <TableCell>
//                           {new Date(loan.created_at).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell
//                           className="action-buttons"
//                           sx={{ textAlign: "center" }}
//                         >
//                           <Button className="action-btn-one">
//                             <Link
//                             // to={`/lenders/${id}/requests/${loan.id}/newproposal`}
//                             >
//                               Submit Offer
//                             </Link>
//                           </Button>
//                           <Button className="action-btn-two">
//                             <Link>PASS</Link>
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <TablePagination
//               component="div"
//               count={filteredloanListings.length}
//               page={pageBorrowers}
//               onPageChange={handleChangePageBorrowers}
//               rowsPerPage={rowsPerPageBorrowers}
//               onRowsPerPageChange={handleChangeRowsPerPageBorrowers}
//               rowsPerPageOptions={[5, 10, 25, 50, 100]}
//             />
//           </Paper>
//         </Grid>
//         {/* Loan Proposals Table */}
//         <Grid item xs={12} md={12}>
//           <Paper elevation={3} className="loan-requests-table">
//             <Typography variant="h6" component="div">
//               <Grid
//                 container
//                 justifyContent="space-between"
//                 alignItems="center"
//                 spacing={0}
//                 sx={{ padding: "0", m: "0" }}
//               >
//                 {/* Left: Title */}
//                 <Grid item>Pending Loan Proposals</Grid>

//                 {/* Right: Search Bar */}
//                 <Grid item>
//                   <TextField
//                     placeholder="Search Loan Proposals"
//                     variant="outlined"
//                     value={searchTermLoanProposals}
//                     onChange={handleSearchChangeLoanProposals}
//                     className="search-bar"
//                     inputProps={{
//                       style: { textAlign: "center" },
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Typography>
//             {filteredloanProposals.length === 0 ? (
//               <Typography
//                 variant="body1"
//                 textAlign="center"
//                 sx={{ padding: "20px" }}
//               >
//                 No Loan Proposals Available
//               </Typography>
//             ) : (
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow className="table-header">
//                       <TableCell>Title</TableCell>
//                       <TableCell>Description</TableCell>
//                       <TableCell>Created At</TableCell>
//                       <TableCell colSpan={3}>Action</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody className="table-body">
//                     {Array.isArray(filteredloanProposals) &&
//                     filteredloanProposals.length > 0 ? (
//                       filteredloanProposals
//                         .slice(
//                           pageloanProposals * rowsPerPageloanProposals,
//                           pageloanProposals * rowsPerPageloanProposals +
//                             rowsPerPageloanProposals
//                         )
//                         .map((loan) => (
//                           <TableRow key={loan.id}>
//                             <TableCell>{loan.title}</TableCell>
//                             <TableCell sx={{ textAlign: "center" }}>
//                               {loan.description}
//                             </TableCell>
//                             <TableCell>
//                               {new Date(loan.created_at).toLocaleDateString()}
//                             </TableCell>
//                             <TableCell
//                               className="action-buttons"
//                               sx={{ textAlign: "center" }}
//                             >
//                               <Button className="action-btn-one">
//                                 <Link
//                                 // to={`/lenders/${id}/proposals/${loan.id}/edit`}
//                                 >
//                                   Review
//                                 </Link>
//                               </Button>
//                               <Button
//                                 className="action-btn-two"
//                                 onClick={() => handleDelete(loan.id)}
//                               >
//                                 Delete
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={4} style={{ textAlign: "center" }}>
//                           No Loan Proposals Available
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//             <TablePagination
//               component="div"
//               count={filteredloanProposals.length}
//               page={pageloanProposals}
//               onPageChange={handleChangePageloanProposals}
//               rowsPerPage={rowsPerPageloanProposals}
//               onRowsPerPageChange={handleChangeRowsPerPageloanProposals}
//               rowsPerPageOptions={[0, 5, 10, 25, 50, 100]}
//             />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// LenderDashboard.propTypes = {
//   user: PropTypes.object,
//   token: PropTypes.string,
// };

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  Collapse,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const API = import.meta.env.VITE_BASE_URL;

export default function LenderDashboard({ user, token }) {
  const [loanProposals, setLoanProposals] = useState([]);
  const [loanListings, setLoanListings] = useState([]);
  const [filteredLoanProposals, setFilteredLoanProposals] = useState([]);
  const [filteredLoanListings, setFilteredLoanListings] = useState([]);
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageloanProposals, setPageloanProposals] = useState(0);
  const [rowsPerPageloanProposals, setRowsPerPageloanProposals] = useState(5);
  const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);

  const [borrowerDetails, setBorrowerDetails] = useState({
    business_name: "",
    industry: "",
    credit_score: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    created_at: new Date().toLocaleDateString(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  const toggleRowExpansion = (rowId, borrowerId) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
    if (borrowerId && expandedRowId !== rowId) {
      fetchBorrowerDetails(borrowerId);
    }
  };

  const fetchBorrowerDetails = async (borrowerId) => {
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setBorrowerDetails(data);
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  const handleProposalChange = (e) => {
    setLenderProposal({ ...lenderProposal, [e.target.name]: e.target.value });
  };

  const handlePass = () => {
    setExpandedRowId(null);
  };

  const handleSubmitProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount), // Ensure it's a number
      interest_rate: parseFloat(lenderProposal.interest_rate), // Ensure it's a number
      repayment_term: parseInt(lenderProposal.repayment_term, 10), // Ensure it's an integer
      created_at: new Date().toISOString(),
    };

    const endpoint = `${API}/lenders/${user.id}/requests/${expandedRowId}`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(proposalData),
      });

      const result = await response.json();
      if (response.ok) {
        setDialogTitle("Success");
        setDialogMessage("Proposal submitted successfully.");
        setExpandedRowId(null);
      } else {
        setDialogTitle("Error");
        setDialogMessage(result.error || "Error submitting proposal.");
      }
    } catch (error) {
      setDialogTitle("Error");
      setDialogMessage(error.message || "Failed to submit the proposal.");
    } finally {
      setDialogOpen(true); // Show dialog regardless of success or failure
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const loanListingValueTotal = () => {
    let loanTotal = loanListings.reduce((total, loan) => {
      return total + (parseFloat(loan.value) || 0);
    }, 0);

    return loanTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateTotalLoanVolume = () => {
    if (!Array.isArray(loanProposals) || loanProposals.length === 0) {
      return "0.00";
    }
    const total = loanProposals.reduce((total, loan) => {
      const loanValue = parseFloat(loan.loan_amount) || 0;
      return total + loanValue;
    }, 0);

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSearchChangeLoanListings = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanListings(term);

    const filteredListings = loanListings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(term) ||
        listing.description.toLowerCase().includes(term)
    );

    setFilteredLoanListings(filteredListings);
  };

  const handleSearchChangeLoanProposals = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanProposals(term);

    const filteredProposals = loanProposals.filter(
      (loan) =>
        loan.title.toLowerCase().includes(term) ||
        loan.description.toLowerCase().includes(term)
    );
    setFilteredLoanProposals(filteredProposals);
  };

  useEffect(() => {
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/lenders/${user.id}/proposals`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoanProposals(data);
        setFilteredLoanProposals(data);
      })
      .catch((err) => console.log(err));
    fetch(`${API}/lenders/${user.id}/requests`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoanListings(data);
        setFilteredLoanListings(data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className="lender-dashboard" style={{ backgroundColor: "#f6f7f8" }}>
      <AppBar position="static" sx={{ backgroundColor: "#00a250" }}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4" sx={{ color: "#f6f7f8" }}>
                Welcome
              </Typography>
              <Typography variant="h6" sx={{ color: "#f6f7f8" }}>
                <em>{user.business_name}</em>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Loan Listings Table */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
            <Typography
              variant="h5"
              sx={{ color: "#00a250", marginBottom: 2, textAlign: "center" }}
            >
              The Loans Marketplace
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#00a250", marginBottom: 2, textAlign: "center" }}
            >
              Current Loans Marketplace Volume: {loanListingValueTotal()}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <TextField
                  placeholder="Search Loan Listings"
                  variant="outlined"
                  value={searchTermLoanListings}
                  onChange={handleSearchChangeLoanListings}
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
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Purpose of Loan</TableCell>
                    <TableCell align="right">Loan Amount</TableCell>
                    <TableCell align="left">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLoanListings
                    .slice(
                      pageBorrowers * rowsPerPageBorrowers,
                      pageBorrowers * rowsPerPageBorrowers +
                        rowsPerPageBorrowers
                    )
                    .map((loan) => (
                      <React.Fragment key={loan.id}>
                        <TableRow
                          hover
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            toggleRowExpansion(loan.id, loan.borrower_id)
                          }
                        >
                          <TableCell align="center" sx={{ color: "#00a250" }}>
                            {loan.title}
                          </TableCell>
                          <TableCell align="center">
                            {loan.description}
                          </TableCell>
                          <TableCell align="right">
                            {parseFloat(loan.value).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </TableCell>
                          <TableCell>
                            {new Date(loan.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>

                        {/* Collapsible row for borrower details and loan proposal form */}
                        {expandedRowId === loan.id && (
                          <TableRow key={`${loan.id}-collapse`}>
                            <TableCell colSpan={4}>
                              <Collapse in={expandedRowId === loan.id}>
                                <Box
                                  margin={2}
                                  sx={{
                                    backgroundColor: "#fff",
                                    padding: 2,
                                    borderRadius: 2,
                                  }}
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: "#00a250",
                                          marginBottom: 1,
                                        }}
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
                                          <strong>Credit Score:</strong>{" "}
                                          {borrowerDetails.credit_score}
                                        </Typography>
                                        <Typography>
                                          <strong>Location:</strong>{" "}
                                          {borrowerDetails.street},{" "}
                                          {borrowerDetails.city},{" "}
                                          {borrowerDetails.state}{" "}
                                          {borrowerDetails.zip_code}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: "#00a250",
                                          marginBottom: 1,
                                        }}
                                      >
                                        Loan Proposal Form
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
                                          label="Description"
                                          fullWidth
                                          name="description"
                                          value={lenderProposal.description}
                                          onChange={handleProposalChange}
                                          multiline
                                          rows={3}
                                          sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                          label="Loan Amount"
                                          fullWidth
                                          name="loan_amount"
                                          value={lenderProposal.loan_amount}
                                          onChange={handleProposalChange}
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
                                        <Button
                                          variant="contained"
                                          sx={{
                                            backgroundColor: "#00a250",
                                            color: "#fff",
                                            marginRight: 2,
                                            "&:hover": {
                                              backgroundColor: "#007a3e",
                                            },
                                          }}
                                          onClick={handleSubmitProposal}
                                        >
                                          Submit Proposal
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
                                          onClick={handlePass}
                                        >
                                          PASS
                                        </Button>
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
              count={filteredLoanListings.length}
              page={pageBorrowers}
              onPageChange={(event, newPage) => setPageBorrowers(newPage)}
              rowsPerPage={rowsPerPageBorrowers}
              onRowsPerPageChange={(event) =>
                setRowsPerPageBorrowers(parseInt(event.target.value, 10))
              }
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Loan Proposals Table */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
            <Typography variant="h5" sx={{ color: "#00a250", marginBottom: 2 }}>
              Pending Loan Proposals
            </Typography>
            <Grid container justifyContent="flex-end">
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
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Purpose of Loan</TableCell>
                    <TableCell align="right">Loan Amount</TableCell>
                    <TableCell align="left">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLoanProposals
                    .slice(
                      pageloanProposals * rowsPerPageloanProposals,
                      pageloanProposals * rowsPerPageloanProposals +
                        rowsPerPageloanProposals
                    )
                    .map((loan) => (
                      <TableRow
                        key={loan.id}
                        hover
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell align="center" sx={{ color: "#00a250" }}>
                          {loan.title}
                        </TableCell>
                        <TableCell align="center">{loan.description}</TableCell>
                        <TableCell align="right">
                          {parseFloat(loan.loan_amount).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(loan.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredLoanProposals.length}
              page={pageloanProposals}
              onPageChange={(event, newPage) => setPageloanProposals(newPage)}
              rowsPerPage={rowsPerPageloanProposals}
              onRowsPerPageChange={(event) =>
                setRowsPerPageloanProposals(parseInt(event.target.value, 10))
              }
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>

        {/* Dialog for Proposal Submission */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
