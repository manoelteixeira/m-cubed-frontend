import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const ForgotCredentials = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPassword && newPassword) {
      setMessage(`Your password has been reset.`);
      setNewPassword("");
    } else if (!isPassword && email) {
      setMessage(
        `Instructions to recover your email have been sent to ${email}.`
      );
      setEmail("");
    } else {
      setMessage("Please fill in the required field.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f6f7f8",
        pb: 8,
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#f6f7f8", // Removed shadows and borders
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: "#00a250", fontWeight: 600, mb: 2 }}
        >
          {isPassword ? "Reset Your Password" : "Recover Your Email"}
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {!isPassword && (
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
                sx: {
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#00a250",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00a250",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00a250",
                    },
                  },
                },
              }}
            />
          )}

          {isPassword && (
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#00a250",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00a250",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00a250",
                    },
                  },
                },
              }}
            />
          )}

          <Typography variant="body2" align="center" sx={{ mb: 2 }}>
            {isPassword
              ? "Enter your new password to reset your account."
              : "Enter your email to recover your account."}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#00a250",
              color: "white",
              mb: 2,
              "&:hover": { backgroundColor: "#007a3e" },
            }}
          >
            Submit
          </Button>

          <Button
            onClick={() => {
              setIsPassword((prev) => !prev);
              setMessage("");
            }}
            fullWidth
            sx={{
              color: "#00a250",
              textTransform: "none",
              background: "transparent",
            }}
          >
            {isPassword ? "Forgot Email?" : "Forgot Password?"}
          </Button>
        </form>

        {message && (
          <Typography color="textSecondary" align="center" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotCredentials;
