import { useEffect, useState } from "react";
import { Box, Typography, Grid, Dialog, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MockDriversLicense() {
  const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(savedInfo);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBackToDashboard = () => {
    navigate("/lender");
  };

  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ width: "100%", color: "green", backgroundColor: "white", py: 2 }}
      >
        Borrower Driver's License Information
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        display={"grid"}
        sx={{ mt: 5 }}
      >
        <Grid item xs={12}>
          <img
            src="./MOCKDriverLicense.png"
            alt="Drivers License"
            style={{
              width: "250px",
              transition: "transform 0.3s",
              cursor: "pointer",
              marginLeft: "15%",
            }}
            onClick={handleOpen}
          />
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <img
            src="./MOCKDriverLicense.png"
            alt="Drivers License"
            style={{
              width: "500px",
              transition: "transform 0.3s",
              cursor: "pointer",
              transform: "scale(1.2)",
            }}
          />
        </Box>
      </Dialog>
      <Button variant="contained" onClick={handleBackToDashboard}
      sx={{
        mt: 2,
        backgroundColor: "#00a250",
        color: "#fff",
        "&:hover": { backgroundColor: "#008f40" },
      }}>
        Back to Dashboard
      </Button>
    </Box>
  );
}
