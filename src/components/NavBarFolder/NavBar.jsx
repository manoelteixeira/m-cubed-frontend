import PropTypes from "prop-types";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MMMIcon from "../../assets/MMMF6F7F8bground.png";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ setUser, setToken, isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSignUpClick = (role) => {
    if (role === "borrower") {
      navigate("/borrowers/signup");
    } else if (role === "lender") {
      navigate("/lenders/signup");
    }
    handleCloseMenu();
  };

  const handleLoginClick = () => {
    navigate("/login");
    handleCloseMenu();
  };

  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("credentials");
    navigate("/");
    handleCloseMenu();
  };

  const handleDashboardClick = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    const userType = credentials?.user_type;
    if (userType) {
      navigate(`/${userType}`);
    } else {
      navigate("/");
    }
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderNavButtons = () => {
    if (isAuthenticated) {
      return isMobile ? (
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={handleOpenMenu}
          sx={{
            color: "#00a250",
            border: "2px solid #00a250",
            borderRadius: "50%",
            padding: "12px",
<<<<<<< HEAD
            "&:hover": {
=======
            '&:hover': {
>>>>>>> origin/dev
              backgroundColor: "#e6f7ef",
            },
          }}
        >
<<<<<<< HEAD
          <MenuIcon />
=======
          <MenuIcon/>
>>>>>>> origin/dev
        </IconButton>
      ) : (
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
      return isMobile ? (
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
<<<<<<< HEAD
          <Typography
=======
        <Typography
>>>>>>> origin/dev
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
<<<<<<< HEAD
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleOpenMenu}
            sx={{
              color: "#00a250",
              border: "2px solid #00a250",
              borderRadius: "50%",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#e6f7ef",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
=======
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={handleOpenMenu}
          sx={{
            color: "#00a250",
            border: "2px solid #00a250",
            borderRadius: "50%",
            padding: "8px",
            '&:hover': {
              backgroundColor: "#e6f7ef",
            },
          }}
          >
          <MenuIcon />
        </IconButton>
          </div>
>>>>>>> origin/dev
      ) : (
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
            Find a Lender
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
            Find a Borrower
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
      );
    }
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
<<<<<<< HEAD
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
=======
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
>>>>>>> origin/dev
        <IconButton
          edge="start"
          aria-label="mmm logo"
          onClick={handleLogoClick}
          sx={{
            color: "#00a250",
            borderRadius: 0,
            padding: 0,
          }}
        >
          <img
            src={ MMMIcon }
            alt="MMM Logo"
            style={{ width: 40, height: 40, borderRadius: 0 }}
          />
        </IconButton>

        {!isMobile && (
          <Typography
            variant="subtitle1"
            sx={{
              color: "#00a250",
              fontSize: "1rem",
              fontWeight: "bold",
<<<<<<< HEAD
              textAlign: "center",
=======
              textAlign: 'center',
>>>>>>> origin/dev
            }}
          >
            Here at MMM, we are obsessed with getting you funded.
          </Typography>
        )}

<<<<<<< HEAD
        <Box>{renderNavButtons()}</Box>
=======
        <Box>
          {renderNavButtons()}
        </Box>
>>>>>>> origin/dev
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
<<<<<<< HEAD
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
=======
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
>>>>>>> origin/dev
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
<<<<<<< HEAD
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
=======
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
>>>>>>> origin/dev
              top: 0,
              right: 14,
              width: 10,
              height: 10,
<<<<<<< HEAD
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
=======
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
>>>>>>> origin/dev
              zIndex: 0,
            },
          },
        }}
<<<<<<< HEAD
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isAuthenticated
          ? [
              <MenuItem
                key="dashboard"
                onClick={handleDashboardClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d9d9d9",
                    color: "#00a250",
                  },
                }}
              >
                YOUR DASHBOARD
              </MenuItem>,
              <MenuItem
                key="logout"
                onClick={handleLogoutClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d9d9d9",
                    color: "#00a250",
                  },
                }}
              >
                LOG OUT
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="borrower"
                onClick={() => handleSignUpClick("borrower")}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d9d9d9",
                    color: "#00a250",
                  },
                }}
              >
                Find a Lender
              </MenuItem>,
              <MenuItem
                key="lender"
                onClick={() => handleSignUpClick("lender")}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d9d9d9",
                    color: "#00a250",
                  },
                }}
              >
                Find a Borrower
              </MenuItem>,
              <MenuItem
                key="login"
                onClick={handleLoginClick}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d9d9d9",
                    color: "#00a250",
                  },
                }}
              >
                LOG IN
              </MenuItem>,
            ]}
=======
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthenticated ? [
          <MenuItem 
            key="dashboard"
            onClick={handleDashboardClick}
            sx={{
              '&:hover': {
                backgroundColor: '#d9d9d9',
                color: '#00a250',
              },
            }}
          >
            YOUR DASHBOARD
          </MenuItem>,
          <MenuItem 
            key="logout"
            onClick={handleLogoutClick}
            sx={{
              '&:hover': {
                backgroundColor: '#d9d9d9',
                color: '#00a250',
              },
            }}
          >
            LOG OUT
          </MenuItem>
        ] : [
          <MenuItem 
            key="borrower"
            onClick={() => handleSignUpClick("borrower")}
            sx={{
              '&:hover': {
                backgroundColor: '#d9d9d9',
                color: '#00a250',
              },
            }}
          >
            Find a Lender
          </MenuItem>,
          <MenuItem 
            key="lender"
            onClick={() => handleSignUpClick("lender")}
            sx={{
              '&:hover': {
                backgroundColor: '#d9d9d9',
                color: '#00a250',
              },
            }}
          >
            Find a Borrower
          </MenuItem>,
          <MenuItem 
            key="login"
            onClick={handleLoginClick}
            sx={{
              '&:hover': {
                backgroundColor: '#d9d9d9',
                color: '#00a250',
              },
            }}
          >
            LOG IN
          </MenuItem>
        ]}
>>>>>>> origin/dev
      </Menu>
    </AppBar>
  );
};

NavBar.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavBar;
