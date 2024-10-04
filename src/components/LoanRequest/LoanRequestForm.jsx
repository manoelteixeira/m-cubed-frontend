import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addRequest } from '../services/serviceRequest';
import './LoanRequest.css';

const LoanRequestForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const [timestamp, setTimestamp] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    created_at: '',
    funded_at: '',
    borrower_id: id, 
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
      const loanData = {
        title: formData.title,
        description: formData.description,
        value: parseFloat(formData.value), 
        created_at: formData.created_at,
        funded_at: formData.funded_at || null,
        borrower_id: id, 
      };

      const addedRequest = await addRequest(id, loanData);

      if (addedRequest) {
        setRequests((prevRequests) => [...prevRequests, addedRequest]);
        navigate(`/borrowers/${id}`);
      }
    } catch (err) {
      setError('Error adding request.');
      console.error('Submission error:', err);
    }
  };

  // Save form data as a draft in localStorage
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
        <label htmlFor="title">Business Name</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Business Type</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="value">Loan Amount Requested</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />

        <label htmlFor="created_at">Created At</label>
        <input
          type="date"
          id="created_at"
          name="created_at"
          value={formData.created_at}
          onChange={handleChange}
          required
        />

        <label htmlFor="funded_at">Funded At</label>
        <input
          type="date"
          id="funded_at"
          name="funded_at"
          value={formData.funded_at || ''}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit">Submit Application</button>
          <button type="button" onClick={handleSaveDraft}>Save Draft</button>
        </div>
      </form>

      {timestamp && <div className="timestamp">{timestamp}</div>}
      {submissionStatus && <div>{submissionStatus}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoanRequestForm;
