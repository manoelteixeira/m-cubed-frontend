import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileMenuIcon = ({ setUser, setToken }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("credentials"))
  );

  const navigate = useNavigate();

  const DEFAULT_IMAGE = "https://picsum.photos/200/300";

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    setProfilePic(localUser.user.image_url || DEFAULT_IMAGE);
  }, [localUser]);

  const handleUpdateProfileClick = () => {
    const route =
      userType === "borrower" ? "/borrowers/:id/edit" : "/lenders/:id/edit";
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
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
