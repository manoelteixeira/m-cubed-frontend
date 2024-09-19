import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const API = import.meta.env.VITE_BASE_URL;

export default function LenderDashboard() {
  const { id } = useParams()
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    fetch(`${API}/lenders/${id}}`) 
      .then(res => res.json())
      .then(data => setLoanData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="lender-dashboard">
      <header className="dashboard-header">
        <img src="" alt="Logo" className="logo" />
        <h1>Hi, User</h1>
        <p>Here are the loans you have in flight.</p>
        <div className="total-loan-volume">
          <h2>Total Loan Volume: <span>{/* helper function to add the sum of total Loan volumes  */}</span></h2>
          <button className="new-loan-file-btn">+ New Loan File</button>
        </div>
      </header>

      <div className="filters">
        <div className="search-bar">
          <input type="text" placeholder="Search by loan # or name" />
        </div>
        <div className="loan-status">
          <select>
            <option value="11">Loans Selected</option>
            {/* Loan Selection*/}
          </select>
        </div>
        <button className="reset-filters">Reset Filters</button>
      </div>
    </div>
  );
}
