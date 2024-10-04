import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBorrower, getAllLoanRequests, deleteRequest } from '../services/serviceRequest';
import './BDashboard.css'


const BDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [borrowerData, setBorrowerData] = useState(null);
  const navigate = useNavigate()
  
  

  useEffect(() => {
    const fetchBorrowerData = async () => {
      try {
        const borrower = await getBorrower(id);
        if (borrower) {
          setBorrowerData(borrower);
        } else {
          setError("No borrower data returned.");
        }
      } catch (error) {
        console.error("Error fetching borrower data:", error);
        setError("Error fetching borrower data.");
      }
    };
  
    const fetchLoanRequestsData = async () => {
      try {
        const loanRequests = await getAllLoanRequests(id);
        if (loanRequests) {
          setRequests(loanRequests);
        } else {
          setError("No loan requests data returned.");
        }
      } catch (error) {
        console.error("Error fetching loan requests:", error);
        setError("Error fetching loan requests.");
      }
    };
  
    const fetchData = async () => {
      await fetchBorrowerData();
      await fetchLoanRequestsData();
      setLoading(false);
    };
   
      fetchData();
  }, [id]);
  
  
  const handleDeleteRequest = async (requestId) => {
    try {
      const deletedId = await deleteRequest(id, requestId);
      if (deletedId) {
        setRequests((prevRequests) => prevRequests.filter((req) => req.id !== deletedId));
      }
    } catch (error) {
      setError("Error deleting loan request.");
      console.error("Error deleting loan request:", error);
    }
  };

  const handleUpdateRequest = (requestId) => {
    navigate(`/borrowers/${id}/edit-request/${requestId}`);
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data!</p>;

  const openLoanApplicationForm = () => {
    navigate(`/borrowers/${id}/requests/new`);
  }
 


  return (
    <div className="borrower-dashboard">
      
      <header className="dashboard-header">
        <img src="src/images/Logo.jpeg" alt="Logo" className="logo" />
        <h1>Welcome, {borrowerData.business_name}</h1>
        <p>Your loan applications and offers are listed below.</p>
        <button className="new-application-btn" 
            onClick={openLoanApplicationForm}>+ New Application</button>
            
      </header>


      <div className="filters">
        
        <div className="search-bar">
          <input type="text" placeholder="Search by application # or lender" />
        </div>

        <button className="reset-filters">Reset Filters</button>

      </div>

      <table className="applications-table">
          
          <thead>
            <tr>
              <th>Application #</th>
              <th>Lender</th>
              <th>Loan Amount</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
              {requests.map((request) => (
               <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.lenderName}</td>
                <td>{request.value}</td>
                <td>{request.created_at}</td>
                <td>{request.status}</td>
                <td>


                  
                <button onClick={() => handleUpdateRequest(request.id)}>Update</button>
                 

                  <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>
                </td>
               </tr>
              ))}
          </tbody>

      </table>


      <div className="profile-section">
        <h2>Your Profile</h2>
        <p>Name: {borrowerData.business_name}</p>
        <p>Email: {borrowerData.email}</p>
      </div>


      <div className="offers-section">
        <h2>Loan Offers</h2>
        <ul>
          {requests.offers?.map((offer, index) => (
            <li key={index}>
              {offer.lenderName} - ${offer.amount} - {offer.terms}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default BDashboard;
