import PropTypes from "prop-types";
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
const BorrowerForm = ({ setUser, setToken }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [newborrower, setNewBorrower] = useState({
    email: "",
    password: "",
    confirm_password: "",
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

      if (results.error) {
        alert(results.error);
      } else {
        setUser(results.borrower);
        setToken(results.token);
        navigate("/borrower");
      }
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

    if (newborrower.confirm_password != newborrower.password) {
      alert("Password does not match");
    } else {
      const updatedBorrower = {
        ...newborrower,
        credit_score: parseInt(newborrower.credit_score),
      };

      createNewBorrower(updatedBorrower);
    }
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
          marginBottom: "40px", // Space between form and footer
        }}
      >
        <Grid container sx={{ height: "100vh" }} spacing={0}>
          {/* Left side with the image */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: -2 }}>
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728411151/Hey_there_Friend_4_snyiql.png"
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
                {/* Email and Password on one line */}
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <TextField
                      label="Confirm Password"
                      name="confirm_password"
                      type="password"
                      value={newborrower.confirm_password}
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
                </Grid>
                {/* Business Start Date and Credit Score on top */}
                <Grid container item xs={12} spacing={2}>
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
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <TextField
                      label="State"
                      name="state"
                      value={newborrower.state}
                      onChange={handleChange}
                      select
                      fullWidth
                      required
                      margin="normal"
                    >
                      {/* Complete list of U.S. States */}
                      <MenuItem value="AL">Alabama</MenuItem>
                      <MenuItem value="AK">Alaska</MenuItem>
                      <MenuItem value="AZ">Arizona</MenuItem>
                      <MenuItem value="AR">Arkansas</MenuItem>
                      <MenuItem value="CA">California</MenuItem>
                      <MenuItem value="CO">Colorado</MenuItem>
                      <MenuItem value="CT">Connecticut</MenuItem>
                      <MenuItem value="DE">Delaware</MenuItem>
                      <MenuItem value="DC">District of Columbia</MenuItem>
                      <MenuItem value="FL">Florida</MenuItem>
                      <MenuItem value="GA">Georgia</MenuItem>
                      <MenuItem value="HI">Hawaii</MenuItem>
                      <MenuItem value="ID">Idaho</MenuItem>
                      <MenuItem value="IL">Illinois</MenuItem>
                      <MenuItem value="IN">Indiana</MenuItem>
                      <MenuItem value="IA">Iowa</MenuItem>
                      <MenuItem value="KS">Kansas</MenuItem>
                      <MenuItem value="KY">Kentucky</MenuItem>
                      <MenuItem value="LA">Louisiana</MenuItem>
                      <MenuItem value="ME">Maine</MenuItem>
                      <MenuItem value="MD">Maryland</MenuItem>
                      <MenuItem value="MA">Massachusetts</MenuItem>
                      <MenuItem value="MI">Michigan</MenuItem>
                      <MenuItem value="MN">Minnesota</MenuItem>
                      <MenuItem value="MS">Mississippi</MenuItem>
                      <MenuItem value="MO">Missouri</MenuItem>
                      <MenuItem value="MT">Montana</MenuItem>
                      <MenuItem value="NE">Nebraska</MenuItem>
                      <MenuItem value="NV">Nevada</MenuItem>
                      <MenuItem value="NH">New Hampshire</MenuItem>
                      <MenuItem value="NJ">New Jersey</MenuItem>
                      <MenuItem value="NM">New Mexico</MenuItem>
                      <MenuItem value="NY">New York</MenuItem>
                      <MenuItem value="NC">North Carolina</MenuItem>
                      <MenuItem value="ND">North Dakota</MenuItem>
                      <MenuItem value="OH">Ohio</MenuItem>
                      <MenuItem value="OK">Oklahoma</MenuItem>
                      <MenuItem value="OR">Oregon</MenuItem>
                      <MenuItem value="PA">Pennsylvania</MenuItem>
                      <MenuItem value="RI">Rhode Island</MenuItem>
                      <MenuItem value="SC">South Carolina</MenuItem>
                      <MenuItem value="SD">South Dakota</MenuItem>
                      <MenuItem value="TN">Tennessee</MenuItem>
                      <MenuItem value="TX">Texas</MenuItem>
                      <MenuItem value="UT">Utah</MenuItem>
                      <MenuItem value="VT">Vermont</MenuItem>
                      <MenuItem value="VA">Virginia</MenuItem>
                      <MenuItem value="WA">Washington</MenuItem>
                      <MenuItem value="WV">West Virginia</MenuItem>
                      <MenuItem value="WI">Wisconsin</MenuItem>
                      <MenuItem value="WY">Wyoming</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Industry"
                    name="industry"
                    value={newborrower.industry}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                    margin="normal"
                  >
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Food Service">Food Service</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    {/* Add more industries as needed */}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#00a250",
                      color: "#f6f7f8",
                      "&:hover": {
                        backgroundColor: "#008740",
                      },
                    }}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleCancel}
                    sx={{
                      color: "#00a250",
                      borderColor: "#00a250",
                      "&:hover": {
                        backgroundColor: "#f6f7f8",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Cancel Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel the registration? You will be taken
            back to the homepage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleConfirmCancel} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

BorrowerForm.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
export default BorrowerForm;
