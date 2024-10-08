import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const ForgotCredentials = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call logic here to handle password reset process
    if (email) {
      // Simulate an API call
      setMessage(
        `Instructions to reset your ${
          isPassword ? "password" : "email"
        } have been sent to your email.`
      );
      setEmail("");
    } else {
      setMessage("Please provide your email.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginTop: "30px",
          backgroundColor: "#f6f7f8",
        }}
      >
        <Typography variant="h5" align="center" style={{ color: "#00a250" }}>
          Forgot Your {isPassword ? "Password" : "Email?"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" align="center">
            {isPassword
              ? "Enter your email to reset your password."
              : "Enter your email to recover your account."}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#00a250", color: "white" }}
            fullWidth
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsPassword((prev) => !prev)}
            style={{
              marginTop: "10px",
              color: "#00a250",
              textTransform: "none",
              background: "transparent",
            }}
          >
            {isPassword ? "Forgot Email?" : "Forgot Password?"}
          </Button>
        </form>
        {message && (
          <Typography
            color="textSecondary"
            align="center"
            style={{ marginTop: "15px" }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotCredentials;
