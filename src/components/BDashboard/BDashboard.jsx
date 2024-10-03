// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import {
//   getBorrower,
//   getAllLoanRequests,
//   updateRequest,
//   deleteRequest,
// } from "../services/serviceRequest";
// import "./BDashboard.css";

// const BDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const [borrowerData, setBorrowerData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBorrower = async () => {
//       try {
//         const data = await getBorrower(id);
//         console.log(data);
//         if (data) {
//           setBorrowerData(data);
//         } else {
//           console.error("No borrower data returned.");
//         }
//       } catch (err) {
//         console.error("Error fetching borrower:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchLoanRequests = async () => {
//       try {
//         const loanRequests = await getAllLoanRequests(id);
//         if (loanRequests) {
//           setRequests(loanRequests);
//         } else {
//           console.error("No loan requests data returned.");
//         }
//       } catch (err) {
//         console.error("Error fetching loan requests:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBorrower();
//     fetchLoanRequests();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching data!</p>;

//   const openLoanApplicationForm = () => {
//     navigate(`/borrowers/${id}/new`);

//     console.log(borrowerData);
//   };

//   return (
//     <div className="borrower-dashboard">
//       <header className="dashboard-header">
//         <img src="src/images/Logo.jpeg" alt="Logo" className="logo" />
//         <h1>Welcome, {borrowerData.business_name}</h1>
//         <p>Your loan applications and offers are listed below.</p>
//         <button
//           className="new-application-btn"
//           onClick={openLoanApplicationForm}
//         >
//           + New Application
//         </button>
//       </header>

//       <div className="filters">
//         <div className="search-bar">
//           <input type="text" placeholder="Search by application # or lender" />
//         </div>

//         <button className="reset-filters">Reset Filters</button>
//       </div>

//       <table className="applications-table">
//         <thead>
//           <tr>
//             <th>Application #</th>
//             <th>Lender</th>
//             <th>Loan Amount</th>
//             <th>Created Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {requests.map((request, index) => (
//             <tr key={index}>
//               <td>{request.id}</td>
//               <td>{request.lenderName}</td>
//               <td>{request.value}</td>
//               <td>{request.created_at}</td>
//               <td>{request.status}</td>
//               <td>
//                 <Link to={`/borrowers/${id}/edit`}>
//                   <button
//                     onClick={() => updateRequest(request.id, updatedData)}
//                   >
//                     Update
//                   </button>
//                 </Link>
//                 <button onClick={() => deleteRequest(request.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="profile-section">
//         <h2>Your Profile</h2>
//         <p>Name: {borrowerData.business_name}</p>
//         <p>Email: {borrowerData.email}</p>
//       </div>

//       <div className="offers-section">
//         <h2>Loan Offers</h2>
//         <ul>
//           {requests.offers?.map((offer, index) => (
//             <li key={index}>
//               {offer.lenderName} - ${offer.amount} - {offer.terms}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default BDashboard;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Snackbar,
// } from "@mui/material";
// import { Alert } from "@mui/material";
// import {
//   getBorrower,
//   getAllLoanRequests,
//   updateRequest,
//   deleteRequest,
// } from "../services/serviceRequest";

// const BDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [borrowerData, setBorrowerData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBorrower = async () => {
//       try {
//         const data = await getBorrower(id);
//         setBorrowerData(data || {});
//       } catch (err) {
//         setError("Error fetching borrower data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchLoanRequests = async () => {
//       try {
//         const loanRequests = await getAllLoanRequests(id);
//         setRequests(loanRequests || []);
//       } catch (err) {
//         setError("Error fetching loan requests.");
//       }
//     };

//     fetchBorrower();
//     fetchLoanRequests();
//   }, [id]);

//   const openLoanApplicationForm = () => {
//     navigate(`/borrowers/${id}/new`);
//   };

//   const handleUpdateRequest = async (requestId, updatedData) => {
//     try {
//       await updateRequest(requestId, updatedData);
//       // Optionally refetch requests here to get updated data
//     } catch (err) {
//       setError("Error updating request.");
//     }
//   };

//   const handleDeleteRequest = async (requestId) => {
//     try {
//       await deleteRequest(requestId);
//       // Optionally refetch requests here to get updated data
//     } catch (err) {
//       setError("Error deleting request.");
//     }
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Container className="borrower-dashboard">
//       <Typography variant="h4" gutterBottom>
//         Welcome, {borrowerData.business_name}
//       </Typography>
//       <Typography variant="body1">
//         Your loan applications and offers are listed below.
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={openLoanApplicationForm}
//         sx={{ margin: "16px 0" }}
//       >
//         + New Application
//       </Button>

//       <TextField
//         label="Search by application # or lender"
//         variant="outlined"
//         fullWidth
//         sx={{ marginBottom: "16px" }}
//       />

//       <TableContainer component={Paper} sx={{ marginBottom: "32px" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Application #</TableCell>
//               <TableCell>Lender</TableCell>
//               <TableCell>Loan Amount</TableCell>
//               <TableCell>Created Date</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.map((request) => (
//               <TableRow key={request.id}>
//                 <TableCell>{request.id}</TableCell>
//                 <TableCell>{request.lenderName}</TableCell>
//                 <TableCell>{request.value}</TableCell>
//                 <TableCell>{request.created_at}</TableCell>
//                 <TableCell>{request.status}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleUpdateRequest(request.id, request)}
//                     sx={{ marginRight: 1 }}
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDeleteRequest(request.id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Typography variant="h6" gutterBottom>
//         Loan Offers
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Offer ID</TableCell>
//               <TableCell>Lender</TableCell>
//               <TableCell>Loan Amount</TableCell>
//               <TableCell>Interest Rate</TableCell>
//               <TableCell>Repayment Term (Months)</TableCell>
//               <TableCell>Created Date</TableCell>
//               <TableCell>Accepted</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.offers?.map((offer, index) => (
//               <TableRow key={index}>
//                 <TableCell>{offer.id}</TableCell>
//                 <TableCell>{offer.lenderName}</TableCell>
//                 <TableCell>{offer.loan_amount}</TableCell>
//                 <TableCell>{offer.interest_rate}%</TableCell>
//                 <TableCell>{offer.repayment_term}</TableCell>
//                 <TableCell>{offer.created_at}</TableCell>
//                 <TableCell>{offer.accepted ? "Yes" : "No"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//       >
//         <Alert onClose={() => setError(null)} severity="error">
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default BDashboard;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import {
  getBorrower,
  getAllLoanRequests,
  updateRequest,
  deleteRequest,
} from "../services/serviceRequest";

const BDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [borrowerData, setBorrowerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrower = async () => {
      try {
        const data = await getBorrower(id);
        setBorrowerData(data || {});
      } catch (err) {
        setError("Error fetching borrower data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchLoanRequests = async () => {
      try {
        const loanRequests = await getAllLoanRequests(id);
        setRequests(loanRequests || []);
      } catch (err) {
        setError("Error fetching loan requests.");
      }
    };

    fetchBorrower();
    fetchLoanRequests();
  }, [id]);

  const openLoanApplicationForm = () => {
    navigate(`/borrowers/${id}/new`);
  };

  const handleUpdateRequest = async (requestId, updatedData) => {
    try {
      await updateRequest(requestId, updatedData);
    } catch (err) {
      setError("Error updating request.");
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteRequest(requestId);
    } catch (err) {
      setError("Error deleting request.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container className="borrower-dashboard">
      <Typography variant="h4" gutterBottom>
        Welcome, {borrowerData.business_name}
      </Typography>
      <Typography variant="body1">
        Your loan applications and offers are listed below.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={openLoanApplicationForm}
        sx={{ margin: "16px 0" }}
      >
        + New Application
      </Button>

      <TextField
        label="Search by application # or lender"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "16px" }}
      />

      <TableContainer component={Paper} sx={{ marginBottom: "32px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application #</TableCell>
              <TableCell>Lender</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.lenderName}</TableCell>
                <TableCell>{request.value}</TableCell>
                <TableCell>{request.created_at}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleUpdateRequest(request.id, request)}
                    sx={{ marginRight: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" gutterBottom>
        Loan Offers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Offer ID</TableCell>
              <TableCell>Loan Request ID</TableCell>
              <TableCell>Lender</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Repayment Term (Months)</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Accepted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.offers?.map((offer, index) => (
              <TableRow key={index}>
                <TableCell>{offer.id}</TableCell>
                <TableCell>{offer.loan_request_id}</TableCell>
                <TableCell>{offer.lenderName}</TableCell>
                <TableCell>{offer.loan_amount}</TableCell>
                <TableCell>{offer.interest_rate}%</TableCell>
                <TableCell>{offer.repayment_term}</TableCell>
                <TableCell>{offer.created_at}</TableCell>
                <TableCell>{offer.accepted ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BDashboard;
