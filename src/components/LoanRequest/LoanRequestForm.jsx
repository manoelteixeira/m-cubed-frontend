import PropTypes from "prop-types";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  IconButton,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a250",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const API = import.meta.env.VITE_BASE_URL;

const LoanRequestForm = ({ user, token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    borrower_id: id,
    driverLicense: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      driverLicense: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanData = {
      title: formData.title,
      description: formData.description,
      value: parseFloat(formData.value),
      created_at: new Date().toISOString(),
      borrower_id: id,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(loanData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    fetch(`${API}/borrowers/${user.id}/requests`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setSubmissionStatus("Loan request submitted successfully!");
          navigate("/borrower");
        } else {
          setError(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSaveDraft = () => {
    const now = new Date();
    const formattedTimestamp = now.toLocaleString();
    setTimestamp(`Draft saved on: ${formattedTimestamp}`);

    localStorage.setItem("loanDraft", JSON.stringify(formData));
    setSubmissionStatus("Draft saved!");
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSubmissionStatus("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "40%",
              boxShadow: "0 4px 10px rgba(0, 0, 0, .2)",
              borderRadius: "20px",
              transition: "box-shadow 0.3s ease", // Smooth transition
              "&:hover": {
                boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.7)", // White glow effect on hover
              },
            }}
            alt="Next Steps Placeholder"
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729188220/moneymoneymoney_4_dkxska.png"
          />

          <Card
            sx={{
              width: "55%",
              boxShadow: "0 4px 10px rgba(0, 0, 0, .2)",
              padding: "30px",
              borderRadius: "20px",
              backgroundColor: "#f6f7f8",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{ color: "#00a250", fontWeight: "bold", marginBottom: 2 }}
              >
                Loan Application Form
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ style: { color: "#00a250" } }}
                      InputProps={{
                        style: {
                          borderColor: "#00a250",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Purpose of Loan"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ style: { color: "#00a250" } }}
                      InputProps={{
                        style: {
                          borderColor: "#00a250",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Loan Amount Requested"
                      name="value"
                      type="number"
                      value={formData.value}
                      onChange={handleChange}
                      required
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{ style: { color: "#00a250" } }}
                      InputProps={{
                        style: {
                          borderColor: "#00a250",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: "#00a250" }}>
                      Upload Driver's License
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        marginTop: "10px",
                        borderColor: "#00a250",
                        color: "#00a250",
                        "&:hover": {
                          borderColor: "#00a250",
                          backgroundColor: "#def4df",
                        },
                      }}
                      startIcon={<UploadIcon />}
                    >
                      Choose File
                      <input
                        type="file"
                        hidden
                        accept="image/*, .pdf"
                        onChange={handleFileChange}
                      />
                    </Button>
                    {formData.driverLicense && (
                      <Typography
                        variant="body2"
                        sx={{ color: "#00a250", marginTop: "8px" }}
                      >
                        File Selected: {formData.driverLicense.name}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop="1.5rem"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    sx={{ backgroundColor: "#00a250", color: "white" }}
                  >
                    Submit Application
                  </Button>

                  <Button
                    type="button"
                    onClick={handleSaveDraft}
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    sx={{ borderColor: "#00a250", color: "#00a250" }}
                  >
                    Save Draft
                  </Button>
                </Box>
              </form>

              {timestamp && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ marginTop: "1rem" }}
                >
                  {timestamp}
                </Typography>
              )}

              <Snackbar
                open={!!submissionStatus}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={submissionStatus}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              />

              <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

LoanRequestForm.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default LoanRequestForm;
