// import React from "react";
// import {
//   Box,
//   Typography,
//   Link,
//   Container,
//   Grid,
// } from "@mui/material";
// import QRCodeComponent from "../QRCodeComponent";
// import SubscribeForm from "../SubscribeForm";

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#00a250",
//         color: "#f6f7f8",
//         padding: "20px 0",
//         zIndex: 10,
//       }}
//     >
//       <Container>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom>
//               About Us
//             </Typography>
//             <Typography variant="body2">
//               We are committed to helping small businesses access the capital
//               they need to thrive. Our platform connects borrowers with lenders,
//               simplifying the financing process.
//             </Typography>
//             <Link
//               href="/about"
//               sx={{ color: "#f6f7f8", textDecoration: "underline" }}
//             >
//               Learn more
//             </Link>
//           </Grid>

//           {/* Subscribe Section */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom>
//               Subscribe to Our Mailing List
//             </Typography>
//             <Typography variant="body2" sx={{ marginBottom: 2 }}>
//               Stay updated about our launch and get the latest news.
//             </Typography>
//             <SubscribeForm /> {/* Burada SubscribeForm'u kullanıyoruz */}
//           </Grid>

//           {/* QR Code Section */}
//           <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <QRCodeComponent size={150} />
//           </Grid>
//         </Grid>
//         <Typography variant="body2" align="center" sx={{ marginTop: "20px" }}>
//           © {new Date().getFullYear()} MoneyMoneyMoney. All rights reserved.
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";
import SubscribeForm from "../SubscribeForm";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#00a250",
        color: "#f6f7f8",
        padding: "40px 0",
        zIndex: 10,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Meet The Team Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 1 }}>
              <Link
                href="/about"
                sx={{
                  color: "#f6f7f8",
                  textDecoration: "underline",
                  fontWeight: 700,
                }}
              >
                Meet The Team
              </Link>
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              We are committed to helping small businesses access the capital
              they need to thrive. Our platform connects borrowers with lenders,
              simplifying the financing process.
            </Typography>
          </Grid>

          {/* Subscribe Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Subscribe to Our Mailing List
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Stay updated about our launch and get the latest news.
            </Typography>

            {/* Styled Subscribe Form */}
            <SubscribeForm />
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "40px", fontSize: "14px" }}
        >
          © {new Date().getFullYear()} MoneyMoneyMoney. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
