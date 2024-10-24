import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

const API = import.meta.env.VITE_BASE_URL;

const Login = ({ setUser, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${API}/login`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          const user = data.lender ? data.lender : data.borrower;
          setUser(user);
          setToken(data.token);

          const userType = Object.keys(data).includes("lender")
            ? "lender"
            : "borrower";
          localStorage.setItem(
            "credentials",
            JSON.stringify({
              user: data[userType],
              token: data.token,
              timestamp: new Date(),
              user_type: userType,
            })
          );

          navigate(`/${userType}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred. Please try again later.");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials) {
      const { timestamp } = credentials;
      const time = new Date(timestamp);
      const now = new Date();
      const timeDif = Math.abs(time - now) / (1000 * 60 * 60);
      if (timeDif < 12) {
        navigate(`/${credentials.user_type}`);
      }
    }
  }, []);

  return (
    <Grid container sx={{ height: "100vh", backgroundColor: "#f6f7f8" }}>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f6f7f8",
        }}
      >
        {/* Video Background */}
        <Box
          sx={{
            width: "80%",
            height: "auto",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="./loginvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: 4,
            backgroundColor: "#f6f7f8",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
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

            <Button
              variant="text"
              sx={{
                color: "#00a250",
                textTransform: "none",
                fontSize: "0.9rem",
                width: "100%",
              }}
              onClick={() => navigate("/forgotcredentials")}
            >
              Forgot Email/Password?
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};

export default Login;
