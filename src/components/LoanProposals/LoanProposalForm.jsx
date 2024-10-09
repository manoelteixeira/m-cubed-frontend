import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  const navigate = useNavigate()
  const { lender_id, id } = useParams();
  const [borrowerForProposal, setBorrowerForProposal] = useState([]);


  const [lenderproposal, setLenderProposal] = useState({
    title: '',
    description: '',
    loan_amount: '',
    interest_rate: '',
    repayment_term: '',
    created_at:'',
    accepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'accepted') {
      setLenderProposal({ ...editProposal, [name]: value === 'true' });
    } else if (name === 'loan_amount' || name === 'interest_rate' || name === 'repayment_term') {
      setLenderProposal({ ...editProposal, [name]: Number(value) });
    } else {
      setLenderProposal({ ...editProposal, [name]: value });
    }
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

  const borrowerInfo = [borrowerForProposal]

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
        body: JSON.stringify({
          title: lenderproposal.title,
          description: lenderproposal.description,
          loan_amount: lenderproposal.loan_amount,
          interest_rate: lenderproposal.interest_rate,
          repayment_term: lenderproposal.repayment_term,
          created_at: lenderproposal.created_at,
          accepted: lenderproposal.accepted,
          lender_id: lender_id,
          loan_request_id: id,
        }),
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
        created_at: '',
        accepted: false,
      });
      navigate(`/lenders/${lender_id}/lenderdashboard`)
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
            <Paper className="borrower-details-paper">
              <Grid flexGrow={1} gap={'20px'}>
                <Typography variant='h3' className="borrower-info-title">Borrower Details</Typography>
                {borrowerInfo.map((info,id) => {
                  return (
                    <div className='borrower-details' key={id}>
                      {/*Left-side of Grid */}
                      <Typography variant="h4" align="left" className="borrower-info">Industry: {info.industry}</Typography>
                      <Typography variant='h5'>Location: {info.city}, {info.state}</Typography>
                      <Typography variant='h5'>Credit Score: <em>{info.credit_score}</em></Typography>
                    </div>
                  )} 
                )}
                <Typography className="disclaimer">
                  <strong>Disclaimer</strong>: 
                  This information is confidential and the respective future compatriant will only see details of the Loan Proposal. Further details upon review can be determined after approval.
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Right-side of Grid */}
            <Box component="form" onSubmit={handleSubmit} className="form-box">
              <Paper sx={{margin: '2em'}}>
              <Typography className="form-title" sx={{fontSize:'2em'}}>Loan Proposal for {borrowerForProposal.business_name}</Typography>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="created_at"
                    name="created_at"
                    type="date"
                    value={lenderproposal.created_at}
                    onChange={handleChange}
                    className="input-field"
                    inputProps={{ min: '0' }}
                  />
                </Grid>

                <Grid item xs={12}>
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

                    <Button
                    variant='contained'
                    className='submit-button'
                    sx={{background:'gray', width:'100%', mt:'2em','&:hover':{ background:'black' }}}
                ><Link style={{color:'white'}}>Cancel</Link></Button>
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
