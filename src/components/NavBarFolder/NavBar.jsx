import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../../assets/logo.jpeg";
import QRCodeComponent from "../QRCodeComponent";

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  margin: '0px 16px',
});

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src={logo} alt="MMM Logo" style={{ height: '40px' }} />
        </IconButton>
        <div style={{ flexGrow: 1, display:'flex', justifyContent:'center', gap:'40px'}}>
          <StyledLink to="/">
            <Typography variant="body1">Home</Typography>
          </StyledLink>
          <StyledLink to="/services">
            <Typography variant="body1">Services</Typography>
          </StyledLink>
          <StyledLink to="/listings">
            <Typography variant="body1">Listings</Typography>
          </StyledLink>
          <StyledLink to="/about">
            <Typography variant="body1">About</Typography>
          </StyledLink>
        </div>
        <div>
          <StyledLink to="/login">
            <Button color="inherit">Log In</Button>
          </StyledLink>
          <StyledLink to="/signup">
            <Button color="inherit">Sign Up</Button>
          </StyledLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}

