import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const SignUpFormLender = () => {

    const [formData, setFormData] = useState({
        business_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSignUp = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
        } else {
            console.log('Sign up data:', formData);

        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSignUp}
            sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}
        >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Sign Up as Lender
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Business Name"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="password"
                    />
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
            >
                Sign Up
            </Button>
        </Box>
    );
};

export default SignUpFormLender;
