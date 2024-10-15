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
import MMMIcon from "../../assets/MMMF6F7F8bground.png";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ setUser, setToken, isAuthenticated }) => {
  const [navButtons, setNavButtons] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSignUpClick = (role) => {
    if (role === "borrower") {
      navigate("/borrowers/signup");
    } else if (role === "lender") {
      navigate("/lenders/signup");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("credentials");
    navigate("/");
  };

  const handleDashboardClick = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    const userType = credentials.user_type;
    navigate(`/${userType}`);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname == "/") {
      if (isAuthenticated) {
        setNavButtons(
          <>
            <Button
              variant="outlined"
              onClick={handleDashboardClick}
              sx={{
                borderColor: "#00a250",
                color: "#00a250",
                marginLeft: 2,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              YOUR DASHBOARD
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogoutClick}
              sx={{
                borderColor: "#00a250",
                color: "#00a250",
                marginLeft: 2,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              LOG OUT
            </Button>
          </>
        );
      } else {
        setNavButtons(
          <>
            <>
              <Button
                variant="outlined"
                onClick={() => handleSignUpClick("borrower")}
                sx={{
                  borderColor: "#00a250",
                  color: "#00a250",
                  marginLeft: 2,
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                SIGN UP BORROWER
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleSignUpClick("lender")}
                sx={{
                  borderColor: "#00a250",
                  color: "#00a250",
                  marginLeft: 2,
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                SIGN UP LENDER
              </Button>

              <Button
                variant="outlined"
                onClick={handleLoginClick}
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
            </>
          </>
        );
      }
    } else if (pathname.includes("signup")) {
      setNavButtons(
        <>
          <Button
            variant="outlined"
            onClick={handleLoginClick}
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
        </>
      );
    } else if (!pathname.includes("login")) {
      setNavButtons(
        <>
          <Button
            variant="outlined"
            onClick={handleLogoutClick}
            sx={{
              borderColor: "#00a250",
              color: "#00a250",
              marginLeft: 2,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            LOG OUT
          </Button>
        </>
      );
    } else {
      setNavButtons(<></>);
    }
  }, [location]);

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
        {/* Logo */}
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

        {/* Tagline next to the Logo */}
        <Typography
          variant="subtitle1"
          sx={{
            color: "#00a250",
            marginLeft: 1,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Here at MMM, we are obsessed with getting you funded.
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {navButtons}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default NavBar;
