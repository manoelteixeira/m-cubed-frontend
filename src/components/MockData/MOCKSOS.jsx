import { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MOCKSOS() {
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

  const handleGoToDriverLicense = () => {
    navigate("/mock-drivers-license");
  };

  return (
    <Box sx={{ margin: "40px auto", maxWidth: "800px", textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#00a250",
            backgroundColor: "#fff",
            borderRadius: 2,
            py: 2,
          }}
        >
          Secretary of State Certification
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <img
                  src="./MOCKStateOfSecretary.png"
                  alt="SOS"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    cursor: "pointer",
                    borderRadius: 5,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={handleOpen}
                />
              </CardContent>
            </Card>
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
              src="./MOCKStateOfSecretary.png"
              alt="SOS"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: 5,
              }}
            />
          </Box>
        </Dialog>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleGoToCreditReport}
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": { backgroundColor: "#008f40" },
                margin: "0 10px",
              }}
            >
              View Credit Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleGoToDriverLicense}
              sx={{
                backgroundColor: "#00a250",
                color: "#fff",
                "&:hover": { backgroundColor: "#008f40" },
                margin: "0 10px",
              }}
            >
              View Driver's License
            </Button>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleBackToDashboard}
          sx={{
            mt: 3,
            backgroundColor: "#00a250",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#008f40" },
          }}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
