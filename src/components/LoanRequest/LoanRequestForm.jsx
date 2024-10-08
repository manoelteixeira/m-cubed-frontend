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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import "./LoanRequest.css";

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

const LoanRequestForm = () => {
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
    created_at: "",
    funded_at: "",
    borrower_id: id,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loanData = {
        title: formData.title,
        description: formData.description,
        value: parseFloat(formData.value),
        created_at: formData.created_at,
        funded_at: formData.funded_at || null,
        borrower_id: id,
      };

      const addedRequest = await addRequest(id, loanData);

      if (addedRequest) {
        setRequests((prevRequests) => [...prevRequests, addedRequest]);
        navigate(`/borrowers/${id}`);
      }
    } catch (err) {
      setError("Error adding request.");
      console.error("Submission error:", err);
    }
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
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: "#f6f7f8",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: "#00a250" }}
        >
          Loan Application Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Business Name"
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

          <TextField
            label="Business Type"
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

          <TextField
            label="Created At"
            name="created_at"
            type="date"
            value={formData.created_at}
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

          <TextField
            label="Funded At"
            name="funded_at"
            type="date"
            value={formData.funded_at || ""}
            onChange={handleChange}
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

          <Box display="flex" justifyContent="space-between" marginTop="1.5rem">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              style={{ backgroundColor: "#00a250", color: "white" }}
            >
              Submit Application
            </Button>

            <Button
              type="button"
              onClick={handleSaveDraft}
              variant="outlined"
              startIcon={<SaveIcon />}
              style={{ borderColor: "#00a250", color: "#00a250" }}
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
            style={{ marginTop: "1rem" }}
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
    </ThemeProvider>
  );
};

export default LoanRequestForm;
