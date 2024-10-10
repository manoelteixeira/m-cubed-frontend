import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import MMMLogo from '../../assets/MMMLogo.png';

const API = import.meta.env.VITE_BASE_URL;

export default function EditLenderForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [lender, setLender] = useState({
        email: '',
        business_name: ''
    });
    
    const updateLender = (lender) => {
        fetch(`${API}/lenders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lender),
        })
        .then(response => {
           response.json();
        })
        .then(() => {
            navigate(`/lenders/${id}/lenderdashboard`);
        })
        .catch(error => {
            console.error('Error updating lender: ', error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLender({
            ...lender,
            [name]: value,
        });
    };

    const handleCancel = () => {
        navigate(`/lenders/${id}/lenderdashboard`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, business_name } = lender;

        if (!email || !business_name) {
            alert("All fields are required");
            return;
        }
        updateLender(lender);
    };

    useEffect(()=>{
        fetch(`${API}/lenders/${id}`)
        .then(res => res.json())
        .then(res => {
            
            setLender({
                email: res.email ?? '',
                business_name: res.business_name ?? ''
            });
        })
        .catch(err => console.error(err));
    }, [id]);

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
                <img src={MMMLogo} alt="Product Placeholder" style={{ width: "30%", borderRadius: 8, marginBottom: 16 }} />
            </Box>
            <Paper sx={{ p: '3em' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'green' }}>
                    Edit Lender Information
                </Typography>
                <Typography variant="h7">
                    Update your <em>Portfolio</em> and <strong>EXPAND!</strong>
                </Typography>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={lender.email ?? ''} 
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
                            value={lender.business_name ?? ''}  
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                    </Grid>
                </Grid>

                <Grid display={'flex'}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ 
                          mt: 2, 
                          width: '50%', 
                          backgroundColor: 'green' 
                        }}
                    >
                        Update Information
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCancel}
                        sx={{
                            mt: 2,
                            ml: 2,
                            width: '50%',
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
            </Paper>
        </Box>
    );
}
