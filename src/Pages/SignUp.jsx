import React, { useState } from "react";
import SignUpFormBorrow from "../components/Library/Borrowers/SignUpFormBorrow";
import SignUpFormLender from "../components/Library/Lenders/SignUpFormLender";
import {
  Button,
  Box,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formType, setFormType] = useState("");

  const handleFormToggle = (event, newFormType) => {
    setFormType(newFormType);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 2, textAlign: "center" }}
      >
        Sign Up
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <ToggleButtonGroup
            value={formType}
            exclusive
            onChange={handleFormToggle}
            aria-label="user type selection"
          >
            <ToggleButton value="borrower" aria-label="borrower">
              Sign Up as Borrower
            </ToggleButton>
            <ToggleButton value="lender" aria-label="lender">
              Sign Up as Lender
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        {formType === "borrower" && <SignUpFormBorrow />}
        {formType === "lender" && <SignUpFormLender />}
      </Box>

      <Link to={"/"}>Sign Up as Borrower </Link>
    </Box>
  );
};

export default SignUp;
