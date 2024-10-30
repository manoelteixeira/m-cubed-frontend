import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileMenuIcon from "./ProfileMenuIcon.jsx";

const NavBar = ({ setUser, setToken, isAuthenticated }) => {
  const [navButtons, setNavButtons] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");
  const handleDashboardClick = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials) navigate(`/${credentials.user_type}`);
  };

  const handleSignUpClick = (role) => navigate(`/${role}/signup`);
  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("credentials");
    navigate("/");
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") {
      setNavButtons(
        isAuthenticated ? (
          <>
            <Button
              variant="outlined"
              onClick={handleDashboardClick}
              sx={buttonStyles}
            >
              DASHBOARD
            </Button>
            {/* <Button
              variant="outlined"
              onClick={handleLogoutClick}
              sx={buttonStyles}
            >
              LOG OUT
            </Button> */}
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={() => handleSignUpClick("borrowers")}
              sx={buttonStyles}
            >
              SIGN UP BORROWER
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSignUpClick("lenders")}
              sx={buttonStyles}
            >
              SIGN UP LENDER
            </Button>
            <Button
              variant="outlined"
              onClick={handleLoginClick}
              sx={buttonStyles}
            >
              LOG IN
            </Button>
          </>
        )
      );
    } else if (pathname.includes("signup")) {
      setNavButtons(
        <Button variant="outlined" onClick={handleLoginClick} sx={buttonStyles}>
          LOG IN
        </Button>
      );
    } else if (pathname.includes("dashboard")) {
      setNavButtons(
        <Button
          variant="outlined"
          onClick={handleLogoutClick}
          sx={buttonStyles}
        >
          LOG OUT
        </Button>
      );
    } else {
      setNavButtons(null);
    }
  }, [location, isAuthenticated]);

  const buttonStyles = {
    borderColor: "#00a250",
    color: "#00a250",
    marginLeft: 2,
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#f6f7f8", padding: "0 16px" }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="mmm logo"
          onClick={handleLogoClick}
          sx={{ color: "#00a250", marginRight: 2, padding: 0 }}
        >
          <img
            src="/MMMF6F7F8bground.png"
            alt="MMM Logo"
            style={{ width: 40, height: 40 }}
          />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#00a250",
            marginLeft: 1,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Here at MMM, we&apos;re obsessed with getting you funded.
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {navButtons}
        {isAuthenticated && (
          <ProfileMenuIcon setUser={setUser} setToken={setToken} />
        )}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavBar;
