import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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
      <div className="borrower-profile">
        <Box
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Grid container spacing={5} sx={{ p: 10 }}>
            {/* Profile Picture and Name */}
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
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
              <Card>
                <CardContent>
                  <Typography variant="h4" textAlign={"center"} gutterBottom>
                    Business Information
                  </Typography>
                  <Grid container spacing={1}>
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
            <Grid item xs={15} md={5}>
              <Card sx={{ padding: 5 }}>
                <Typography variant="h4" textAlign={"center"} gutterBottom>
                  Credit Report
                </Typography>
                <Box display="flex" alignItems="center">
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

                  <CardContent>
                    <Typography variant="body1">
                      <strong>Credit Bureau:</strong>{" "}
                      {creditReport.credit_bureau}
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
                </Box>
              </Card>
            </Grid>
            {/* Documents */}
            <Grid item xs={15} md={5}>
              <Card sx={{ padding: 5 }}>
                <Typography variant="h4" textAlign={"center"} gutterBottom>
                  Documents
                </Typography>
                <Box display="flex" alignItems="center">
                  <Stack spacing={2}>
                    <Item>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

BorrowerProfile.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
