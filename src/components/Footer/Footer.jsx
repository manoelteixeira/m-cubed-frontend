import React from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#00a250",
        color: "#f6f7f8",
        padding: "20px 0",
        marginTop: "30%",
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

          {/* Subscribe Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Subscribe to Our Mailing List
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Stay updated about our launch and get the latest news.
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              sx={{ marginBottom: 1, backgroundColor: "#fff" }}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#008b3e",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#007a2e",
                },
              }}
            >
              Subscribe
            </Button>
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
