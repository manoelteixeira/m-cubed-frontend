import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const SignInForm = () => {

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('sign in submitted');
    };

    return (
        <Box className="sign-in-page" component="form" onSubmit={handleLogin} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
                Sign In
            </Typography>
            <TextField
                label="Email"
                name="email"
                type="email"
                placeholder="email"
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="password"
                fullWidth
                required
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};

export default SignInForm;
