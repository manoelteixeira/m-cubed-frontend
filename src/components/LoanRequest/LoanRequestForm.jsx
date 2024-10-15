// src/components/LoanRequest/LoanRequestForm.jsx
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addRequest } from "../services/serviceRequest";
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
import "./LoanRequest.css";
import LoanProposal from '../../assets/10.png';

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
  const [requests, setRequests] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            zIndex: 1,
          },
          backgroundImage: `url(${LoanProposal})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#f6f7f8",
            padding: "4rem",
            borderRadius: "8px",
            border: '2px solid #00A250',
            boxShadow: "0 4px 10px rgba(0, 0, 0, .4)",
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#00a250" }}
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
            </Grid>

            <Box display="flex" justifyContent="space-between" marginTop="1.5rem">
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoanRequestForm;

LoanRequestForm.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
