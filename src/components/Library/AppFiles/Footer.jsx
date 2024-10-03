import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#00a250",
        color: "#f6f7f8",
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
              sx={{ color: "#f6f7f8", textDecoration: "underline" }}
            >
              Learn more
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Meet The Team
            </Typography>
            <Typography variant="body2">
              Our dedicated team is here to support you and ensure a smooth
              financing experience. Learn more about our expertise and
              commitment.
            </Typography>
            <Link
              href="/meet-the-team"
              sx={{ color: "#f6f7f8", textDecoration: "underline" }}
            >
              Meet the Team
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
