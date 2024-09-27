import React from "react";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MMMLogo from "./IMG/51525890-BF92-4236-AE2A-1E795AAB0DA4.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Main green color
      contrastText: "#ffffff", // White text color for contrast
    },
  },
});

const SignUpSideLayout = () => {
  return (
    <ThemeProvider theme={theme}>
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
            src={MMMLogo}
            alt="MMM Logo"
            className="rotate"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome to MoneyMoneyMoney
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Advantages for Lenders:
          </Typography>
          <ul>
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

        {/* Right Side Sign-Up Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: "100%", maxWidth: 400 }}
          >
            {" "}
            {/* Limit max width for form */}
            <Typography variant="h5" component="h2" gutterBottom>
              Sign Up as a Lender
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Business Name"
              variant="outlined"
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
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpSideLayout;
