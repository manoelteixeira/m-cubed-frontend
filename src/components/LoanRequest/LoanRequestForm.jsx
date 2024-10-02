import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {addRequest} from '../services/serviceRequest'
import './LoanRequest.css';

const LoanRequestForm = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  const [error,setError]= useState(null)
  const [timestamp, setTimestamp] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    loanAmount: '',
    loanTerm: '',
    industry: '',
    revenue: '',
    documents: null,
  });




  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedRequest = await addRequest(id, formData);
      if (addedRequest) {
        console.log("Request added successfully:", addedRequest);
        
        navigate(`/borrowers/${id}`);
      }
    } catch (err) {
      setError("Error adding request.");
    }
  };
  
     

  // Save localStorage
  const handleSaveDraft = () => {
    const now = new Date();
    const formattedTimestamp = now.toLocaleString();
    setTimestamp(`Draft saved on: ${formattedTimestamp}`);

    localStorage.setItem('loanDraft', JSON.stringify(formData));
    setSubmissionStatus('Draft saved!');
  };

  return (
    <div className="Loan-Request">
      <h2>Loan Application Form</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="businessName">Business Name</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
        />

        <label htmlFor="businessType">Business Type</label>
        <input
          type="text"
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          required
        />

        <label htmlFor="loanAmount">Loan Amount Requested</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          required
        />

        <label htmlFor="loanTerm">Loan Term</label>
        <input
          type="text"
          id="loanTerm"
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleChange}
          required
        />

        <label htmlFor="industry">Industry</label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />

        <label htmlFor="revenue">Revenue</label>
        <input
          type="number"
          id="revenue"
          name="revenue"
          value={formData.revenue}
          onChange={handleChange}
          required
        />

        <label htmlFor="documents">Upload Documents (e.g., Financial Statements)</label>
        <input
          type="file"
          id="documents"
          name="documents"
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit">Submit Application</button>
          <button type="button" onClick={handleSaveDraft}>Save Draft</button>
        </div>
      </form>

      {timestamp && <div className="timestamp">{timestamp}</div>}
      {submissionStatus && <div>{submissionStatus}</div>}
    </div>
  );
};

export default LoanRequestForm;
