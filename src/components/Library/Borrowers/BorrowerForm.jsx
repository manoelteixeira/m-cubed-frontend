import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";

const API = "YOUR_API_ENDPOINT";

const BorrowerForm = () => {
  const [formData, setFormData] = useState({
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
  const createNewBorrower = async (formData) => {
    try {
      const response = await fetch(`${API}/borrowers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const results = await response.json();
      const borrowerId = results.id;
  
      console.log(`Borrower created with ID: ${borrowerId}`);
    } catch (error) {
      console.error("Error creating borrower:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    createNewBorrower(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "auto", padding: 2 }}
    >
      <Grid container component={Paper} sx={{ height: "100vh" }}>
        {/* Left Side Panel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src="path_to_logo"
            alt="MMM Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome to MoneyMoneyMoney
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Advantages for Lenders:
          </Typography>
          <ul style={{ paddingLeft: "120px" }}>
            <li>
              <Typography variant="body2">
                Access to a diverse pool of potential borrowers.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Opportunity to offer competitive rates and terms.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Enhanced visibility and marketing support for your lending
                products.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Streamlined loan management process through our platform.
              </Typography>
            </li>
          </ul>
        </Grid>

        {/* Right Side Panel (Form) */}
        <Grid item xs={12} md={6} sx={{ p: 4 }}>
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
                name="zip_code"
                value={formData.zip_code}
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
                value={formData.phone}
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
                value={formData.business_name}
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
                value={formData.credit_score}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                inputProps={{ min: 300, max: 850 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={formData.start_date}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default BorrowerForm;
