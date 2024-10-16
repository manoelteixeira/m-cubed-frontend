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
  Card,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Photographer from "../../assets/1.png";
import MedicalEquipment from "../../assets/2.png";
import ApprovedLoan from "../../assets/5.png";

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

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    fade: true,
    cssEase: "linear",
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
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "55%",
            boxShadow: 10,
            overflow: "hidden",
          }}
        >
          <Slider {...carouselSettings}>
            <div className="slide-item">
              <img
                src={Photographer}
                alt="Clothing Store"
                className="slide-image"
              />
            </div>
            <div className="slide-item">
              <img
                src={MedicalEquipment}
                alt="Medical Equipment"
                className="slide-image"
              />
            </div>
            <div className="slide-item">
              <img
                src={ApprovedLoan}
                alt="Approved-Loan-Application"
                className="slide-image"
              />
            </div>
          </Slider>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: "#def4df",
            borderRadius: "20px",
            width: "80%",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
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
              >
                <GoogleIcon />
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
              <FacebookIcon />
              Sign in with Facebook
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};

export default Login;
