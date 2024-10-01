import React from "react";
import { useParams } from "react-router-dom";
import { AppBar, Toolbar, Button, Menu, MenuItem, Link } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { id }= useParams()

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
        <Button
          color="inherit"
          href={`/borrowers/${id}/borrowerdashboard`}
          sx={{ color: "#fff", fontSize: "1rem" }}
        >
          Borrower
        </Button>
        <span style={{ color: "#fff", margin: "0 8px" }}>|</span>
        <Button
          color="inherit"
          href={`/lenders/${id}/lenderdashboard`}
          sx={{ color: "#fff", fontSize: "1rem" }}
        >
          Lender
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          href="/about"
          sx={{ color: "#fff", fontSize: "1rem" }}
        >
          WHY MMM
        </Button>
        <span style={{ color: "#fff", margin: "0 4px" }}>|</span>{" "}
        {/* Reduced margin */}
        <Button
          color="inherit"
          sx={{ color: "#fff", fontSize: "1rem" }}
          href="/meet-the-team"
        >
          MEET THE TEAM
        </Button>
        <Button
          color="inherit"
          variant="outlined"
          onClick={handleDropdownClick}
          endIcon={<ArrowDropDown />}
          sx={{
            borderColor: "#fff",
            color: "#fff",
            marginLeft: 2,
            fontSize: "1rem",
          }}
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
          <MenuItem
            onClick={handleClose}
            sx={{ color: "#000", fontSize: "1rem",}}
          >
            <Link href={`/borrowers/signup`}
            sx={{ 
              textDecoration: 'none',
              color: "#000"          
            }}>Borrower</Link>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{ color: "#000", fontSize: "1rem" }}
          >
          <Link href={`/lenders/signup`}
          sx={{ 
            textDecoration: 'none',
            color: "#000"           
          }}>Lender</Link>

          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
