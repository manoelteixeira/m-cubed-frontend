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
import { Avatar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import MMMIcon from "../../assets/MMMF6F7F8bground.png";
import { useNavigate, useLocation } from "react-router-dom";


const NavBar = ({ setUser, setToken, isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null); 
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
    handleCloseProfileMenu();
  };

  const handleDashboardClick = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    const userType = credentials?.user_type;
    if (userType) {
      navigate(`/${userType}`);
    } else {
      navigate("/");
    }
    handleCloseProfileMenu();
  };

  const handleProfileClick = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchor(null);
  };
  const handleProfileEditClick = () => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    const userType = credentials?.user_type;
  
    if (userType === "borrower") {
      navigate("/borrowers/:id/edit");
    } else if (userType === "lender") {
      navigate("/lenders/:id/edit"); 
    }
    handleCloseProfileMenu();
  };

  
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  

  const renderNavButtons = () => {
    if (isAuthenticated) {
      const credentials = JSON.parse(localStorage.getItem("credentials"));
      const userType = credentials?.user_type;

      return (
        <>
          {!isMobile && (
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
          )}

          
          <IconButton
            onClick={handleProfileClick}
            sx={{ marginLeft: 2 }}
          >
            <Avatar alt="Profile Picture" src="https://picsum.photos/200" />
          </IconButton>

          
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleCloseProfileMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
           <MenuItem onClick={handleProfileEditClick}>
            {userType === "borrower" ? "Update Borrower Profile" : "Update Lender Profile"}
           </MenuItem>
            <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
          </Menu>
        </>
      );
    } else {
      return isMobile ? (
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#00a250",
              marginLeft: 2,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Here at MMM, we are obsessed with getting you funded.
          </Typography>
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
            Borrower SignUp
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
            Lender SignUp
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
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Box display="flex" alignItems="center">
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
              src={MMMIcon}
              alt="MMM Logo"
              style={{ width: 40, height: 40, borderRadius: 0 }}
            />
          </IconButton>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#00a250",
              fontSize: "1rem",
              fontWeight: "bold",
              marginLeft: 2,
            }}
          >
            Here at MMM, we are obsessed with getting you funded.
          </Typography>
        </Box>
        <Box>{renderNavButtons()}</Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
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
      </Menu>
    </AppBar>
  );
};

export default NavBar;
