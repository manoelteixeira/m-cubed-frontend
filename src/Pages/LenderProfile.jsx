import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";

const API = import.meta.env.VITE_BASE_URL;

export default function LenderProfile({ user, token }) {
  const [profile, setProfile] = useState(null);

  useState(() => {
    console.log("ok");
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/lenders/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  if (!profile) {
    return <>Loading...</>;
  } else {
    return (
      <div className="lender-profile">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="#f5f5f5"
        >
          <Card sx={{ width: 1000, padding: 2 }}>
            <Box display="flex" alignItems="center">
              {/* Left side: Profile Picture */}
              <Avatar
                src={profile.image_url} // Replace with actual image URL
                alt="Profile Picture"
                sx={{ width: 200, height: 200, marginRight: 2 }}
              />

              {/* Right side: Business Information */}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h3" textAlign={"center"} gutterBottom>
                  {profile.business_name}
                </Typography>

                {/* Additional Information in a Grid layout */}
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profile.email}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Card>
        </Box>
      </div>
    );
  }
}

LenderProfile.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
