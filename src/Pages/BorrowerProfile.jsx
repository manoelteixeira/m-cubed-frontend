import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const API = import.meta.env.VITE_BASE_URL;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function BorrowerProfile({ user, token }) {
  const [profile, setProfile] = useState(null);
  const [creditReport, setCreditReport] = useState(null);

  useState(() => {
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/borrowers/${user.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        const { borrower, credit_reports } = data;
        setProfile(borrower);
        setCreditReport(credit_reports[0]);
      })
      .catch((err) => console.log(err));
  }, [user]);

  if (!profile) {
    return <>Loading...</>;
  } else {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f4f6f8",
          p: 5,
        }}
      >
        <Grid container spacing={4} sx={{ p: 2 }}>
          {/* Profile Picture and Name */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
                boxShadow: 3,
              }}
            >
              <Avatar
                src={profile.image_url}
                alt={profile.business_name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                <strong>{profile.business_name}</strong>
              </Typography>
            </Card>
          </Grid>

          {/* Business Information */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h4" textAlign="center" gutterBottom>
                  Business Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>City:</strong> {profile.city}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Street:</strong> {profile.street}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>State:</strong> {profile.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Zip Code:</strong> {profile.zip_code}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Phone:</strong> {profile.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>EIN:</strong> {profile.ein}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Start Date:</strong>{" "}
                      {new Date(profile.start_date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Industry:</strong> {profile.industry}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profile.email}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Credit Report */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{ display: "flex", alignItems: "center", p: 3, boxShadow: 3 }}
            >
              <Box textAlign="center">
                <Typography variant="h4" gutterBottom>
                  Credit Report
                </Typography>
                <Gauge
                  width={200}
                  height={200}
                  value={creditReport.score}
                  startAngle={-110}
                  endAngle={110}
                  valueMin={300}
                  valueMax={850}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 25,
                      transform: "translate(0px, -10px)",
                    },
                  }}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </Box>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="body1">
                  <strong>Credit Bureau:</strong> {creditReport.credit_bureau}
                </Typography>
                <Typography variant="body1">
                  <strong>Report ID:</strong> #{creditReport.report_id}
                </Typography>
                <Typography variant="body1">
                  <strong>Created At:</strong>{" "}
                  {new Date(creditReport.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Expire At:</strong>{" "}
                  {new Date(creditReport.expire_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Documents */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h4" textAlign="center" gutterBottom>
                Documents
              </Typography>
              <Box textAlign="center">
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Item>Drives Liscense</Item>
                  <Item>Secretary of State Report</Item>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

BorrowerProfile.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
