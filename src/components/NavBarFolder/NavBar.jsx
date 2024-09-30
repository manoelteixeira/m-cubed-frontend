// import React from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import logo from "../../assets/logo.jpeg";

// const StyledLink = styled(Link)({
//   textDecoration: 'none',
//   color: 'inherit',
//   margin: '0px 16px',
// });

// export default function NavBar() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="logo">
//           <img src={logo} alt="MMM Logo" style={{ height: '40px' }} />
//         </IconButton>
//         <div style={{ flexGrow: 1, display:'flex', justifyContent:'center', gap:'40px'}}>
//           <StyledLink to="/">
//             <Typography variant="body1">Home</Typography>
//           </StyledLink>
//           <StyledLink to="/services">
//             <Typography variant="body1">Services</Typography>
//           </StyledLink>
//           <StyledLink to="/listings">
//             <Typography variant="body1">Listings</Typography>
//           </StyledLink>
//           <StyledLink to="/about">
//             <Typography variant="body1">About</Typography>
//           </StyledLink>
//         </div>
//         <div>
//           <StyledLink to="/login">
//             <Button color="inherit">Log In</Button>
//           </StyledLink>
//           <StyledLink to="/signup">
//             <Button color="inherit">Sign Up</Button>
//           </StyledLink>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// }

import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#056612",
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#fff" }}
        >
          WHY MMM
        </Typography>

        <Button
          color="inherit"
          sx={{ marginRight: 2, color: "#fff" }}
          href="/meet-the-team"
        >
          MEET THE TEAM
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          onClick={handleDropdownClick}
          endIcon={<ArrowDropDown />}
          sx={{ borderColor: "#fff", color: "#fff" }}
        >
          OPEN AN ACCOUNT
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose} sx={{ color: "#000" }}>
            Borrower
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: "#000" }}>
            Lender
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
