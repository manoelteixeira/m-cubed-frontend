import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import MMMIcon from "../../assets/MMMlogo.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f6f7f8",
        padding: "0 16px",
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="mmm logo"
          onClick={handleLogoClick}
          sx={{
            color: "#00a250",
            marginRight: 2,
            borderRadius: 0,
            padding: 0,
          }}
        >
          <img
            src={MMMIcon}
            alt="MMM Logo"
            style={{ width: 40, height: 40, borderRadius: 0 }}
          />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          variant="outlined"
          onClick={handleDropdownClick}
          endIcon={<ArrowDropDown />}
          sx={{
            borderColor: "#00a250",
            color: "#00a250",
            marginLeft: 2,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          LOG IN
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
            sx={{ color: "#000", fontSize: "1rem" }}
          >
            Borrower
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{ color: "#000", fontSize: "1rem" }}
          >
            Lender
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
