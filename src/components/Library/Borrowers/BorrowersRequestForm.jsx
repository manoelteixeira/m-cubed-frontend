import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

const LoanRequestForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    createdAt: "",
    fundedAt: "",
    acceptedProposalId: "",
    borrowerId: "",
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
    console.log("Loan request submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "auto", padding: 2 }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Loan Request Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Value"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ step: "0.01" }} // Allow decimal values
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Created At"
            name="createdAt"
            type="date"
            value={formData.createdAt}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Funded At"
            name="fundedAt"
            type="date"
            value={formData.fundedAt}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Accepted Proposal ID"
            name="acceptedProposalId"
            type="number"
            value={formData.acceptedProposalId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Borrower ID"
            name="borrowerId"
            type="number"
            value={formData.borrowerId}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit Loan Request
      </Button>
    </Box>
  );
};

export default LoanRequestForm;
