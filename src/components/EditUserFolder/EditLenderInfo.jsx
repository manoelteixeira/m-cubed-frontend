import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from "@mui/material";

const API = import.meta.env.VITE_BASE_URL;

export default function EditLenderForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [lender, setLender] = useState({
        email: '',
        password: '',
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
            if (!response.ok) {
                throw new Error('Error updating lender');
            }
            return response.json();
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

        const { email, password, business_name } = lender;

        if (!email || !password || !business_name) {
            alert("All fields are required");
            return;
        }
        updateLender(lender);
    };

    useEffect(()=>{
        fetch(`${API}/lenders/${id}`)
        .then(res=>res.json())
        .then(res=> {
            setLender(res)
        })
        .catch(err=> console.error(err))
    },[id])

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="form-container"
        >
            <Typography variant="h4" component="h2">
                Edit Lender Information
            </Typography>
            <Typography variant="h1">
                Update your <em>Portfolio</em> and <strong>EXPAND!</strong>
            </Typography>
            <TextField
                label="Email"
                name="email"
                type="email"
                value={lender.email}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={lender.password}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Business Name"
                name="business_name"
                value={lender.business_name}
                onChange={handleChange}
                fullWidth
                required
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
            >
                Update Information
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                fullWidth
            >
                Cancel
            </Button>
        </Box>
    );
}
