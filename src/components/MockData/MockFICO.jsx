// import React, { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
//   Grid,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function MockFICO() {
//   const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(savedInfo);
//   }, []);

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
//         Borrower FICO Score Information
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
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Business Name</TableCell>
//                 <TableCell>FICO Score</TableCell>
//                 <TableCell>Additional Info</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell>{savedInfo.business_name}</TableCell>
//                 <TableCell>was already displayed before</TableCell>
//                 <TableCell>Info from API I'm assuming?</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </Grid>

//         <Grid item xs={12}>
//           <img
//             src="./MOCKFICOscore.png"
//             alt="FICO"
//             style={{
//               width: "250px",
//               transition: "transform 0.3s",
//               cursor: "pointer",
//               marginLeft: "25%",
//             }}
//           />
//         </Grid>
//       </Grid>
//       <Button
//         variant="contained"
//         onClick={handleBackToDashboard}
//         sx={{
//           mt: 2,
//           backgroundColor: "#00a250",
//           color: "#fff",
//           "&:hover": { backgroundColor: "#008f40" },
//         }}
//       >
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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MockFICO() {
  const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBackToDashboard = () => {
    navigate("/lender");
  };

  // Define color based on credit score range
  const getScoreColor = (score) => {
    if (score >= 750) return "#4CAF50";
    if (score >= 700) return "#8BC34A";
    if (score >= 650) return "#FFC107";
    return "#F44336";
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
          Borrower FICO Score Information
        </Typography>

        {/* Display Business Info and FICO Score */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
          <Grid item xs={12} sm={8}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">Business Name</Typography>
              <Typography>{savedInfo.business_name}</Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                FICO Score
              </Typography>
              <CircularProgress
                variant="determinate"
                value={(savedInfo.fico_score / 850) * 100}
                size={100}
                thickness={5}
                sx={{ color: getScoreColor(savedInfo.fico_score), mt: 1 }}
              />
              <Typography
                variant="h5"
                sx={{ color: getScoreColor(savedInfo.fico_score) }}
              >
                {savedInfo.fico_score}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Score Level
              </Typography>
              <Typography>
                {savedInfo.fico_score >= 750
                  ? "Excellent"
                  : savedInfo.fico_score >= 700
                  ? "Good"
                  : savedInfo.fico_score >= 650
                  ? "Fair"
                  : "Poor"}
              </Typography>
            </Box>
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
              src="./MOCKFICOscore.png"
              alt="FICO"
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
