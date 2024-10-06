import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Typography
} from '@mui/material';

const API = import.meta.env.VITE_BASE_URL;

export default function LoanProposalForm() {
  const { lender_id, id } = useParams(); 
  const navigate = useNavigate(); 

  const [editProposal, setEditProposal] = useState({
    title: '',
    description: '',
    loan_amount: '',
    interest_rate: '',
    repayment_term: '',
    accepted: false,
    created_at: ''
  });

  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await fetch(`${API}/lenders/${lender_id}/proposals/${id}`);
        if (!res.ok) throw new Error('Error fetching loan proposal data.');
        const data = await res.json();
        setEditProposal(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };

    fetchProposal();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'accepted') {
      setEditProposal({ ...editProposal, [name]: value === 'true' });
    } else if (name === 'loan_amount' || name === 'interest_rate' || name === 'repayment_term') {
      setEditProposal({ ...editProposal, [name]: Number(value) });
    } else {
      setEditProposal({ ...editProposal, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setDeleteLoading(true)
    setErrorMessage('');
    setSuccessMessage('');

    setTimeout(async () => {
      try {
        const response = await fetch(`${API}/lenders/${lender_id}/proposals/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editProposal.title,
            description: editProposal.description,
            loan_amount: Number(editProposal.loan_amount),
            interest_rate: Number(editProposal.interest_rate),
            repayment_term: Number(editProposal.repayment_term),
            created_at: editProposal.created_at,
            accepted: editProposal.accepted,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(`Error: ${errorData.error || errorData.message}`);
          return;
        }

        setSuccessMessage('Loan proposal updated successfully!');
        navigate(`/lenders/${lender_id}/lenderdashboard`);
      } catch (error) {
        setErrorMessage('An error occurred while updating the proposal.');
      } finally {
        setUpdateLoading(false);
      }
    }, 1000); 
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this proposal?");
    if (!confirmed) return; 

    setDeleteLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    setTimeout(async () => {
      try {
        const response = await fetch(`${API}/lenders/${lender_id}/proposals/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(`Error: ${errorData.error || errorData.message}`);
          return;
        }

        setSuccessMessage('Loan proposal deleted successfully!');
        navigate(`/lenders/${lender_id}/lenderdashboard`);
      } catch (error) {
        setErrorMessage('An error occurred while deleting the proposal.');
      } finally {
        setUpdateLoading(false);
      }
    }, 1000); 
  };

  // console.log(new Date(editProposal.created_at).toLocaleDateString())

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          <Typography>Edit Loan Proposal</Typography>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={editProposal.title}
              onChange={handleChange}
              inputProps={{ maxLength: 140 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
              value={editProposal.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="loan_amount"
              label="Loan Amount"
              name="loan_amount"
              type="number"
              value={editProposal.loan_amount}
              onChange={handleChange}
              inputProps={{ step: '0.01', min: '0' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="interest_rate"
              label="Interest Rate (%)"
              name="interest_rate"
              type="number"
              value={editProposal.interest_rate}
              onChange={handleChange}
              inputProps={{ step: '0.01', min: '0' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="repayment_term"
              label="Repayment Term (Months)"
              name="repayment_term"
              type="number"
              value={editProposal.repayment_term}
              onChange={handleChange}
              inputProps={{ min: '0' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={updateLoading}
            >
              {updateLoading ? 'Updating...' : 'Update Proposal'}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleDelete} 
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete Proposal'}
            </Button>
          </Grid>

          {errorMessage && (
            <Grid item xs={12}>
              <p style={{ color: 'red' }}>{errorMessage}</p>
            </Grid>
          )}
          {successMessage && (
            <Grid item xs={12}>
              <p style={{ color: 'green' }}>{successMessage}</p>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
