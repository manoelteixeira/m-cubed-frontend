import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import MMMLogo from '../../assets/MMMLogo.png';
const API = import.meta.env.VITE_BASE_URL;

export default function EditBorrowerForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editBorrower, setEditBorrower] = useState({
    email: "",
    city: "",
    street: "",
    state: "",
    zip_code: "",
    phone: "",
    business_name: "",
    credit_score: "",
    start_date: "",
    industry: ""
  });

  const [loading, setLoading] = useState(true);
  // const [confirmPassword, setConfirmPassword] = useState(""); 

  useEffect(() => {
    const fetchBorrowerData = async () => {
      try {
        const response = await fetch(`${API}/borrowers/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching borrower data');
        }
        const data = await response.json();
        console.log(data)
        setEditBorrower(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching borrower data: ', error);
        setLoading(false);
      }
    };

    fetchBorrowerData();
  }, [id]);

  const updateBorrower = async (editBorrower) => {
    try {
      const response = await fetch(`${API}/borrowers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editBorrower),
      });

      if (!response.ok) {
        throw new Error('Error updating borrower');
      }

      navigate(`/borrowers/${id}/borrowerdashboard`);
    } catch (error) {
      console.error('Error updating borrower: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBorrower({
      ...editBorrower,
      [name]: value,
    });
  };

  
  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value); 
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (editBorrower.password !== confirmPassword) {
    //   alert("Passwords do not match.");
    //   return;
    // }

    const creditScore = parseInt(editBorrower.credit_score, 10); 
    if (isNaN(creditScore) || creditScore < 300 || creditScore > 850) {
      alert("Credit score must be a number between 300 and 850.");
      return;
    }

    updateBorrower(editBorrower);
  };

  const handleCancel = () => {
    navigate(`/borrowers/${id}/borrowerdashboard`);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: '50%', margin: "auto", padding: 2 }}
    >
      <Box sx={{ 
        marginLeft: '25%', 
        maxWidth: 400, 
        height: "auto", 
        padding: 2, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "space-between", 
         }}>
        <img src={MMMLogo} alt="Product Placeholder" style={{ width: "30%", borderRadius: 8, marginBottom: 16 }} />
      </Box>
      <Paper sx={{ p: '3em' }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'green' }}>
          Update Your Information
        </Typography>
        <Typography variant="h7">
          <em>Accurate information, Better chances for <strong>success! </strong></em>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Email" 
            name="email" 
            type="email" 
            value={editBorrower.email} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField 
            label="Password" 
            name="password" 
            type="password" 
            value={editBorrower.password} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Confirm Password" 
              type="password" 
              value={confirmPassword} 
              onChange={handleConfirmPasswordChange} 
              fullWidth 
              required 
              margin="normal" 
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField 
              label="City" 
              name="city" 
              value={editBorrower.city} 
              onChange={handleChange} 
              fullWidth 
              required 
              margin="normal" 
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Street" 
            name="street" 
            value={editBorrower.street} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="State" 
            name="state" 
            value={editBorrower.state} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Zip Code" 
            name="zip_code" 
            value={editBorrower.zip_code} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            inputProps={{ maxLength: 11 }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Phone" 
              name="phone" 
              value={editBorrower.phone} 
              onChange={handleChange} 
              fullWidth 
              required 
              margin="normal" 
              inputProps={{ maxLength: 10 }} 
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Business Name" 
            name="business_name" 
            value={editBorrower.business_name} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Credit Score" 
            name="credit_score" 
            type="number" 
            value={editBorrower.credit_score} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            inputProps={{ min: 300, max: 850 }} 
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField 
            label="Start Date" 
            name="start_date" 
            type="date" 
            value={editBorrower.start_date} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal"
            InputLabelProps={{ shrink: true }} 
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField 
            label="Industry" 
            name="industry" 
            value={editBorrower.industry} 
            onChange={handleChange} 
            fullWidth 
            required 
            margin="normal" 
            />
          </Grid>
        </Grid>
        <Grid display={'flex'}>

        <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        sx={{ 
          mt: 2, 
          width:'50%', 
          backgroundColor:'green' 
          }}>
          Update Borrower
        </Button>
        <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleCancel} 
        sx={{ 
          mt: 2, 
          ml: 2,
          width:'50%', 
          color:'black',
          border:'1px solid gray', 
          '&:hover':{ 
            background:'black', 
            color:'white'} 
            }}>
          Cancel
        </Button>
        </Grid>
      </Paper>
    </Box>
  );
}
