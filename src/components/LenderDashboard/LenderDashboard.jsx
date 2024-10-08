// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
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

// export default function LenderDashboard({ userlenderData }) {
//   const { id } = useParams();

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
//       const loanValue = isNaN(parseFloat(loan.loan_amount))
//         ? 0
//         : parseFloat(loan.loan_amount);
//       return total + loanValue;
//     }, 0);

//     return total.toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   useEffect(() => {
//     const fetchLoanProposals = async () => {
//       try {
//         const response = await fetch(`${API}/lenders/${id}/proposals`);
//         const data = await response.json();
//         setLoanProposals(data);
//         setFilteredLoanProposals(data);
//       } catch (error) {
//         console.error("Error fetching loan requests:", error);
//       }
//     };

//     const fetchLoanListing = async () => {
//       try {
//         const response = await fetch(`${API}/lenders/${id}/requests`);
//         const data = await response.json();
//         setLoanListings(data);
//         setFilteredLoanListings(data);
//       } catch (error) {
//         console.error("Error fetching requests: ", error);
//       }
//     };

//     fetchLoanProposals();
//     fetchLoanListing();
//   }, [id]);

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
//     //watches the change
//     const term = event.target.value.toLowerCase();
//     setSearchTermLoanListings(term);
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

//   console.log(filteredloanProposals);

//   return (
//     <div className="lender-dashboard">
//       <AppBar position="static" color="secondary" className="app-bar">
//         <Toolbar
//           style={{ width: "100%" }}
//           sx={{ background: "linear-gradient(to bottom, #36c856, #b7e98f)" }}
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
//                 <em>{`${userlenderData.business_name}`}</em>
//               </Typography>
//             </Grid>

//             {/* Right Side: Total Loan Volume */}
//             <Grid item>
//               <Paper elevation={3} className="total-loan-volume">
//                 <Typography variant="h6">
//                   Total Loan Volume: $
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
//                         <TableCell width={"40%"}>{loan.description}</TableCell>
//                         <TableCell>
//                           {new Date(loan.created_at).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell className="action-buttons">
//                           <Button>
//                             <Link
//                               to={`/lenders/${userlenderData.id}/requests/${loan.id}/newproposal`}
//                             >
//                               Submit Offer
//                             </Link>
//                           </Button>
//                           <Button>
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
//                       <TableCell sx={{ textAlign: "center" }}>
//                         Description
//                       </TableCell>
//                       <TableCell>Created At</TableCell>
//                       <TableCell colSpan={3} sx={{ textAlign: "center" }}>
//                         Action
//                       </TableCell>
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
//                             <TableCell className="action-buttons">
//                               <Button>
//                                 <Link
//                                   to={`/lenders/${id}/proposals/${loan.id}/edit`}
//                                 >
//                                   Review
//                                 </Link>
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

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

export default function LenderDashboard({ userlenderData }) {
  const { id } = useParams();

  // states for listings
  const [loanProposals, setLoanProposals] = useState([]);
  const [loanListings, setLoanListings] = useState([]);
  // filtering for listings
  const [filteredloanProposals, setFilteredLoanProposals] = useState([]);
  const [filteredloanListings, setFilteredLoanListings] = useState([]);
  // Paginations
  const [pageBorrowers, setPageBorrowers] = useState(0);
  const [rowsPerPageBorrowers, setRowsPerPageBorrowers] = useState(5);
  const [pageloanProposals, setPageloanProposals] = useState(0);
  const [rowsPerPageloanProposals, setRowsPerPageloanProposals] = useState(5);
  // Filter states to search Listing and Proposals
  const [searchTermLoanListings, setSearchTermLoanListings] = useState("");
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");

  const calculateTotalLoanVolume = () => {
    if (!Array.isArray(loanProposals) || loanProposals.length === 0) {
      return "0.00";
    }
    const total = loanProposals.reduce((total, loan) => {
      const loanValue = isNaN(parseFloat(loan.loan_amount))
        ? 0
        : parseFloat(loan.loan_amount);
      return total + loanValue;
    }, 0);

    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const fetchLoanProposals = async () => {
      try {
        const response = await fetch(`${API}/lenders/${id}/proposals`);
        const data = await response.json();
        setLoanProposals(data);
        setFilteredLoanProposals(data);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      }
    };

    const fetchLoanListing = async () => {
      try {
        const response = await fetch(`${API}/lenders/${id}/requests`);
        const data = await response.json();
        setLoanListings(data);
        setFilteredLoanListings(data);
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };

    fetchLoanProposals();
    fetchLoanListing();
  }, [id]);

  // PAGINATION CODE START!!
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
  // PAGINATION CODE END!!!

  // Search bar for Loan Listings
  const handleSearchChangeLoanListings = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanListings(term);
  };

  // Search bar for Loan Proposals
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

  return (
    <div className="lender-dashboard">
      <AppBar
        position="static"
        color="secondary"
        className="app-bar"
        sx={{ background: "#00a250" }}
      >
        <Toolbar style={{ width: "100%" }}>
          <Grid container justifyContent="space-between" alignItems="center">
            {/* Left Side: Welcome Message */}
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
                <em>{`${userlenderData.business_name}`}</em>
              </Typography>
            </Grid>

            {/* Right Side: Total Loan Volume */}
            <Grid item>
              <Paper elevation={3} className="total-loan-volume">
                <Typography variant="h6">
                  Total Loan Volume: $
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
                spacing={0}
                sx={{ padding: "0", m: "0" }}
              >
                {/* Left: Title */}
                <Grid item>Available Loan Listings</Grid>

                {/* Right: Search Bar */}
                <Grid item>
                  <TextField
                    placeholder="Search Loan Listings"
                    variant="outlined"
                    value={searchTermLoanListings}
                    onChange={handleSearchChangeLoanListings}
                    className="search-bar"
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
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
                    <TableCell>Value</TableCell> {/* Changed to Value */}
                    <TableCell>Created On</TableCell>
                    <TableCell>Action</TableCell>
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
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell width={"40%"}>{loan.description}</TableCell>
                        <TableCell>
                          $
                          {parseFloat(loan.value)
                            ? parseFloat(loan.value).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                              })
                            : "N/A"}
                        </TableCell>{" "}
                        {/* Display Value */}
                        <TableCell>
                          {new Date(loan.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="action-buttons">
                          <Button>
                            <Link
                              to={`/lenders/${userlenderData.id}/requests/${loan.id}/newproposal`}
                            >
                              Submit Offer
                            </Link>
                          </Button>
                          <Button>
                            <Link>PASS</Link>
                          </Button>
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
                spacing={0}
                sx={{ padding: "0", m: "0" }}
              >
                {/* Left: Title */}
                <Grid item>Pending Loan Proposals</Grid>

                {/* Right: Search Bar */}
                <Grid item>
                  <TextField
                    placeholder="Search Loan Proposals"
                    variant="outlined"
                    value={searchTermLoanProposals}
                    onChange={handleSearchChangeLoanProposals}
                    className="search-bar"
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
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
                    <TableCell>Value</TableCell> {/* Changed to Value */}
                    <TableCell>Created On</TableCell>
                    <TableCell>Action</TableCell>
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
                      <TableRow key={loan.id}>
                        <TableCell>{loan.title}</TableCell>
                        <TableCell width={"40%"}>{loan.description}</TableCell>
                        <TableCell>
                          $
                          {parseFloat(loan.loan_amount)
                            ? parseFloat(loan.loan_amount).toLocaleString(
                                "en-US",
                                { minimumFractionDigits: 2 }
                              )
                            : "N/A"}
                        </TableCell>{" "}
                        {/* Display Value */}
                        <TableCell>
                          {new Date(loan.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="action-buttons">
                          <Button>
                            <Link
                              to={`/lenders/${userlenderData.id}/proposals/${loan.id}`}
                            >
                              View Proposal
                            </Link>
                          </Button>
                          <Button>
                            <Link>PASS</Link>
                          </Button>
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
