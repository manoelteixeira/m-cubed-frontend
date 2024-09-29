import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const SignUpFormBorrow = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        street: '',
        state: '',
        zip_code: '',
        phone: '',
        business_name: '',
        credit_score: '',
        start_date: '',
        industry: ''
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
                Sign Up as Borrower
            </Typography>
            <Grid container spacing={2}>
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
                <Grid item xs={6}>
                    <TextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Zip Code"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="tel"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Business Name"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Credit Score"
                        name="credit_score"
                        value={formData.credit_score}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Start Date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        fullWidth
                        required
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

export default SignUpFormBorrow;
