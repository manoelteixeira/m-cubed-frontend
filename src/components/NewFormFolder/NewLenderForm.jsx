import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  createTheme,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Email, Lock, Business } from "@mui/icons-material";

const API = import.meta.env.VITE_BASE_URL;

const LenderForm = ({ setUser, setToken }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [newLender, setNewLender] = useState({
    email: "",
    password: "",
    confirm_password: "",
    business_name: "",
  });

  const createNewLender = async (newLender) => {
    try {
      const response = await fetch(`${API}/lenders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLender),
      });
      const results = await response.json();

      if (!results.error) {
        setUser(results.lender);
        setToken(results.token);
        navigate("/lender");
      } else {
        alert(results.error);
      }
    } catch (error) {
      console.error("Error creating lender:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLender({
      ...newLender,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLender.password !== newLender.confirm_password) {
      alert("Passwords do not match");
    } else {
      const lenderData = { ...newLender };
      delete lenderData.confirm_password;
      createNewLender(lenderData);
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
          padding: 4,
          paddingTop: 2, // Reduced padding at the top
          marginBottom: 8, // Add margin to push the form away from the footer
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={0}>
          {/* Left side with the image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728325843/Hey_there_Friend_5_bgxdye.png"
                alt="Welcome to MoneyMoneyMoney"
                style={{
                  width: "600px",
                  height: "800px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
                }}
              />
            </Box>
          </Grid>

          {/* Right side with the form */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                backgroundColor: "#def4df",
                boxShadow: 14,
                borderRadius: "20px",
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
                <strong>Lender Registration</strong>
                <br />
                <strong>
                  Welcome to <span style={{ color: "#00a250" }}>MMM</span>
                </strong>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={newLender.email}
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
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={newLender.password}
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
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    value={newLender.confirm_password}
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
                <Grid item xs={12}>
                  <TextField
                    label="Business Name"
                    name="business_name"
                    value={newLender.business_name}
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
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#00a250", color: "#f6f7f8" }}
              >
                <strong>Start Your Trial Period Today!</strong>
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCancel}
                fullWidth
                sx={{ mt: 2, borderColor: "#00a250", color: "#00a250" }}
              >
                <strong>Cancel</strong>
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Cancel Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle>{"Confirm Cancellation"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to cancel?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmCancel} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

LenderForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default LenderForm;
