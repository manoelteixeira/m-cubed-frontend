import React, { useState } from "react";
import {
  Slide,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { useNavigate } from "react-router";
import MMMLogo from "../../assets/newLogo.png";

const API = import.meta.env.VITE_BASE_URL;

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
      console.log(results)
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
        main: "#4caf50", 
        contrastText: "#ffffff", 
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
      onSubmit={ handleSubmit }
      sx={{ maxWidth: '100%', margin: "auto", padding: 2 }}
      >
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
            style={{ width: "150px", marginBottom: "20px" }}
            />
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome to MoneyMoneyMoney
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Advantages for Borrowers:
          </Typography>
          <ul style={{ paddingLeft: "120px" }}>
            <li>
              <Typography variant="body2">
                Minimal Credit Pulls, Minimal effect on Credit score.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                No involvement of Brokers.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Open-Access to our diversified List of Lenders.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Seamless Loan Listing Application with Ease!
              </Typography>
            </li>
          </ul>
        </Grid>

        {/* Right Side Panel (Form) */}
        <Grid item xs={12} md={6} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
            Borrower Registration
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={newborrower.email}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={newborrower.password}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                name="zip_code"
                value={newborrower.zip_code}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                inputProps={{ maxLength: 10 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={newborrower.phone}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                inputProps={{ maxLength: 10 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Business Name"
                name="business_name"
                value={newborrower.business_name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
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
            <Grid item xs={12} sm={6}>
              <TextField
                label="Industry"
                name="industry"
                value={newborrower.industry}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                select
                >
                <MenuItem value="Retail">Retail</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Construction">Construction</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
            >
            Get Funded!
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleCancel}
            fullWidth
            sx={{ mt: 2 }}
            >
            Cancel
          </Button>
        </Grid>
      </Grid>

      <Dialog 
      open={open} 
      onClose={handleClose} 
      TransitionComponent={Transition}>
        <DialogTitle>{"Confirm Cancellation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to cancel?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="inherit" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </ThemeProvider>
  );
};

export default BorrowerForm;
