import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_BASE_URL;
import './LoanRequest.css';

const LoanRequestForm = () => {
  const navigate = useNavigate();
  const { loanRequestId } = useParams();
  const [timestamp, setTimestamp] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    loan_amount: '',
    loan_term: '',
    industry: '',
    revenue: '',
    documents: null,
  });

  
  useEffect(() => {
    if (loanRequestId) {
      fetch(`${API}/borrowers/${id}/requests/${loanRequestId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            business_name: data.business_name,
            business_type: data.business_type,
            loan_amount: data.loan_amount,
            loan_term: data.loan_term,
            industry: data.industry,
            revenue: data.revenue,
            documents: null, 
          });
        })
        .catch((error) => console.error('Error fetching loan details', error));
    }
  }, [loanRequestId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'documents') {
      setFormData({
        ...formData,
        documents: files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Submit the form (POST if no id, PUT otherwise)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prep form data for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('business_name', formData.business_name);
    formDataToSubmit.append('business_type', formData.business_type);
    formDataToSubmit.append('loan_amount', formData.loan_amount);
    formDataToSubmit.append('loan_term', formData.loan_term);
    formDataToSubmit.append('industry', formData.industry);
    formDataToSubmit.append('revenue', formData.revenue);
    if (formData.documents) {
      formDataToSubmit.append('documents', formData.documents);
    }


    const method = loanRequestId ? 'PUT' : 'POST';
    const url = loanRequestId
      ? `${API}/borrowers/${id}/requests/${requestsId}`
      : `${API}/borrowers/${id}/requests`;

    try {
      const response = await fetch(url, {
        method: method,
        body: formDataToSubmit, 
      });

      if (response.ok) {
        setSubmissionStatus('Application submitted successfully!');
        navigate('/dashboard');
      } else {
        setSubmissionStatus('Failed to submit the application.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setSubmissionStatus('An error occurred while submitting the form.');
    }
  };

  // Save form localStorage
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
        <label htmlFor="business_name">Business Name</label>
        <input
          type="text"
          id="business_name"
          name="business_name"
          value={formData.business_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="business_type">Business Type</label>
        <input
          type="text"
          id="business_type"
          name="business_type"
          value={formData.business_type}
          onChange={handleChange}
          required
        />

        <label htmlFor="loan_amount">Loan Amount Requested</label>
        <input
          type="number"
          id="loan_amount"
          name="loan_amount"
          value={formData.loan_amount}
          onChange={handleChange}
          required
        />

        <label htmlFor="loan_term">Loan Term</label>
        <input
          type="text"
          id="loan_term"
          name="loan_term"
          value={formData.loan_term}
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
