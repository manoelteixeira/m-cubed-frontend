import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MockFICO() {
  const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    console.log(savedInfo);
  }, [savedInfo]);

  const handleBackToDashboard = () => {
    navigate("/lender");
  };

  const handleGoToDriverLicense = () => {
    navigate("/mock-drivers-license");
  };

  const handleGoToSOS = () => {
    navigate("/mock-sos-certificate");
  };

  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          width: "100%",
          color: "#00a250",
          backgroundColor: "#f6f7f8",
          py: 2,
          borderRadius: 1,
        }}
      >
        Credit Report
      </Typography>

      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Name
              </Typography>
              <Typography variant="body1">
                {savedInfo
                  ? savedInfo.business_name
                  : "No Business Name Available"}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Credit Report
              </Typography>
              <img
                src="./MOCKFICOscore.png"
                alt="FICO"
                style={{
                  width: "100%",
                  height: "auto",
                  cursor: "pointer",
                  borderRadius: 4,
                  marginBottom: 16,
                }}
                onClick={() => {
                  // Zoom functionality
                  const img = document.createElement("img");
                  img.src = "./MOCKFICOscore.png";
                  img.style.maxWidth = "90%";
                  img.style.maxHeight = "90%";
                  img.style.position = "fixed";
                  img.style.top = "50%";
                  img.style.left = "50%";
                  img.style.transform = "translate(-50%, -50%)";
                  img.style.zIndex = "1000";
                  img.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

                  const overlay = document.createElement("div");
                  overlay.style.position = "fixed";
                  overlay.style.top = 0;
                  overlay.style.left = 0;
                  overlay.style.width = "100%";
                  overlay.style.height = "100%";
                  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                  overlay.style.display = "flex";
                  overlay.style.alignItems = "center";
                  overlay.style.justifyContent = "center";
                  overlay.style.zIndex = "999";

                  overlay.appendChild(img);
                  overlay.onclick = () => {
                    document.body.removeChild(overlay);
                  };

                  document.body.appendChild(overlay);
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={handleGoToDriverLicense}
                sx={{
                  backgroundColor: "#00a250",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#008f40" },
                  flexGrow: 1,
                  marginRight: 1,
                }}
              >
                View Driver's License
              </Button>
              <Button
                variant="contained"
                onClick={handleGoToSOS}
                sx={{
                  backgroundColor: "#00a250",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#008f40" },
                  flexGrow: 1,
                  marginLeft: 1,
                }}
              >
                View Secretary of State Certificate
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Back to Dashboard Button */}
      <Button
        variant="contained"
        onClick={handleBackToDashboard}
        sx={{
          mt: 4,
          backgroundColor: "#00a250",
          color: "#fff",
          "&:hover": { backgroundColor: "#008f40" },
        }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}

// import React, { useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function MockFICO() {
//   const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(savedInfo);
//   }, [savedInfo]);

//   const handleBackToDashboard = () => {
//     navigate("/lender");
//   };

//   const handleGoToDriverLicense = () => {
//     navigate("/mock-drivers-license");
//   };

//   const handleGoToSOS = () => {
//     navigate("/mock-sos-certificate");
//   };

//   return (
//     <Box sx={{ margin: 10 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{
//           width: "100%",
//           color: "#00a250",
//           backgroundColor: "#f6f7f8",
//           py: 2,
//           borderRadius: 1,
//         }}
//       >
//         Credit Report
//       </Typography>

//       <Grid container spacing={4} alignItems="center" justifyContent="center">
//         <Grid item xs={12} md={6}>
//           <Card sx={{ boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Business Name
//               </Typography>
//               <Typography variant="body1">
//                 {savedInfo
//                   ? savedInfo.business_name
//                   : "No Business Name Available"}
//               </Typography>
//             </CardContent>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Credit Report
//               </Typography>
//               <img
//                 src="./MOCKFICOscore.png"
//                 alt="FICO"
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   cursor: "pointer",
//                   borderRadius: 4,
//                   marginBottom: 16,
//                 }}
//                 onClick={() => {
//                   // Zoom functionality
//                   const img = document.createElement("img");
//                   img.src = "./MOCKFICOscore.png";
//                   img.style.maxWidth = "90%";
//                   img.style.maxHeight = "90%";
//                   img.style.position = "fixed";
//                   img.style.top = "50%";
//                   img.style.left = "50%";
//                   img.style.transform = "translate(-50%, -50%)";
//                   img.style.zIndex = "1000";
//                   img.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

//                   const overlay = document.createElement("div");
//                   overlay.style.position = "fixed";
//                   overlay.style.top = 0;
//                   overlay.style.left = 0;
//                   overlay.style.width = "100%";
//                   overlay.style.height = "100%";
//                   overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
//                   overlay.style.display = "flex";
//                   overlay.style.alignItems = "center";
//                   overlay.style.justifyContent = "center";
//                   overlay.style.zIndex = "999";

//                   overlay.appendChild(img);
//                   overlay.onclick = () => {
//                     document.body.removeChild(overlay);
//                   };

//                   document.body.appendChild(overlay);
//                 }}
//               />
//             </CardContent>
//             <CardActions>
//               <Button
//                 variant="contained"
//                 onClick={handleGoToDriverLicense}
//                 sx={{
//                   backgroundColor: "#00a250",
//                   color: "#fff",
//                   "&:hover": { backgroundColor: "#008f40" },
//                   flexGrow: 1,
//                   marginRight: 1,
//                 }}
//               >
//                 View Driver's License
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleGoToSOS}
//                 sx={{
//                   backgroundColor: "#00a250",
//                   color: "#fff",
//                   "&:hover": { backgroundColor: "#008f40" },
//                   flexGrow: 1,
//                   marginLeft: 1,
//                 }}
//               >
//                 View Secretary of State Certificate
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       </Grid>

//       <Button
//         variant="contained"
//         onClick={handleBackToDashboard}
//         sx={{
//           mt: 4,
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
