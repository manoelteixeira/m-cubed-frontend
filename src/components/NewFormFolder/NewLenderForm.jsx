import React, {useEffect,useState}from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, Box, Typography } from "@mui/material";
import './NewForm.scss'


const API = import.meta.env.VITE_BASE_URL;

export default function NewLenderForm() {
const navigate = useNavigate()

    const [newLender, setNewLender] = useState({
        email:'',
        password:'',
        business_name: ''
    })

    const createNewLender = async (newLender) => {
        try {
            const results = await axios.post(API, newLender, 
               { headers: {'Content-Type': 'application/json',
               },
            });
            const lenderId = results.data.id
            navigate(`lenders/${lenderId}/lenderdashboard`)
            } catch (error) {
                console.error('Error creating lender: ', error)
            }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)

        setNewLender({
          ...newLender,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", newLender);
      };




      return (
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="form-container"
        >
          <Typography variant="h4" component="h2">
            Lender Registration
          </Typography>
          <Typography variant="h1">
            Release the limits to your <em>Portfolio</em> and <strong>EXPAND!</strong>
          </Typography>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={newLender.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newLender.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Business Name"
            name="business_name"
            value={newLender.business_name}
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
            Get Started!
          </Button>
        </Box>
      );

}


// axios({
//     method: 'GET',             // HTTP method (GET, POST, PUT, DELETE, etc.)
//     url: '/some-url',          // The URL to which the request is sent
//     data: {},                  // Data to be sent as the request body (for POST, PUT, PATCH)
//     params: {},                // URL parameters (for GET requests)
//     headers: {                 // Custom headers for the request
//       'Content-Type': 'application/json'
//     },
//     timeout: 1000,             // Timeout in milliseconds
//     responseType: 'json',      // The type of data expected in the response ('json', 'blob', 'text', etc.)
//     auth: {                    // Authentication credentials (for basic authentication)
//       username: 'username',
//       password: 'password'
//     },
//     onUploadProgress: progressEvent => {   // Progress event for upload
//       console.log(progressEvent.loaded);
//     },
//     onDownloadProgress: progressEvent => { // Progress event for download
//       console.log(progressEvent.loaded);
//     }
//   });