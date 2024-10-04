import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  Divider,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login success:", data);
        if (data.lender) {
          navigate(`/lenders/${data.lender.id}/lenderdashboard`);
        } else {
          navigate(`/borrowers/${data.borrower.id}/borrowerdashboard`);
        }
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    const response = await fetch(`${API}/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: credential }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Google login success:", data);
      if (data.lender) {
        navigate(`/lenders/${data.lender.id}/lenderdashboard`);
      } else {
        navigate(`/borrowers/${data.borrower.id}/borrowerdashboard`);
      }
    } else {
      setError(data.error || "Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google Login failed:", response);
    setError("Google login failed. Please try again.");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        {/* Placeholder for Carousel */}
        <Typography variant="h6" sx={{ color: "#555" }}>
          Carousel Placeholder for Ads
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            backgroundColor: "#f6f7f8",
            height: "80%",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "#00a250", fontWeight: 600, mb: 3 }}
          >
            Welcome Back!
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    sx: { backgroundColor: "#fff" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    sx: { backgroundColor: "#fff" },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": { backgroundColor: "#007a3e" },
              }}
            >
              Log In
            </Button>

            <Divider sx={{ width: "100%", my: 2 }} />

            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  sx={{
                    color: "#00a250",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    width: "100%",
                  }}
                  onClick={() =>
                    alert("Forgot Email functionality coming soon!")
                  }
                >
                  Forgot Email?
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="text"
                  sx={{
                    color: "#00a250",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    width: "100%",
                  }}
                  onClick={() =>
                    alert("Forgot Password functionality coming soon!")
                  }
                >
                  Forgot Password?
                </Button>
              </Grid>
            </Grid>

            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: "#00a250",
                  color: "#00a250",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 2,
                }}
                onClick={() => {}}
              >
                <GoogleIcon sx={{ color: "#00a250" }} />
                Sign in with Google
              </Button>
            </GoogleOAuthProvider>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#00a250",
                color: "#00a250",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <FacebookIcon sx={{ color: "#00a250" }} />
              Sign in with Facebook
            </Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Not registered yet?{" "}
              <a
                href="/signup"
                style={{
                  color: "#00a250",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign Up Here
              </a>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
