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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

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
    expire_at: "",
    borrower_id: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanData = {
      title: formData.title,
      description: formData.description,
      value: parseFloat(formData.value),
      expire_at: formData.expire_at,
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
          paddingTop: "80px",
          paddingBottom: "100px",
          backgroundColor: "#f6f7f8",
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
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.7)",
              },
            }}
            alt="Next Steps Placeholder"
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1731347193/moneymoneymoney_2_bsxg5g.png"
          />

          <Box
            sx={{
              width: "55%",
              backgroundColor: "#f6f7f8",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                  <TextField
                    label="Valid Until"
                    name="expire_at"
                    type="date"
                    value={formData.expire_at}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderColor: "#00a250", // Border color to MMM green
                      },
                      inputProps: {
                        placeholder: "",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      style: {
                        color: "#00a250", // Label color to MMM green
                      },
                    }}
                  />
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
          </Box>
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
