import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import MMMLogo from "./IMG/MMMlogo.png";

const CreditApplicationForm = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <AppBar position="static" sx={{ backgroundColor: "#004d00" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Credit Application
          </Typography>
          <img src={MMMLogo} alt="MMM Logo" style={{ height: "40px" }} />
        </Toolbar>
      </AppBar>

      <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: "20px", borderRadius: "8px" }}>
            <Typography variant="h5" gutterBottom>
              Apply for Credit
            </Typography>

            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Business Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    type="tel"
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Street Address"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="State"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Zip Code"
                    variant="outlined"
                    inputProps={{ maxLength: 11 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Credit Score"
                    variant="outlined"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Loan Amount Requested"
                    variant="outlined"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Start Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Information"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Attach Documents
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="credit-report">
                      Credit Reports
                    </InputLabel>
                    <Input id="credit-report" type="file" multiple />
                    <FormHelperText>Upload your Credit Reports</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="sos-certificate">
                      Secretary of State Certificate
                    </InputLabel>
                    <Input id="sos-certificate" type="file" />
                    <FormHelperText>
                      Upload your Secretary of State Certificate
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="drivers-license">
                      Driver's License
                    </InputLabel>
                    <Input id="drivers-license" type="file" />
                    <FormHelperText>
                      Upload your Driver's License
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="other-documents">
                      Other Documents (if requested)
                    </InputLabel>
                    <Input id="other-documents" type="file" multiple />
                    <FormHelperText>
                      Upload any additional documents
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#006600",
                      "&:hover": {
                        backgroundColor: "#004d00",
                      },
                      marginTop: "20px",
                    }}
                  >
                    Submit Application
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreditApplicationForm;
