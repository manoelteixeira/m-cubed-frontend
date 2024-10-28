import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileMenuIcon = ({ setUser, setToken }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const DEFAULT_IMAGE = "https://picsum.photos/200/300"; 

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const credentials = JSON.parse(localStorage.getItem("credentials"));
        if (!credentials) return;

        setUserType(credentials.user_type);

        
        const response = await fetch(`${API}/${credentials.user_type}/profile-pic`, {
          headers: { Authorization: `Bearer ${credentials.token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setProfilePic(data.imageUrl || DEFAULT_IMAGE); 
        } else {
          setProfilePic(DEFAULT_IMAGE); 
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setProfilePic(DEFAULT_IMAGE); 
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfileClick = () => {
    const route = userType === "borrower" ? "/borrowers/:id/edit" : "/lenders/:id/edit";
    navigate(route);
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("credentials");
    navigate("/");
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
        <Avatar src={profilePic} alt="Profile Picture" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleUpdateProfileClick}>Update Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

ProfileMenuIcon.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default ProfileMenuIcon;
