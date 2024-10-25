        import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";

const API = import.meta.env.VITE_BASE_URL;

export default function EditLenderForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editLender, setEditLender] = useState({
        email: '',
        password: '',
        business_name: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updateLender = (editLender) => {
        fetch(`${API}/lenders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editLender),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            navigate(`/lenders/${id}/lenderdashboard`);
        })
        .catch(error => {
            console.error('Error updating lender:', error);
            setError(error.message || 'An error occurred while updating the lender');
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditLender(prevLender => ({
            ...prevLender,
            [name]: value,
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleCancel = () => {
        navigate(`/lenders/${id}/lenderdashboard`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editLender.email || !editLender.business_name) {
            setError("Email and Business Name are required");
            return;
        }
        if (editLender.password && editLender.password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        console.log(editLender)
        updateLender(editLender);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API}/lenders/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch lender data');
            }
            return res.json();
        })
        .then(data => {
            console.log(data)
            setEditLender({
                email: data.email || '',
                business_name: data.business_name || '',
                password: data.password || ''
            });
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching lender data:', error);
            setError(error.message);
            setIsLoading(false);
        });
    }, [id]);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: '50%', margin: "auto", padding: 2 }}
        >
            <Box sx={{ 
                marginLeft: '25%', 
                maxWidth: 400, 
                height: "auto", 
                padding: 2, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "space-between", 
            }}>
                <img src="./MMMLogo.png" alt="MMM Logo" style={{ width: "30%", borderRadius: 8, marginBottom: 16 }} />
            </Box>
            <Paper sx={{ p: '3em' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'green' }}>
                    Edit Lender Information
                </Typography>
                <Typography variant="subtitle1">
                    Update your <em>Portfolio</em> and <strong>EXPAND!</strong>
                </Typography>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={editLender.email} 
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Business Name"
                            name="business_name"
                            value={editLender.business_name}  
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={editLender.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={handleTogglePassword}>
                                        {showPassword ? "Hide" : "Show"}
                                    </Button>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={handleToggleConfirmPassword}>
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </Button>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ 
                                backgroundColor: 'green',
                                '&:hover': {
                                    backgroundColor: 'darkgreen',
                                }
                            }}
                        >
                            Update Information
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            fullWidth
                            sx={{
                                color: 'black',
                                border: '1px solid gray',
                                '&:hover': {
                                    background: 'black',
                                    color: 'white'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
