import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  ThemeProvider,
  createTheme,
  InputAdornment,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Email, Lock, Phone, Business, Domain } from "@mui/icons-material";

// Base API URL
const API = import.meta.env.VITE_BASE_URL;

const BorrowerForm = ({ setUser, setToken }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    ein: "",
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

    if (newborrower.confirm_password !== newborrower.password) {
      alert("Password does not match");
    } else {
      createNewBorrower(newborrower);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = () => {
    navigate("/");
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "100%",
          margin: "auto",
          padding: 4,
          minHeight: "100vh",
          backgroundColor: "#f6f7f8",
          paddingTop: "40px",
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: "50px" }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f6f7f8",
                padding: 4,
                borderRadius: "0",
              }}
            >
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728411151/Hey_there_Friend_4_snyiql.png"
                alt="Welcome to MoneyMoneyMoney"
                style={{
                  width: "600px",
                  height: "800px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                backgroundColor: "#f6f7f8",
                borderRadius: "0",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
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
                <strong>Borrower Registration</strong>
                <br />
                <strong>
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
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid container item xs={12} spacing={2}>
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
                        style: { backgroundColor: "white" },
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
                        style: { backgroundColor: "white" },
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
                        style: { backgroundColor: "white" },
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
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />
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
                      InputProps={{
                        style: { backgroundColor: "white" },
                      }}
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
                      InputProps={{
                        style: { backgroundColor: "white" },
                      }}
                    >
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
                      InputProps={{
                        style: { backgroundColor: "white" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      type="tel"
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
                        style: { backgroundColor: "white" },
                      }}
                    />
                  </Grid>
                </Grid>
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
                      InputProps={{
                        style: { backgroundColor: "white" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="EIN (Employer Identification Number)"
                      name="ein"
                      type="text"
                      value={newborrower.ein}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      placeholder="e.g. 123456789"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Domain />
                          </InputAdornment>
                        ),
                        style: { backgroundColor: "white" },
                      }}
                    />
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
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  >
                    <MenuItem value="Agriculture">Agriculture</MenuItem>
                    <MenuItem value="Construction">Construction</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Hospitality">Hospitality</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Renewable Energy">
                      Renewable Energy
                    </MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="More">More</MenuItem>
                  </TextField>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#00a250",
                        color: "#f6f7f8",
                        "&:hover": {
                          backgroundColor: "#008740",
                        },
                        width: "100%",
                      }}
                    >
                      Register
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {showConfirmation ? (
                      <Alert
                        severity="warning"
                        sx={{ width: "100%" }}
                        action={
                          <Box>
                            <Button
                              color="inherit"
                              size="small"
                              onClick={handleCancelConfirmation}
                            >
                              No, continue
                            </Button>
                            <Button
                              color="inherit"
                              size="small"
                              onClick={handleConfirmCancel}
                            >
                              Yes, cancel
                            </Button>
                          </Box>
                        }
                      >
                        <AlertTitle>
                          Are you sure you want to cancel?
                        </AlertTitle>
                        You will be taken back to the homepage.
                      </Alert>
                    ) : (
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
                          width: "100%",
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ height: "100px" }}></Box>{" "}
      </Box>
    </ThemeProvider>
  );
};

BorrowerForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default BorrowerForm;
