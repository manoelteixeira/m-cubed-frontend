import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateRequest, getLoanRequest } from '../services/serviceRequest';


const EditLoanRequestForm = () => {
  const { id, requestId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    created_at: '',
    funded_at: '',
    
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const request = await getLoanRequest(id, requestId);
        setFormData({
          title: request.title,
          description: request.description,
          value: request.value,
          created_at: request.created_at ? request.created_at.slice(0, 10) : '',
          funded_at: request.funded_at ? request.funded_at.slice(0, 10) : '',
          accepted_proposal_id: request.accepted_proposal_id || '',
        });
      } catch (err) {
        setError('Error fetching loan request.');
      }
    };
    fetchRequest();
  }, [id, requestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">description</label>
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
          <button type="submit">Submit Changes</button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EditLoanRequestForm;
