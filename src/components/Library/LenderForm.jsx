import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const LenderForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    businessName: "",
  });

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
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: "auto", padding: 2 }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Lender Registration
      </Typography>
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
      <TextField
        label="Business Name"
        name="businessName"
        value={formData.businessName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Get Started!
      </Button>
    </Box>
  );
};

export default LenderForm;
