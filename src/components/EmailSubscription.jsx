import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_URL;

export default function EmailSubscriptionForm() {
  const navigate = useNavigate();
  
  const [newsletterUser, setNewsletterUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsletterUser({
      ...newsletterUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form Submitted:', newsletterUser);
    
    try {
      const response = await fetch(`${API}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsletterUser),
      });

      if (response.ok) {
        console.log('User successfully subscribed');
        navigate('/welcome'); // Thank you notification page? 
      } else {
        console.error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5}}>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{display: 'grid',
        justifyContent:'center'}}>
        <Typography variant="h4" gutterBottom textAlign={'center'}>
          Want to be apart of our Exclusive MMM Newsletter? 
        </Typography>
        <Typography variant='h5'>
            Subscribe <em>Today!</em>
        </Typography>  

        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={newsletterUser.first_name}
          onChange={handleChange}
          sx={{ my: 2 }}
          required
        />   
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={newsletterUser.last_name}
          onChange={handleChange}
          sx={{ my: 2 }}
          required
        />       
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={newsletterUser.email}
          onChange={handleChange}
          type="email"
          sx={{ my: 2 }}
          required
        />

    
<Button 
  type="submit" 
  variant="contained" 
  fullWidth
  sx={{ 
    mt: 3, 
    backgroundColor: 'rgb(44, 101, 33)', 
    '&:hover': {
      backgroundColor: 'rgb(30, 80, 25)',
    },
    width: 200,
    textAlign: 'center',
    ml:'30%'
  }}
>
  Subscribe
</Button>
      </Box>
    </Container>
  );
}
