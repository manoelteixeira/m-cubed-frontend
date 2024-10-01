import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBorrower, getAllLoanRequests, updateRequest, deleteRequest } from '../services/serviceRequest';
import './BDashboard.css'


const BDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [borrowerData, setBorrowerData] = useState();
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchBorrower = async () => {
     
      try {
        const data = await getBorrower(id);
        console.log(data)
        if (data) {
          setBorrowerData(data);
        } else {
          console.error("No borrower data returned.");
        }
      } catch (err) {
        console.error('Error fetching borrower:', err);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchLoanRequests = async () => {
      try {
        const loanRequests = await getAllLoanRequests(id);
        if (loanRequests) {
          setRequests(loanRequests);
        }else {
          console.error("No loan requests data returned.");
        }
      } catch (err) {
        console.error('Error fetching loan requests:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBorrower();
    fetchLoanRequests();
  }, [id]);
  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data!</p>;

  const openLoanApplicationForm = () => {
    navigate(`/borrowers/${id}/new`);

    console.log(borrowerData)
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
              {requests.map((request, index) => (
               <tr key={index}>
                <td>{request.id}</td>
                <td>{request.lenderName}</td>
                <td>{request.value}</td>
                <td>{request.created_at}</td>
                <td>{request.status}</td>
                <td>


                  <Link to={`/borrowers/${id}/edit`}><button onClick={() => updateRequest(request.id, updatedData)}>Update</button></Link>
                  <button onClick={() => deleteRequest(request.id)}>Delete</button>
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
