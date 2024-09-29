import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignInForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API = import.meta.env.VITE_BASE_URL;

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                console.log(data)
                if (data.lender) {

                    navigate(`/lenders/${data.lender.id}/lenderdashboard`);
                } else {
                    navigate(`/borrowers/${data.borrower.id}/borrowersdashboard`);
                }
            } else {
                setError(data.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}
        >
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
                        type={showPassword ? 'text' : 'password'}
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
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            <Button
                onClick={() => navigate(`/forgot-password`)}
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
            >
                Forgot Password
            </Button>
            <Button
                component={Link}
                to="https://accounts.google.com/signin/v2/identifier"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login with Google
            </Button>
        </Box>
    );
};

export default SignInForm;
