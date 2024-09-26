import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";

const BorrowerForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    city: "",
    street: "",
    state: "",
    zipCode: "",
    phone: "",
    businessName: "",
    creditScore: "",
    startDate: "",
    industry: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "auto", padding: 2 }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Borrower Registration
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
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
            value={formData.street}
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
            value={formData.state}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 10 }} // Limit zip code length
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ maxLength: 10 }} // Limit phone length
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Business Name"
            name="businessName"
            value={formData.businessName}
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
            value={formData.creditScore}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ min: 300, max: 850 }} // Credit score range
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            select
          >
            {/* Add your industry options here */}
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
        Get Funded!
      </Button>
    </Box>
  );
};

export default BorrowerForm;
