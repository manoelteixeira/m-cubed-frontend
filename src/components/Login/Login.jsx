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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

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
                // Navigate based on user type
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

        // Send the credential to your server for verification
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
            // Navigate based on user type
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
        <Box component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: "center" }}>
                Log In
            </Typography>
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
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </GoogleOAuthProvider>
        </Box>
    );
};

export default Login;
