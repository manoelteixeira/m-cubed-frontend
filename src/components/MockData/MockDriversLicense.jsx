import { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  Grid,
  Avatar,
  Paper,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MOCKDriversLicense() {
  const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBackToDashboard = () => {
    navigate("/lender");
  };

  const handleGoToCreditReport = () => {
    navigate("/mock-fico-score");
  };

  const handleGoToSOS = () => {
    navigate("/mock-sos-certificate");
  };

  return (
    <Box sx={{ margin: "40px auto", maxWidth: "800px", textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: 3, position: "relative" }}>
        {/* <Avatar
          src="./avatar.png"
          alt="Avatar"
          sx={{
            width: 80,
            height: 80,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            top: 0,
          }}
        /> */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#00a250",
            backgroundColor: "#f0f8f0",
            borderRadius: 2,
            py: 2,
            mt: 5,
          }}
        >
          Borrower Driver's License Information
        </Typography>

        {/* Display Business Info and Driver's License */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={12} sm={8}>
            <Card sx={{ boxShadow: 3, padding: 2 }}>
              <CardContent>
                <Typography variant="h6">Business Name</Typography>
                <Typography>{savedInfo.business_name}</Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  License Info
                </Typography>
                <Typography>Issued by: {savedInfo.state}</Typography>
                <Typography>Expiration Date: [Mock Expiration]</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* License Image */}
          <Grid item xs={12} sm={4}>
            <img
              src="./MOCKDriverLicense.png"
              alt="Driver's License"
              style={{
                width: "100%",
                maxWidth: "250px",
                cursor: "pointer",
                borderRadius: 5,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleOpen}
            />
          </Grid>
        </Grid>

        {/* Full-Size Image Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./MOCKDriversLicense.png"
              alt="Driver's License"
              style={{ width: "100%", maxWidth: "600px", borderRadius: 5 }}
            />
          </Box>
        </Dialog>

        {/* Action Buttons */}
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleGoToCreditReport}
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": { backgroundColor: "#008f40" },
              }}
            >
              View Credit Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleGoToSOS}
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": { backgroundColor: "#008f40" },
              }}
            >
              View Secretary of State Certificate
            </Button>
          </Grid>
        </Grid>

        {/* Back to Dashboard Button */}
        <Box sx={{ mt: 5 }}>
          {" "}
          {/* Increased margin-top for spacing */}
          <Button
            variant="contained"
            onClick={handleBackToDashboard}
            sx={{
              backgroundColor: "#00a250",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#008f40" },
              display: "block",
              margin: "0 auto",
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
