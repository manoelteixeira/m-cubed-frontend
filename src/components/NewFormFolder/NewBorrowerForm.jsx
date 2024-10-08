import React, { useState } from "react";
import {
  Slide,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  ThemeProvider,
  createTheme,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Email, Lock, Phone, Business, CreditScore } from "@mui/icons-material";

// Base API URL
const API = import.meta.env.VITE_BASE_URL;

// Borrower Form Component
const BorrowerForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [newborrower, setNewBorrower] = useState({
    email: "",
    password: "",
    city: "",
    street: "",
    state: "",
    zip_code: "",
    phone: "",
    business_name: "",
    credit_score: 0,
    start_date: "",
    industry: "",
  });

  const createNewBorrower = async (newborrower) => {
    try {
      const response = await fetch(`${API}/borrowers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newborrower),
      });
      const results = await response.json();
      const id = results.borrower?.id;

      console.log(`Borrower created with ID: ${id}`);
      navigate(`/borrowers/${id}/borrowerdashboard`);
    } catch (error) {
      console.error("Error creating borrower:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBorrower({
      ...newborrower,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", newborrower);

    const updatedBorrower = {
      ...newborrower,
      credit_score: parseInt(newborrower.credit_score),
    };

    createNewBorrower(updatedBorrower);
  };

  const handleCancel = () => {
    setOpen(true);
  };

  const handleConfirmCancel = () => {
    setOpen(false);
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#00a250",
        contrastText: "#f6f7f8",
      },
      background: {
        default: "#f6f7f8",
      },
    },
  });

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "100%",
          margin: "auto",
          padding: 2,
          backgroundColor: "#f6f7f8",
          marginBottom: "40px", // Inline style for space between form and footer
        }}
      >
        <Grid container sx={{ height: "100vh" }} spacing={0}>
          {/* Left side with the image */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: -2 }}>
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728325842/Hey_there_Friend_4_x4suwt.png"
                alt="Welcome to MoneyMoneyMoney"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "none",
                }}
              />
            </Box>
          </Grid>

          {/* Right side with the form */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4, backgroundColor: "#f6f7f8" }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  mb: 3,
                  textAlign: "center",
                  color: "#00a250",
                  fontWeight: 600,
                }}
              >
                <strong style={{ color: "#00a250" }}>
                  Borrower Registration
                </strong>
                <br />
                <strong style={{ color: "#00a250" }}>
                  Welcome to <span style={{ color: "#00a250" }}>MMM</span>
                </strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={newborrower.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={newborrower.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="City"
                    name="city"
                    value={newborrower.city}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Street"
                    name="street"
                    value={newborrower.street}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="State"
                    name="state"
                    value={newborrower.state}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
                {/* Zip Code and Phone on the same line */}
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Zip Code"
                      name="zip_code"
                      value={newborrower.zip_code}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{ maxLength: 10 }}
                      placeholder="e.g. 12345"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={newborrower.phone}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{ maxLength: 10 }}
                      placeholder="e.g. 0123456789"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Business Name"
                    name="business_name"
                    value={newborrower.business_name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Credit Score and Business Start Date on the same line */}
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Credit Score"
                      name="credit_score"
                      type="number"
                      value={newborrower.credit_score}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      inputProps={{ min: 300, max: 850 }}
                      placeholder="e.g. 700"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditScore />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Business Start Date"
                      name="start_date"
                      type="date"
                      value={newborrower.start_date}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Select An Industry"
                    name="industry"
                    value={newborrower.industry}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                    margin="normal"
                  >
                    <MenuItem value="Agriculture, Forestry, Fishing and Hunting">
                      Agriculture, Forestry, Fishing and Hunting
                    </MenuItem>
                    <MenuItem value="Construction">Construction</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Wholesale Trade">Wholesale Trade</MenuItem>
                    <MenuItem value="Retail Trade">Retail Trade</MenuItem>
                    <MenuItem value="Transportation and Warehousing">
                      Transportation and Warehousing
                    </MenuItem>
                    <MenuItem value="Finance and Insurance">
                      Finance and Insurance
                    </MenuItem>
                    <MenuItem value="Real Estate Rental and Leasing">
                      Real Estate Rental and Leasing
                    </MenuItem>
                    <MenuItem value="Professional, Scientific, and Technical Services">
                      Professional, Scientific, and Technical Services
                    </MenuItem>
                    <MenuItem value="Healthcare and Social Assistance">
                      Healthcare and Social Assistance
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  color="primary"
                  size="large"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cancel Registration?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to cancel your registration? All your data
            will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, Go Back</Button>
          <Button onClick={handleConfirmCancel} color="primary">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default BorrowerForm;
