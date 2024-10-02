import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRequest, getLoanRequest } from '../services/serviceRequest';




const EditLoanRequestForm = () => {
  const { id, requestId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    loanAmount: '',
    loanTerm: '',
    industry: '',
    revenue: '',
    documents: null,
  });
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const request = await getLoanRequest(id, requestId); 
        setFormData({
          businessName: request.businessName,
          businessType: request.businessType,
          loanAmount: request.loanAmount,
          loanTerm: request.loanTerm,
          industry: request.industry,
          revenue: request.revenue,
          documents: null, 
        });
      } catch (err) {
        setError('Error fetching loan request.');
      }
    };
    fetchRequest();
  }, [id, requestId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateRequest(id, requestId, formData);
      if (updatedData) {
        console.log('Request updated successfully:', updatedData);
        navigate(`/borrowers/${id}`); 
      }
    } catch (err) {
      setError('Error updating request.');
    }
  };


  return (
    <div className="Loan-Request">
      <h2>Edit Loan Application</h2>

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

        <label htmlFor="documents">Upload Documents (optional)</label>
        <input
          type="file"
          id="documents"
          name="documents"
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button type="submit">Submit Changes</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EditLoanRequestForm;