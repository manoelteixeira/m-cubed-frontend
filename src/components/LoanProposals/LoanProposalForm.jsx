import React, { useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Typography
} from '@mui/material';

const API = import.meta.env.VITE_BASE_URL;

export default function LoanProposalForm() {
  const { lender_id,id } = useParams();

  const [lenderproposal, setLenderProposal] = useState({
    title: '',
    description: '',
    loan_amount: '',
    interest_rate: '',
    repayment_term: '',
    accepted: false,
    lender_id: '',
    loan_request_id: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'accepted') {
      setLenderProposal({ ...lenderproposal, [name]: value === 'true' });
    } else if (name === 'loan_amount' || name === 'interest_rate' || name === 'repayment_term') {
      setLenderProposal({ ...lenderproposal, [name]: Number(value) });
    } else {
      setLenderProposal({ ...lenderproposal, [name]: value });
    }
  };

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
        created_at:'',
        loan_amount: '',
        interest_rate: '',
        repayment_term: '',
        accepted: false, 
        lender_id: '',
        loan_request_id: '',
      });
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          <Typography>Loan Proposal for</Typography>
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
              inputProps={{ step: '0.01', min: '0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
  <TextField
    required
    fullWidth
    id="created_at"
    label="Proposal Date"
    name="created_at"
    type="date"  
    value={lenderproposal.created_at}  
    onChange={handleChange}
    InputLabelProps={{
      shrink: true,  
    }}
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
              inputProps={{ min: '0' }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="accepted-label">Accepted</InputLabel>
              <Select
                labelId="accepted-label"
                id="accepted"
                name="accepted"
                value={lenderproposal.accepted ? 'true' : 'false'} 
                label="Accepted"
                onChange={handleChange}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Link to={`/lenders/${id}/lenderdashboard`}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Proposal'}
            </Button>
            
            </Link>
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
