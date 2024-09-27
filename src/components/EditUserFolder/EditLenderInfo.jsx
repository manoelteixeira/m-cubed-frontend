import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from "@mui/material";
import './NewForm.scss';

const API = import.meta.env.VITE_BASE_URL;

export default function EditLenderForm() {
    const navigate = useNavigate();
    const { lenderId } = useParams(); 
    const [lender, setLender] = useState({
        email: '',
        password: '',
        business_name: ''
    });

    useEffect(() => {
        const getExistingLender = async () => {
            try {
                const response = await axios.get(`${API}/lenders/${lenderId}`);
                setLender(response.data);
            } catch (error) {
                console.error('Error fetching lender data: ', error);
            }
        };

        getExistingLender();
    }, [lenderId]);

    const updateLender = async (lender) => {
        try {
            await axios.put(`${API}/lenders/${lenderId}`, lender, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate(`/lenders/${lenderId}/lenderdashboard`);
        } catch (error) {
            console.error('Error updating lender: ', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLender({
            ...lender,
            [name]: value,
        });
    };

    const handleCancel = () => {
        navigate(`/borrowers/${lenderId}/lenderdashboard`);
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


