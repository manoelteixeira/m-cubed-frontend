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
  InputAdornment,
  ThemeProvider,
  createTheme,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Email, Lock, Business } from "@mui/icons-material";

const API = import.meta.env.VITE_BASE_URL;

const LenderForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [newLender, setNewLender] = useState({
    email: "",
    password: "",
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
      const id = results.lender?.id;

      console.log(`Lender created with ID: ${id}`);
      navigate(`/lenders/${id}/lenderdashboard`);
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
    console.log("Form submitted:", newLender);
    createNewLender(newLender);
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
        }}
      >
        <Grid container sx={{ height: "100vh" }} spacing={0}>
          {/* Left Side with Placeholder Image */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 0, boxShadow: "none" }}>
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728068756/Hey_there_Friend_2_zkos0a.png"
                alt="Welcome to MoneyMoneyMoney"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "none",
                }}
              />
            </Card>
          </Grid>

          {/* Right Side with Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, backgroundColor: "#f6f7f8", boxShadow: "none" }}>
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
                  Lender Registration
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
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                <strong>Get Started!</strong>
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCancel}
                fullWidth
                sx={{ mt: 2 }}
              >
                <strong>Cancel</strong>
              </Button>
            </Card>
          </Grid>
        </Grid>

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

export default LenderForm;
