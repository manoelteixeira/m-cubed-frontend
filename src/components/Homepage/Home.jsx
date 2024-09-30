// // src/components/Homepage/Home.jsx
// import React from "react";
// import "./Home.scss";
// import LenderPhoto from "../../assets/LenderPhoto.jpeg";
// import BorrowerPhoto from "../../assets/BorrowerPhoto.jpeg";
// import Handshake from "../../assets/handshake-no-bg.png";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <main className="home-container">
//       <section className="home-container__landing-intro">
//         <div className="first-slide-display">
//           <h1>
//             M-cubed: Borrow <span>Smarter</span>, Lend With{" "}
//             <span>Confidence!</span>{" "}
//           </h1>
//           <div className="btn-email-entry">
//             <p>
//               Sign up for our Newsletter if want to keep updated with all things
//               cubey
//             </p>
//             <input
//               type="text"
//               placeholder="Enter Email Here"
//               name="email-entry"
//             />
//             <button>Sign Up</button>
//             <Link>Already Have an account?</Link>
//           </div>
//         </div>
//         <img src={Handshake} alt="possible-img" id="handshake" />
//       </section>
//       <section className="home-container__badge-names">
//         {/* Horizontal display */}
//         <h2>Sponsors 1</h2>
//         <h2>Sponsors 2</h2>
//         <h2>Sponsors 3</h2>
//         <h2>Sponsors 4</h2>
//         <h2>Sponsors 5</h2>
//       </section>
//       {/*Hopscotch Patch work display */}
//       <section className="home-container__lender-CTA">
//         <div className="details-container">
//           <p className="lender-details">
//             <em>Diversify</em> your Portfolio by Partnering with M-cubed for
//             endless
//             <strong> Possibilites</strong>...
//           </p>
//           <button className="banner-signup">Sign up Now</button>
//         </div>
//         <img src={LenderPhoto} alt="borrower copilot pic" id="lender-photo" />
//       </section>
//       <section className="home-container__borrower-CTA">
//         <img
//           src={BorrowerPhoto}
//           alt="borrwer copilot pic"
//           id="borrower-photo"
//         />
//         <div>
//           <div className="designer-"></div>
//           <p className="borrower-details">
//             {" "}
//             <span>Apply </span>for <em> faster</em> funding for Qualifying Loan
//             Requests with ease with you in mind with every step of the way!
//           </p>
//         </div>
//       </section>
//       <section className="home-container__container-5"></section>
//     </main>
//   );
// }

// src/components/Homepage/Home.jsx
// import React from "react";
// import { Box, Button, TextField, Typography, Grid, Link } from "@mui/material";
// import Handshake from "../../assets/handshake-no-bg.png";
// import LenderPhoto from "../../assets/LenderPhoto.jpeg";
// import BorrowerPhoto from "../../assets/BorrowerPhoto.jpeg";
// import "./Home.scss";

// export default function Home() {
//   return (
//     <main className="home-container">
//       <Box
//         className="home-container__landing-intro"
//         sx={{ padding: 4, textAlign: "center", bgcolor: "background.default" }}
//       >
//         <Typography variant="h2" component="h1" sx={{ color: "primary.main" }}>
//           M-Cubed: Borrow <span style={{ fontWeight: "bold" }}>Smarter</span>,
//           Lend With <span style={{ fontWeight: "bold" }}>Confidence!</span>
//         </Typography>
//         <Box sx={{ marginY: 2 }}>
//           <Typography variant="body1">
//             Sign up for our Newsletter to keep updated with all things cubey
//           </Typography>
//           <TextField
//             variant="outlined"
//             placeholder="Enter Email Here"
//             name="email-entry"
//             sx={{ marginY: 1, width: "300px" }}
//           />
//           <Button variant="contained" color="primary">
//             Sign Up
//           </Button>
//           <Typography variant="body2" sx={{ marginTop: 1 }}>
//             <Link href="#" color="primary">
//               Already Have an account?
//             </Link>
//           </Typography>
//         </Box>
//         <img
//           src={Handshake}
//           alt="Handshake"
//           style={{ maxWidth: "100%", height: "auto" }}
//         />
//       </Box>

//       <Box
//         className="home-container__badge-names"
//         sx={{ padding: 4, display: "flex", justifyContent: "space-around" }}
//       >
//         <Typography variant="h6" sx={{ color: "text.primary" }}>
//           Sponsors 1
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.primary" }}>
//           Sponsors 2
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.primary" }}>
//           Sponsors 3
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.primary" }}>
//           Sponsors 4
//         </Typography>
//         <Typography variant="h6" sx={{ color: "text.primary" }}>
//           Sponsors 5
//         </Typography>
//       </Box>

//       <Grid
//         container
//         spacing={2}
//         className="home-container__lender-CTA"
//         sx={{ padding: 4, alignItems: "center" }}
//       >
//         <Grid item xs={12} md={6}>
//           <Typography
//             variant="body1"
//             sx={{ fontStyle: "italic", color: "text.secondary" }}
//           >
//             Gain access to <strong>pre-vetted borrowers</strong> and enhance
//             your portfolio by partnering with M-Cubed for{" "}
//             <strong>strategic growth</strong>.
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             className="banner-signup"
//             sx={{ marginTop: 2 }}
//           >
//             Sign up Now
//           </Button>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <img
//             src={LenderPhoto}
//             alt="Lender"
//             style={{ width: "100%", borderRadius: "8px" }}
//           />
//         </Grid>
//       </Grid>

//       <Grid
//         container
//         spacing={2}
//         className="home-container__borrower-CTA"
//         sx={{ padding: 4, alignItems: "center" }}
//       >
//         <Grid item xs={12} md={6}>
//           <img
//             src={BorrowerPhoto}
//             alt="Borrower"
//             style={{ width: "100%", borderRadius: "8px" }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Typography variant="body1" sx={{ color: "text.primary" }}>
//             <span style={{ fontWeight: "bold" }}>Apply</span> for{" "}
//             <em>faster</em> funding for Qualifying Loan Requests with ease, with
//             you in mind at every step of the way!
//           </Typography>
//         </Grid>
//       </Grid>

//       <Box className="home-container__container-5" sx={{ padding: 4 }}></Box>
//     </main>
//   );
// }

import React from "react";
import "./Home.scss";
import MMMLogo from "../../components/Library/IMG/MMMLogo.png";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { MailOutline, ArrowForward } from "@mui/icons-material";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <main>
      <Grid container spacing={2} style={{ height: "100vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent="center"
          alignItems="flex-start"
          direction="column"
        >
          <Box textAlign="center" marginTop="15%" className="logo-container">
            <img
              src={MMMLogo}
              alt="MMM Logo"
              className="mmm-logo rotating-logo"
              style={{
                width: "60%",
                maxWidth: "800px",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h5"
              className="tagline"
              style={{
                marginTop: "0",
                textAlign: "center",
              }}
            >
              Bridging the funding gap for borrowers and lenders.
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Card
            variant="outlined"
            sx={{
              maxWidth: 450,
              width: "100%",
              padding: 2,
              boxShadow: 3,
              borderColor: "#4CAF50",
            }}
          >
            <CardContent sx={{ textAlign: "justify" }}>
              {" "}
              {/* Added textAlign: "justify" */}
              <MailOutline
                style={{
                  fontSize: 50,
                  color: "#4CAF50",
                  marginBottom: 16,
                  textAlign: "center",
                }}
              />
              <Typography variant="h6" align="center" gutterBottom>
                Join the MMM Community!
              </Typography>
              <Typography
                variant="body1"
                align="justify"
                color="text.secondary"
              >
                {" "}
                {/* Changed align to justify */}
                Hey there! If you're a business owner or lender curious about
                our app, we'd love for you to subscribe to our mailing list.
                We'll keep you posted on our launch and promise to be
                responsible with your email!
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter Your Email"
                name="email-entry"
                fullWidth
                margin="normal"
                InputProps={{
                  style: {
                    borderRadius: 8,
                  },
                }}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#4CAF50" }}
                fullWidth
                endIcon={<ArrowForward />}
              >
                Subscribe Now
              </Button>
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                style={{ marginTop: "10px" }}
              >
                Already a member?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#4CAF50",
                  }}
                >
                  Log in here
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <section className="home-container__badge-names">
        <Slider {...settings}>
          <div>
            <h2>Sponsor 1</h2>
          </div>
          <div>
            <h2>Sponsor 2</h2>
          </div>
          <div>
            <h2>Sponsor 3</h2>
          </div>
        </Slider>
      </section>

      <section className="home-container__lender-CTA">
        <div className="details-container">
          <p className="lender-details">
            <em>Diversify</em> your Portfolio by Partnering with M-cubed for
            endless <strong>Possibilities</strong>...
          </p>
          <Button
            variant="contained"
            style={{ backgroundColor: "#4CAF50" }}
            className="banner-signup"
          >
            Sign up Now
          </Button>
        </div>
      </section>

      <section className="home-container__borrower-CTA">
        <div>
          <p className="borrower-details">
            <span>Apply </span>for <em>faster</em> funding for Qualifying Loan
            Requests with ease with you in mind with every step of the way!
          </p>
        </div>
      </section>
      <section className="home-container__container-5"></section>
    </main>
  );
}
