// import React from "react";
// import "./Home.scss";
// import { Link } from "react-router-dom";
// import { CardContent, Button, Typography, Card, Grid } from "@mui/material";
// import Slider from "react-slick";
// import { motion } from "framer-motion";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// export default function Home() {
//   const equipmentItems = [
//     "Transportation",
//     "Agricultural",
//     "Construction",
//     "IT & Other Technology",
//     "Industrial",
//     "Manufacturing",
//     "Services",
//   ];

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     vertical: true,
//     verticalSwiping: true,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };

//   return (
//     <main
//       style={{
//         backgroundColor: "#f6f7f8",
//         marginTop: "32px",
//         paddingBottom: "80px",
//       }}
//     >
//       <Grid container spacing={1} justifyContent="center" sx={{ padding: 5 }}>
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           md={6}
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//           }}
//         >
//           <Card
//             sx={{
//               width: "100%",
//               maxWidth: 1200,
//               height: "auto",
//               padding: 0,
//               backgroundColor: "transparent",
//               border: "none",
//               boxShadow: "none",
//               marginLeft: 10,
//               marginRight: 10,
//             }}
//           >
//             <CardContent>
//               <Slider {...settings}>
//                 {equipmentItems.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Typography
//                       variant="h5"
//                       color="black"
//                       sx={{
//                         mb: 2,
//                         p: 2,
//                         textAlign: "left",
//                         fontWeight: "bold",
//                         fontSize: { xs: "2.5rem", sm: "3.5rem" },
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {item}
//                     </Typography>
//                   </motion.div>
//                 ))}
//               </Slider>

//               <Typography
//                 variant="h3"
//                 color="black"
//                 sx={{
//                   fontWeight: "1000",
//                   textAlign: "left",
//                   mt: 0,
//                   ml: 2.5,
//                 }}
//               >
//                 Equipment Financing
//               </Typography>

//               <Typography
//                 variant="h6"
//                 color="black"
//                 sx={{
//                   fontWeight: "bold",
//                   textAlign: "justify",
//                   mb: 1,
//                   mt: 3,
//                   fontSize: "1.2rem",
//                   lineHeight: 1.5,
//                 }}
//               >
//                 <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                   MMM
//                 </span>{" "}
//                 is a game-changing platform designed for businesses seeking
//                 small-ticket equipment financing. With one streamlined
//                 application, minimal credit pulls, and direct access to a
//                 network of lenders—no middlemen—we cut through the noise to
//                 deliver fast, effective financing solutions.
//               </Typography>

//               <Link to="/borrowers/signup" style={{ textDecoration: "none" }}>
//                 <Button
//                   variant="contained"
//                   style={{
//                     backgroundColor: "#00a250",
//                     marginTop: "60px",
//                     padding: "12px",
//                   }}
//                   fullWidth
//                 >
//                   Get Started Today!
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           sm={6}
//           md={6}
//           sx={{ display: "flex", justifyContent: "center", padding: 0 }}
//         >
//           <Card
//             sx={{
//               width: "100%",
//               maxWidth: 400,
//               height: "auto",
//               padding: 2,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "space-between",
//               border: "1px solid #e0e0e0",
//               borderRadius: 2,
//               backgroundColor: "transparent",
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Dashboard Images
//             </Typography>
//             <img
//               src="https://via.placeholder.com/300"
//               alt="Product Placeholder"
//               style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
//             />
//             <img
//               src="src/assets/LenderDashboard.png"
//               alt="Product Placeholder"
//               style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
//             />
//           </Card>
//         </Grid>
//       </Grid>

//       <Grid container spacing={4} justifyContent="center" sx={{ padding: 18 }}>
//         <Grid item xs={12} display="flex" justifyContent="center">
//           <img
//             src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727973657/How_This_Works_1_i0lklb.png"
//             alt="How This Works Image Placeholder"
//             style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
//           />
//         </Grid>

//         <Grid container justifyContent="center" spacing={2}>
//           <Grid item xs={4} sm={4} display="flex" justifyContent="center">
//             <img
//               src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974119/Add_a_heading_500_x_500_px_u3hahd.png"
//               alt="How it works step 1"
//               style={{ width: 400, height: 400, borderRadius: 8 }}
//             />
//           </Grid>
//           <Grid item xs={4} sm={4} display="flex" justifyContent="center">
//             <img
//               src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974117/Add_a_heading_500_x_500_px_1_hl4tvp.png"
//               alt="How it works step 2"
//               style={{ width: 400, height: 400, borderRadius: 8 }}
//             />
//           </Grid>
//           <Grid item xs={4} sm={4} display="flex" justifyContent="center">
//             <img
//               src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974118/Add_a_heading_500_x_500_px_2_f3zlzp.png"
//               alt="How it works step 3"
//               style={{ width: 400, height: 400, borderRadius: 8 }}
//             />
//           </Grid>
//         </Grid>
//       </Grid>

//       <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
//         <Grid item xs={12} display="flex" justifyContent="center">
//           <img
//             src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728576656/How_This_Works_2_tg9j17.png"
//             alt="Why Choose MMM"
//             style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
//           />
//         </Grid>

//         <Grid container justifyContent="center" spacing={2}>
//           <Grid item xs={6} sm={6} display="flex" justifyContent="center">
//             <Link to="/borrowers/signup">
//               <img
//                 src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729523962/Add_a_heading_500_x_500_px_6_yzy8zi.png"
//                 alt="Borrowers"
//                 style={{ width: 600, height: 600, borderRadius: 8 }}
//               />
//             </Link>
//           </Grid>
//           <Grid item xs={6} sm={6} display="flex" justifyContent="center">
//             <Link to="/lenders/signup">
//               <img
//                 src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729523962/Add_a_heading_500_x_500_px_7_yoovqn.png"
//                 alt="Lenders"
//                 style={{ width: 600, height: 600, borderRadius: 8 }}
//               />
//             </Link>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
//         <Grid item xs={12} display="flex" justifyContent="center">
//           <Card
//             sx={{
//               width: "100%",
//               maxWidth: 1200,
//               backgroundColor: "#f6f7f8",
//               borderRadius: 8,
//               boxShadow: "none",
//               padding: "20px",
//               marginBottom: "40px",
//             }}
//           >
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#00a250",
//                     fontSize: "1.8rem",
//                   }}
//                 >
//                   Understanding the $300 Billion Small-Ticket Equipment
//                   Financing Industry
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify", mb: 2 }}
//                 >
//                   The small-ticket equipment financing industry, according to
//                   the Equipment Leasing and Finance Association (ELFA), is
//                   valued at over $300 billion and is growing at a 7.2% CAGR. For
//                   more information, you can access the{" "}
//                   <a
//                     href="https://www.elfaonline.org/knowledge-hub/survey-of-equipment-finance-activity"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ color: "#00a250", textDecoration: "underline" }}
//                   >
//                     ELFA SEFA Survey
//                   </a>{" "}
//                   and the{" "}
//                   <a
//                     href="https://www.nefassociation.org/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{ color: "#00a250", textDecoration: "underline" }}
//                   >
//                     National Equipment Finance Association (NEFA)
//                   </a>
//                   .
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify" }}
//                 >
//                   Businesses face long approval times and high costs due to
//                   intermediaries, but the demand for streamlined, direct
//                   solutions is growing fast as companies look for efficiency.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#00a250",
//                     fontSize: "1.8rem",
//                   }}
//                 >
//                   Transforming Borrowers’ Access to Equipment Financing with{" "}
//                   <span style={{ color: "#00a250" }}>MMM</span>
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify", mb: 2 }}
//                 >
//                   At{" "}
//                   <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                     MMM
//                   </span>
//                   , we provide small businesses with a direct and simple way to
//                   connect with lenders for equipment financing. Borrowers can
//                   benefit from streamlined applications, minimal credit pulls,
//                   and fast approvals, all while avoiding the hassle and cost of
//                   dealing with traditional middlemen.
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify" }}
//                 >
//                   <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                     MMM
//                   </span>{" "}
//                   enables businesses to secure financing for transportation, IT,
//                   industrial equipment, and more—all with competitive rates and
//                   tailored solutions. We help businesses focus on growth, not
//                   bureaucracy.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#00a250",
//                     fontSize: "1.8rem",
//                   }}
//                 >
//                   Powering New Lending Opportunities with{" "}
//                   <span style={{ color: "#00a250" }}>MMM</span> for Lenders
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify", mb: 2 }}
//                 >
//                   <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                     MMM
//                   </span>{" "}
//                   offers lenders access to a pre-qualified borrower pool,
//                   reducing administrative burdens and enabling faster
//                   decision-making. Lenders can view loans that meet their
//                   specific criteria and approve them in just a few clicks,
//                   creating new opportunities in a growing market.
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify" }}
//                 >
//                   With{" "}
//                   <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                     MMM
//                   </span>
//                   , lenders can diversify their portfolios, reduce risk, and
//                   maximize return on investment, all while helping small
//                   businesses thrive.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#00a250",
//                     fontSize: "1.8rem",
//                   }}
//                 >
//                   Our Mission: Empowering Businesses Everywhere with{" "}
//                   <span style={{ color: "#00a250" }}>MMM</span>
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify", mb: 2 }}
//                 >
//                   At{" "}
//                   <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                     MMM
//                   </span>
//                   , we believe in empowering businesses to thrive by making
//                   financing simple, fast, and accessible. Whether you’re a
//                   borrower looking for growth or a lender seeking new
//                   opportunities, our mission is to make the process smoother,
//                   more transparent, and tailored to your needs. Join us on this
//                   mission to simplify financing for everyone!
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#00a250",
//                     fontSize: "1.8rem",
//                   }}
//                 >
//                   Future Features: Get Ready for More with{" "}
//                   <span style={{ color: "#00a250" }}>MMM</span>!
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body1"
//                   color="black"
//                   sx={{ textAlign: "justify", mb: 2 }}
//                 >
//                   We’re just getting started! Keep an eye out for exciting
//                   features like real-time loan tracking, enhanced
//                   borrower-lender messaging, AI-powered document verification,
//                   and more! Want to shape the future of{" "}
//                   <span style={{ color: "#00a250", fontWeight: "bold" }}>
//                     MMM
//                   </span>
//                   ? We’re inviting you to be a part of our journey as we roll
//                   out these exciting updates. Stay tuned—big things are coming!
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           </Card>
//         </Grid>
//       </Grid>
//     </main>
//   );
// }

import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import {
  CardContent,
  Button,
  Typography,
  Card,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BorrowerDashboard from "../../assets/BorrowerDashboard.png";
import LenderDashboard from "../../assets/LenderDashboards.png";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery("(max-width:876px)");

  const equipmentItems = [
    "Transportation",
    "Agricultural",
    "Construction",
    "IT & Other Technology",
    "Industrial",
    "Manufacturing",
    "Services",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <main
      style={{
        backgroundColor: "#f6f7f8",
        marginTop: isMobile ? "16px" : isMedium ? "24px" : "32px",
        paddingBottom: isMobile ? "40px" : isMedium ? "60px" : "80px",
      }}
    >
      <Grid
        container
        spacing={isMobile ? 2 : isMedium ? 3 : 4}
        justifyContent="center"
        sx={{ padding: isMobile ? 2 : isMedium ? 3 : 5 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: isMobile ? 350 : isMedium ? 600 : 1200,
              height: "auto",
              padding: 0,
              backgroundColor: "#fffff",
              border: "none",
              borderRadius: 5,
              boxShadow: "none",
              marginLeft: isMobile ? 5 : isMedium ? 5 : 10,
              marginRight: isMobile ? 0 : isMedium ? 5 : 10,
            }}
          >
            <CardContent sx={{ padding: isMobile ? 2 : isMedium ? 3 : 4 }}>
              <Slider {...settings}>
                {equipmentItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      color="black"
                      sx={{
                        mb: isMobile ? 1 : isMedium ? 1.5 : 2,
                        p: isMobile ? 1 : isMedium ? 1.5 : 2,
                        textAlign: "left",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {item}
                    </Typography>
                  </motion.div>
                ))}
              </Slider>

              <Typography
                variant="h3"
                color="black"
                sx={{
                  fontWeight: "1000",
                  textAlign: "left",
                  mt: 0,
                  ml: isMobile ? 1 : isMedium ? 2 : 2.5,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                }}
              >
                Equipment Financing
              </Typography>

              <Typography
                variant="h6"
                color="black"
                sx={{
                  fontWeight: "bold",
                  textAlign: "justify",
                  mb: 1,
                  mt: isMobile ? 2 : isMedium ? 2.5 : 3,
                  ml: isMobile ? 1 : isMedium ? 2 : 2.5,
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "#00a250", fontWeight: "bold" }}>
                  MMM
                </span>{" "}
                is a game-changing platform designed for businesses seeking
                small-ticket equipment financing. With one streamlined
                application, minimal credit pulls, and direct access to a
                network of lenders—no middlemen—we cut through the noise to
                deliver fast, effective financing solutions.
              </Typography>

              <Link to="/borrowers/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00a250",
                    marginTop: isMobile ? "20px" : isMedium ? "30px" : "40px",
                    padding: isMobile ? "8px" : isMedium ? "10px" : "12px",
                  }}
                  fullWidth
                >
                  Get Started Today!
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: isMobile ? 2 : isMedium ? 3 : 0,
            flexDirection: isMedium ? "column" : "row",
            alignItems: isMedium ? "center" : "flex-start",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: isMobile ? 300 : isMedium ? 400 : 400,
              height: "auto",
              padding: isMobile ? 1 : isMedium ? 2 : 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "fffff",
              marginBottom: isMedium ? 3 : 0,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Dashboard Images
            </Typography>
            <Typography variant="h6" gutterBottom>
              Borrower Dashboard
              <img
                src={BorrowerDashboard}
                alt="Product Placeholder"
                style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
              />
            </Typography>
            <Typography variant="h6" gutterBottom>
              Lender Dashboard
              <img
                src={LenderDashboard}
                alt="Product Placeholder"
                style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
              />
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728576656/How_This_Works_2_tg9j17.png"
            alt="Why Choose MMM"
            style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
          />
        </Grid>

        <Grid container justifyContent="center" spacing={isMobile ? 2 : 2}>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Link to="/borrowers/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728581611/Add_a_heading_500_x_500_px_3_w06vz8.png"
                alt="Borrowers"
                style={{ width: 600, height: 600, borderRadius: 8 }}
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Link to="/lenders/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728583550/Add_a_heading_500_x_500_px_4_zs06zy.png"
                alt="Lenders"
                style={{ width: 600, height: 600, borderRadius: 8 }}
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
      {/* placement for above section */}
      <Grid container spacing={4} justifyContent="center" sx={{ padding: 18 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727973657/How_This_Works_1_i0lklb.png"
            alt="How This Works Image Placeholder"
            style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
          />
        </Grid>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={4} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974119/Add_a_heading_500_x_500_px_u3hahd.png"
              alt="How it works step 1"
              style={{ width: 400, height: 400, borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974117/Add_a_heading_500_x_500_px_1_hl4tvp.png"
              alt="How it works step 2"
              style={{ width: 400, height: 400, borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974118/Add_a_heading_500_x_500_px_2_f3zlzp.png"
              alt="How it works step 3"
              style={{ width: 400, height: 400, borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728576656/How_This_Works_2_tg9j17.png"
            alt="Why Choose MMM"
            style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
          />
        </Grid>

        <Grid container justifyContent="center" spacing={isMobile ? 2 : 2}>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Link to="/borrowers/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728581611/Add_a_heading_500_x_500_px_3_w06vz8.png"
                alt="Borrowers"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: "auto",
                  borderRadius: 8,
                }}
              />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} display="flex" justifyContent="center">
            <Link to="/lenders/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728583550/Add_a_heading_500_x_500_px_4_zs06zy.png"
                alt="Lenders"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: "auto",
                  borderRadius: 8,
                }}
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>

      {/* How This Works Section */}
      <Grid
        container
        spacing={isMobile ? 2 : isMedium ? 3 : 4}
        justifyContent="center"
        sx={{ padding: isMobile ? 2 : isMedium ? 3 : 18 }}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727973657/How_This_Works_1_i0lklb.png"
            alt="How This Works Image Placeholder"
            style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
          />
        </Grid>

        <Grid container justifyContent="center" spacing={isMobile ? 2 : 2}>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974119/Add_a_heading_500_x_500_px_u3hahd.png"
              alt="How it works step 1"
              style={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                borderRadius: 8,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974117/Add_a_heading_500_x_500_px_1_hl4tvp.png"
              alt="How it works step 2"
              style={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                borderRadius: 8,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974118/Add_a_heading_500_x_500_px_2_f3zlzp.png"
              alt="How it works step 3"
              style={{
                width: "100%",
                maxWidth: 400,
                height: "auto",
                borderRadius: 8,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Accordion Section */}
      <Grid
        container
        spacing={isMobile ? 2 : isMedium ? 3 : 4}
        justifyContent="center"
        sx={{ padding: isMobile ? 2 : isMedium ? 3 : 5 }}
      >
        <Grid item xs={12} display="flex" justifyContent="center">
          <Card
            sx={{
              width: "100%",
              maxWidth: 1200,
              backgroundColor: "#f6f7f8",
              borderRadius: 8,
              boxShadow: "none",
              padding: isMobile ? "10px" : isMedium ? "20px" : "20px",
              marginBottom: isMobile ? "20px" : isMedium ? "40px" : "40px",
            }}
          >
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#00a250",
                    fontSize: "1.8rem",
                  }}
                >
                  Understanding the $300 Billion Small-Ticket Equipment
                  Financing Industry
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify", mb: 2 }}
                >
                  The small-ticket equipment financing industry, according to
                  the Equipment Leasing and Finance Association (ELFA), is
                  valued at over $300 billion and is growing at a 7.2% CAGR. For
                  more information, you can access the{" "}
                  <a
                    href="https://www.elfaonline.org/knowledge-hub/survey-of-equipment-finance-activity"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#00a250", textDecoration: "underline" }}
                  >
                    ELFA SEFA Survey
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://www.nefassociation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#00a250", textDecoration: "underline" }}
                  >
                    National Equipment Finance Association (NEFA)
                  </a>
                  .
                </Typography>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify" }}
                >
                  Businesses face long approval times and high costs due to
                  intermediaries, but the demand for streamlined, direct
                  solutions is growing fast as companies look for efficiency.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#00a250",
                    fontSize: "1.8rem",
                  }}
                >
                  Transforming Borrowers’ Access to Equipment Financing with{" "}
                  <span style={{ color: "#00a250" }}>MMM</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify", mb: 2 }}
                >
                  At{" "}
                  <span style={{ color: "#00a250", fontWeight: "bold" }}>
                    MMM
                  </span>
                  , we provide small businesses with a direct and simple way to
                  connect with lenders for equipment financing. Borrowers can
                  benefit from streamlined applications, minimal credit pulls,
                  and fast approvals, all while avoiding the hassle and cost of
                  dealing with traditional middlemen.
                </Typography>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify" }}
                >
                  <span style={{ color: "#00a250", fontWeight: "bold" }}>
                    MMM
                  </span>{" "}
                  enables businesses to secure financing for transportation, IT,
                  industrial equipment, and more—all with competitive rates and
                  tailored solutions. We help businesses focus on growth, not
                  bureaucracy.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#00a250",
                    fontSize: "1.8rem",
                  }}
                >
                  Powering New Lending Opportunities with{" "}
                  <span style={{ color: "#00a250" }}>MMM</span> for Lenders
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify", mb: 2 }}
                >
                  <span style={{ color: "#00a250", fontWeight: "bold" }}>
                    MMM
                  </span>{" "}
                  offers lenders access to a pre-qualified borrower pool,
                  reducing administrative burdens and enabling faster
                  decision-making. Lenders can view loans that meet their
                  specific criteria and approve them in just a few clicks,
                  creating new opportunities in a growing market.
                </Typography>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify" }}
                >
                  With{" "}
                  <span style={{ color: "#00a250", fontWeight: "bold" }}>
                    MMM
                  </span>
                  , lenders can diversify their portfolios, reduce risk, and
                  maximize return on investment, all while helping small
                  businesses thrive.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#00a250",
                    fontSize: "1.8rem",
                  }}
                >
                  Our Mission: Empowering Businesses Everywhere with{" "}
                  <span style={{ color: "#00a250" }}>MMM</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify", mb: 2 }}
                >
                  At{" "}
                  <span style={{ color: "#00a250", fontWeight: "bold" }}>
                    MMM
                  </span>
                  , we believe in empowering businesses to thrive by making
                  financing simple, fast, and accessible. Whether you’re a
                  borrower looking for growth or a lender seeking new
                  opportunities, our mission is to make the process smoother,
                  more transparent, and tailored to your needs. Join us on this
                  mission to simplify financing for everyone!
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#00a250",
                    fontSize: "1.8rem",
                  }}
                >
                  Future Features: Get Ready for More with{" "}
                  <span style={{ color: "#00a250" }}>MMM</span>!
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ textAlign: "justify", mb: 2 }}
                >
                  We’re just getting started! Keep an eye out for exciting
                  features like real-time loan tracking, enhanced
                  borrower-lender messaging, AI-powered document verification,
                  and more! Want to shape the future of{" "}
                  <span style={{ color: "#00a250", fontWeight: "bold" }}>
                    MMM
                  </span>
                  ? We’re inviting you to be a part of our journey as we roll
                  out these exciting updates. Stay tuned—big things are coming!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}
