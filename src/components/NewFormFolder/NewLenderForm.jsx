import React, {useEffect,useState}from 'react'
import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
import { Box, Typography, Grid, TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import './NewLenderForm.scss'
import {ThemeProvider, createTheme} from '@mui/material';
import MMMLogo from "../../assets/newLogo.png";


const API = import.meta.env.VITE_BASE_URL;


export default function NewLenderForm() {


  const navigate = useNavigate()
const [open, setOpen] = useState(false);


    const [newLender, setNewLender] = useState({
        email:'',
        password:'',
        business_name: ''
    })

    // const createNewLender = async (newLender) => {
    //     try {
    //         const results = await axios.post(`${API}/lenders`, newLender, 
    //            { headers: {'Content-Type': 'application/json',
    //            },
    //         });
    //         const lenderId = results.data.id
    //         // navigate(`lenders/${lenderId}/lenderdashboard`)
    //         } catch (error) {
    //             console.error('Error creating lender: ', error)
    //         }
    // };

    const createNewLender = async (newLender) => {
      try {
          const response = await fetch(`${API}/lenders`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newLender), 
          });
  
          if (!response.ok) {
              throw new Error(`Error creating lender: ${response.statusText}`);
          }
  
          const results = await response.json();
          const lenderId = results.id;
  
          // navigate(`lenders/${lenderId}/lenderdashboard`);
  
      } catch (error) {
          console.error('Error creating lender:', error);
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

      const handleCancel = () => {
        setOpen(true); 
      };
    
      const handleConfirmCancel = () => {
        setOpen(false);
        navigate('/');  
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password, business_name } = newLender;

    if (!email || !password || !business_name) {
        alert("All fields are required");
        return;
    }
        createNewLender(newLender);
      }

      const theme = createTheme({
        palette: {
          primary: {
            main: "#4caf50", 
            contrastText: "#ffffff", 
          },
        },
      });

      // const StyledLink = styled('li')({
      //   textDecoration: 'none',
      //   color: 'inherit',
      //   margin: '0px 16px',
      // });

      return (
        <ThemeProvider theme={theme}>
      <Grid container component={Paper} sx={{ height: "100vh" }}>
        {/* Left Side Panel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            src={MMMLogo}
            alt="MMM Logo"
            className="rotate"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome to MoneyMoneyMoney
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
            Advantages for Lenders:
          </Typography>
          <ul style={{paddingLeft:'120px'}}>
            <li>
              <Typography variant="body2">
                Access to a diverse pool of potential borrowers.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Opportunity to offer competitive rates and terms.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Enhanced visibility and marketing support for your lending
                products.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                Streamlined loan management process through our platform.
              </Typography>
            </li>
          </ul>
        </Grid>

        {/* Right Side Sign-Up Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ width: "100%", maxWidth: 400 }}
            onSubmit={handleSubmit}
          >
            {" "}
            {/* Limit max width for form */}
            <Typography variant="h5" component="h2" gutterBottom>
              Sign Up as a Lender
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              value={newLender.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={newLender.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Business Name"
              variant="outlined"
              value={newLender.business_name}
              onChange={handleChange}
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
              Sign Up
            </Button>
            <Button
          variant="outlined"
          color="inhert"
          onClick={handleCancel}
          fullWidth
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirm Cancellation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"
          >
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="inherit" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
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