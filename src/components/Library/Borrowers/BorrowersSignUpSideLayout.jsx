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

const SignUpBorrowerLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component={Paper}
        sx={{
          height: "100vh",
          overflow: "hidden",
          margin: 0,
        }}
      >
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
            backgroundColor: "#f6f7f8",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <img
            src={MMMLogo}
            alt="MMM Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome to MoneyMoneyMoney
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Advantages for Borrowers:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                <strong>One Application:</strong> Fill out a single form for all
                lenders.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Minimal Credit Pulls:</strong> Your score may be
                affected, but not significantly.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                <strong>Broad Visibility:</strong> Your loan request will be
                seen by all lenders on our platform.
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
            <Typography variant="h5" component="h2" gutterBottom>
              Sign Up as a Borrower
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
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Zip Code"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Credit Score"
              type="number"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Industry"
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

export default SignUpBorrowerLayout;
