import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const LoanProposalForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdAt: "",
    accepted: false,
    lenderId: "",
    loanRequestId: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically handle form submission to your server
    console.log("Loan proposal submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "auto", padding: 2 }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Loan Proposal Form
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
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="accepted"
                  checked={formData.accepted}
                  onChange={handleChange}
                />
              }
              label="Accepted"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Lender ID"
            name="lenderId"
            type="number"
            value={formData.lenderId}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Loan Request ID"
            name="loanRequestId"
            type="number"
            value={formData.loanRequestId}
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
        Submit Loan Proposal
      </Button>
    </Box>
  );
};

export default LoanProposalForm;
