// import { useEffect, useState } from "react";
// import { Box, Typography, Grid, Dialog, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function MockDriversLicense() {
//   const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(savedInfo);
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleBackToDashboard = () => {
//     navigate("/lender");
//   };

//   return (
//     <Box sx={{ margin: 10 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{ width: "100%", color: "green", backgroundColor: "white", py: 2 }}
//       >
//         Borrower Driver's License Information
//       </Typography>

//       <Grid
//         container
//         spacing={2}
//         alignItems="center"
//         justifyContent="center"
//         display={"grid"}
//         sx={{ mt: 5 }}
//       >
//         <Grid item xs={12}>
//           <img
//             src="./MOCKDriverLicense.png"
//             alt="Drivers License"
//             style={{
//               width: "250px",
//               transition: "transform 0.3s",
//               cursor: "pointer",
//               marginLeft: "15%",
//             }}
//             onClick={handleOpen}
//           />
//         </Grid>
//       </Grid>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="dialog-title"
//         aria-describedby="dialog-description"
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             p: 4,
//           }}
//         >
//           <img
//             src="./MOCKDriverLicense.png"
//             alt="Drivers License"
//             style={{
//               width: "500px",
//               transition: "transform 0.3s",
//               cursor: "pointer",
//               transform: "scale(1.2)",
//             }}
//           />
//         </Box>
//       </Dialog>
//       <Button variant="contained" onClick={handleBackToDashboard}
//       sx={{
//         mt: 2,
//         backgroundColor: "#00a250",
//         color: "#fff",
//         "&:hover": { backgroundColor: "#008f40" },
//       }}>
//         Back to Dashboard
//       </Button>
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  Grid,
  Avatar,
  Paper,
  Button,
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

  return (
    <Box sx={{ margin: "40px auto", maxWidth: "800px", textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: 3, position: "relative" }}>
        <Avatar
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
        />
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
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">Business Name</Typography>
              <Typography>{savedInfo.business_name}</Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                License Info
              </Typography>
              <Typography>Issued by: {savedInfo.state}</Typography>
              <Typography>Expiration Date: [Mock Expiration]</Typography>
            </Box>
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
