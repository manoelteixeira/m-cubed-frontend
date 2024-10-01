import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#004d00",
        color: "#ffffff",
        padding: "20px 0",
        marginTop: "auto",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are committed to helping small businesses access the capital
              they need to thrive. Our platform connects borrowers with lenders,
              simplifying the financing process.
            </Typography>
            <Link
              href="/about"
              sx={{ color: "#ffffff", textDecoration: "underline" }}
            >
              Learn more
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Legal Information
            </Typography>
            <Typography variant="body2">
              Please review our terms of service and privacy policy to
              understand how we protect your information.
            </Typography>
            <Link
              href="/terms"
              sx={{ color: "#ffffff", textDecoration: "underline" }}
            >
              Terms of Service
            </Link>
            <br />
            <Link
              href="/privacy"
              sx={{ color: "#ffffff", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ marginTop: "20px" }}>
          © {new Date().getFullYear()} MoneyMoneyMoney. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
