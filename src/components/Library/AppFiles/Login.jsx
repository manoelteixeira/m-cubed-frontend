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
//import styles from "./LoginForm.module.scss";

const Login = ({ setUser }) => {
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
                setUser(data);
                if (data.lender) {
                    navigate(`/lenders/${data.lender.id}/lenderdashboard`);
                } else {
                    navigate(`/borrowers/${data.borrower.id}/borrowersdashboard`);
                }
            } else {
                setError(data.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    const handleGoogleSuccess = (response) => {
        console.log(response);
    };

    const handleGoogleFailure = (response) => {
        console.error("Google Login failed:", response);
        setError("Google login failed. Please try again.");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box component="form" onSubmit={handleLogin} className={styles.formContainer}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
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
                <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Login
            </Button>
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
            </GoogleOAuthProvider>
        </Box>
    );
};

export default Login;
