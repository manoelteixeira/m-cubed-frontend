// import React from 'react'

// export default function Header() {
//   return (
//     <header>
//         <h3 className='header_title'>Call to Action header above Nav</h3>
//     </header>
//   )
// }

import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { AccountBalance, TrendingUp } from "@mui/icons-material";

export default function CTAHeader() {
  return (
    <Box
      sx={{
        backgroundColor: "#056612",
        color: "#fff",
        padding: "24px 0",
        borderBottom: "4px solid #388e3c",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Borrowers CTA Section */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <AccountBalance sx={{ fontSize: 50, marginRight: 2 }} />{" "}
              <Box textAlign="left">
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
                >
                  Borrowers: One Application. Minimal Credit Pulls!
                </Typography>{" "}
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.1rem", marginTop: "8px" }}
                >
                  Get the best rates fast.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Lenders CTA Section */}
          <Grid item xs={12} md={6} textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <TrendingUp sx={{ fontSize: 50, marginRight: 2 }} />{" "}
              <Box textAlign="left">
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
                >
                  Lenders: Expand Your Reach with Verified Borrowers!
                </Typography>
                {/* Merged into a single line */}
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.1rem", marginTop: "8px" }}
                >
                  Streamline your lending process today.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
