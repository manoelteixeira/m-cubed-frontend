import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import './LoanProposalForm.scss'; 

const API = import.meta.env.VITE_BASE_URL;

export default function EditLoanProposalForm() {
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
    
    if (name === 'loan_amount' || name === 'interest_rate' || name === 'repayment_term') {
        setEditProposal((prev) => ({
            ...prev,
            [name]: name === 'repayment_term' ? parseInt(value, 10) || 0 : parseFloat(value) || 0
        }));
    } else {
        setEditProposal((prev) => ({
            ...prev,
            [name]: value
        }));
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    setTimeout(async () => {
      try {
        const response = await fetch(`${API}/lenders/${lender_id}/proposals/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editProposal),
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
        setDeleteLoading(false);
      }
    }, 1000); 
  };

  const handleCancel = () => {
    navigate(`/lenders/${lender_id}/lenderdashboard`)
  }

  return (
    <Container className="loan-proposal-form-container">
      <Paper elevation={3} className="loan-proposal-paper">
        <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <Typography variant="h4" align="right" className="borrower-info" >
                Edit Loan Proposal for Borrower info here
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box component="form" onSubmit={handleSubmit} className="form-box">
              <Paper>
                <Typography className="form-title" sx={{m: '20px', fontSize:'2em', textAlign:'center'}}>Loan Proposal Editions</Typography>
              </Paper>
              <Grid container spacing={4} sx={{borderLeft: '1px solid black'}}>
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
                    className="input-field"
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
                    className="input-field"
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
                    value={Number(editProposal.loan_amount)}
                    onChange={handleChange}
                    className="input-field"
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
                    value={Number(editProposal.interest_rate)}
                    onChange={handleChange}
                    className="input-field"
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
                    value={Number(editProposal.repayment_term)}
                    onChange={handleChange}
                    className="input-field"
                    inputProps={{ min: '0' }}
                  />
                </Grid>

                  
                <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      mt:'2em',
                      gap: '1em'
                    }}
                    
                  >
                    {/* Update Button */}
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        disabled={updateLoading}
                        className="submit-button"
                        sx={{
                          width: '13em',
                          color: 'green',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 128, 0, 0.1)', 
                            borderColor: 'darkgreen',
                          }
                        }}
                      >
                        {updateLoading ? 'Updating...' : 'Update Proposal'}
                      </Button>
                    </Grid>
                      
                    {/* Delete Button */}
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={handleDelete}
                        disabled={deleteLoading}
                        sx={{
                          width: '13em',
                          color: 'green',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(1, 162, 80)',
                            borderColor: 'darkred',
                            color: 'black'
                          }
                        }}
                      >
                        {deleteLoading ? 'Deleting...' : 'Delete Proposal'}
                      </Button>
                    </Grid>
                      
                    {/* Cancel Button */}
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleCancel} 
                        disabled={deleteLoading}
                        sx={{
                          width: '10em',
                          color: 'gray',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: 'gray',
                            color: 'white'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Box>


                {errorMessage && (
                  <Grid item xs={12}>
                    <p className="error-message">{errorMessage}</p>
                  </Grid>
                )}
                {successMessage && (
                  <Grid item xs={12}>
                    <p className="success-message">{successMessage}</p>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
