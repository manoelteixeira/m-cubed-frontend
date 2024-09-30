import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

const EditBorrowerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editBorrower, setEditBorrower] = useState({
    email: "",
    password: "",
    city: "",
    street: "",
    state: "",
    zip_code: "",
    phone: "",
    business_name: "",
    credit_score: "",
    start_date: "",
    industry: "",
  });
//AXIOS FETCHING 
  // useEffect(() => {
  //   const fetchBorrowerData = async () => {
  //     try {
  //       const response = await axios.get(`${API}/borrowers/${id}`);
  //       setEditBorrower(response.data); 
  //     } catch (error) {
  //       console.error('Error fetching borrower data: ', error);
  //     }
  //   };

  //   fetchBorrowerData();
  // }, [id]);

  // const updateBorrower = async (editBorrower) => {
  //   try {
  //     await axios.put(`${API}/borrowers/${id}`, editBorrower, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     navigate(`/borrowers/${id}/borrowerdashboard`);
  //   } catch (error) {
  //     console.error('Error updating borrower: ', error);
  //   }
  // };

  useEffect(() => {
    const fetchBorrowerData = async () => {
      try {
        const response = await fetch(`${API}/borrowers/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching borrower data');
        }
        const data = await response.json();
        setEditBorrower(data); 
      } catch (error) {
        console.error('Error fetching borrower data: ', error);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBorrower(editBorrower);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "auto", padding: 2 }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Edit Borrower Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={14} sm={6}>
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
        {/* <Grid item xs={14} sm={6}>
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
        </Grid> */}
        <Grid item xs={14} sm={6}>
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
        <Grid item xs={14} sm={6}>
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
        <Grid item xs={14} sm={6}>
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
        <Grid item xs={14} sm={6}>
          <TextField
            label="Zip Code"
            name="zipCode"
            value={editBorrower.zip_code}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 10 }}
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
            name="businessName"
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
            name="creditScore"
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
            name="startDate"
            type="date"
            value={editBorrower.start_date}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
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
            select
          >
            <MenuItem value="Retail">Retail</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Construction">Construction</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Update Information
      </Button>
    </Box>
  );
};

export default EditBorrowerForm;
