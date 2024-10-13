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

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use `useNavigate`
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Button,
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
} from "@mui/material";
import "./LenderDashboard.scss";

const API = import.meta.env.VITE_BASE_URL;

export default function LenderDashboard({ user, token }) {
  const [loanProposals, setLoanProposals] = useState([]);
  const [loanListings, setLoanListings] = useState([]);
  const [filteredloanProposals, setFilteredLoanProposals] = useState([]);
  const [filteredloanListings, setFilteredLoanListings] = useState([]);
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageloanProposals, setPageloanProposals] = useState(0);
  const [rowsPerPageloanProposals, setRowsPerPageloanProposals] = useState(5);
  const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Function to handle clicking on loan listing rows
  const handleListingRowClick = (listingId) => {
    navigate(`/lenders/${user.id}/requests/${listingId}/newproposal`);
  };

  // Function to handle clicking on loan proposal rows
  const handleProposalRowClick = (proposalId) => {
    navigate(`/lenders/${user.id}/proposals/${proposalId}/edit`);
  };

  // Function to calculate the total value of loan listings
  const loanListingValueTotal = () => {
    let loanTotal = loanListings.reduce((total, loan) => {
      return total + (parseFloat(loan.value) || 0);
    }, 0);

    return loanTotal
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace("$", "");
  };

  const calculateTotalLoanVolume = () => {
    if (!Array.isArray(loanProposals) || loanProposals.length === 0) {
      return "0.00";
    }
    const total = loanProposals.reduce((total, loan) => {
      const loanValue = parseFloat(loan.loan_amount) || 0;
      return total + loanValue;
    }, 0);

    return total
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace("$", "");
  };

  const handleChangePageBorrowers = (event, newPage) => {
    setPageBorrowers(newPage);
  };

  const handleChangeRowsPerPageBorrowers = (event) => {
    setRowsPerPageBorrowers(parseInt(event.target.value, 10));
    setPageBorrowers(0);
  };

  const handleChangePageloanProposals = (event, newPage) => {
    setPageloanProposals(newPage);
  };

  const handleChangeRowsPerPageloanProposals = (event) => {
    setRowsPerPageloanProposals(parseInt(event.target.value, 10));
    setPageloanProposals(0);
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
      headers: {
        Authorization: token,
      },
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
    <div className="lender-dashboard">
      <AppBar position="static" color="secondary" className="app-bar">
        <Toolbar
          style={{ width: "100%" }}
          sx={{ background: "rgb(1, 162, 80)" }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h1" className="welcome-title">
                Welcome
              </Typography>
              <Typography
                className="lender-name"
                variant="h3"
                ml={"4em"}
                mb={"10px"}
              >
                <em>{`${user.business_name}`}</em>
              </Typography>
            </Grid>
            <Grid item>
              <Paper elevation={3} className="total-loan-volume">
                <Typography variant="h6">
                  Portfolio Volume: $
                  <span style={{ color: "green", fontStyle: "italic" }}>
                    {loanProposals.length === 0
                      ? 0
                      : calculateTotalLoanVolume()}
                  </span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3}>
        {/* Loan Listings Table */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} className="loan-listings-table">
            <Typography variant="h6" component="div">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>Available Loan Listings</Grid>
                <Grid item>
                  Current Loan Listing Value:{" "}
                  <span style={{ color: "green" }}>
                    {loanListingValueTotal()}
                  </span>
                </Grid>
                <Grid item>
                  <TextField
                    placeholder="Search Loan Listings"
                    variant="outlined"
                    value={searchTermLoanListings}
                    onChange={handleSearchChangeLoanListings}
                    className="search-bar"
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
              </Grid>
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Created On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {filteredloanListings
                    .slice(
                      pageBorrowers * rowsPerPageBorrowers,
                      pageBorrowers * rowsPerPageBorrowers +
                        rowsPerPageBorrowers
                    )
                    .map((loan) => (
                      <TableRow
                        key={loan.id}
                        hover
                        style={{ cursor: "pointer" }}
                        onClick={() => handleListingRowClick(loan.id)} // Row click handler
                      >
                        <TableCell>{loan.title}</TableCell>
                        <TableCell>{loan.description}</TableCell>
                        <TableCell>
                          {parseFloat(loan.value)
                            .toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                            .replace("$", "")}
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
              count={filteredloanListings.length}
              page={pageBorrowers}
              onPageChange={handleChangePageBorrowers}
              rowsPerPage={rowsPerPageBorrowers}
              onRowsPerPageChange={handleChangeRowsPerPageBorrowers}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>
        {/* Loan Proposals Table */}
        <Grid item xs={12} md={12}>
          <Paper elevation={3} className="loan-requests-table">
            <Typography variant="h6" component="div">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>Pending Loan Proposals</Grid>
                <Grid item>
                  <TextField
                    placeholder="Search Loan Proposals"
                    variant="outlined"
                    value={searchTermLoanProposals}
                    onChange={handleSearchChangeLoanProposals}
                    className="search-bar"
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                </Grid>
              </Grid>
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className="table-header">
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {filteredloanProposals
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
                        onClick={() => handleProposalRowClick(loan.id)} // Row click handler
                      >
                        <TableCell>{loan.title}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {loan.description}
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
              count={filteredloanProposals.length}
              page={pageloanProposals}
              onPageChange={handleChangePageloanProposals}
              rowsPerPage={rowsPerPageloanProposals}
              onRowsPerPageChange={handleChangeRowsPerPageloanProposals}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

LenderDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
