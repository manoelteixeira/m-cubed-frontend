import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

export default function LoanProposalForm() {
  const { lender_id, id } = useParams();
  const [borrowerForProposal, setBorrowerForProposal] = useState();

  const [lenderproposal, setLenderProposal] = useState({
    title: '',
    description: '',
    loan_amount: '',
    interest_rate: '',
    repayment_term: '',
    accepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLenderProposal({ ...lenderproposal, [name]: value });
  };

  useEffect(() => {
    const fetchBorrower = async () => {
      try {
        const res = await fetch(`${API}/borrowers/${id}`);
        const data = await res.json();
        setBorrowerForProposal(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBorrower();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API}/lenders/${lender_id}/requests/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lenderproposal),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.error || errorData.message}`);
        return;
      }

      setSuccessMessage('Loan proposal submitted successfully!');
      setLenderProposal({
        title: '',
        description: '',
        loan_amount: '',
        interest_rate: '',
        repayment_term: '',
        accepted: false,
      });
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="loan-proposal-form-container">
      <Paper elevation={3} className="loan-proposal-paper">
        <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper>
            <Typography variant="h4" align="right" className="borrower-info">
              Borrower Info
            </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box component="form" onSubmit={handleSubmit} className="form-box">
              <Paper>
              <Typography className="form-title" sx={{m: '20px', fontSize:'2em', textAlign:'center'}}>Loan Proposal for //Borrower Business Name</Typography>
              </Paper>
              <Grid container spacing={4} sx={{borderLeft: '1px solid black'}}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={lenderproposal.title}
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
                    value={lenderproposal.description}
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
                    value={lenderproposal.loan_amount}
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
                    value={lenderproposal.interest_rate}
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
                    value={lenderproposal.repayment_term}
                    onChange={handleChange}
                    className="input-field"
                    inputProps={{ min: '0' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Link to={`/lenders/${lender_id}/lenderdashboard`}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      className="submit-button"
                      sx={{background: 'green'}}
                    >
                      {loading ? 'Submitting...' : 'Submit Proposal'}
                    </Button>
                  </Link>
                </Grid>

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
