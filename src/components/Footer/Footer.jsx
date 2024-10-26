import React, { useState } from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";
import SubscribeForm from "../SubscribeForm";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "#00a250",
        color: "#f6f7f8",
        padding: isHovered ? "40px 0" : "10px 0", // Change padding based on hover state
        zIndex: 10,
        transition: "padding 0.3s ease", // Smooth transition for padding
      }}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false
    >
      <Container>
        {isHovered ? ( // Conditional rendering based on hover state
          <Grid container spacing={4}>
            {/* Meet The Team Section */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, marginBottom: 1 }}
              >
                <Link
                  href="/about"
                  sx={{
                    color: "#f6f7f8",
                    textDecoration: "underline",
                    fontWeight: 700,
                  }}
                >
                  Meet The Team
                </Link>
              </Typography>

              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                We are committed to helping small businesses access the capital
                they need to thrive. Our platform connects borrowers with
                lenders, simplifying the financing process.
              </Typography>
            </Grid>

            {/* Subscribe Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Subscribe to Our Mailing List
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Stay updated about our launch and get the latest news.
              </Typography>

              {/* Styled Subscribe Form */}
              <SubscribeForm />
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2" align="center" sx={{ fontSize: "14px" }}>
            © {new Date().getFullYear()} MoneyMoneyMoney. All rights reserved.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
