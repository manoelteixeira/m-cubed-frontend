import React from "react";
import "./Home.scss";
import Footer from "../../components/Library/AppFiles/Footer";
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
  Divider,
} from "@mui/material";
import { MailOutline, ArrowForward } from "@mui/icons-material";
import Slider from "react-slick";
import QRCodeComponent from "../QRCodeComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Home component
export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          <Box
            textAlign="center"
            marginTop="10%"
            marginLeft="auto"
            className="logo-container"
            style={{
              marginRight: "auto",
              paddingLeft: "10%",
            }}
          >
            <img
              src={MMMLogo}
              alt="MMM Logo"
              className="mmm-logo rotating-logo"
              style={{
                width: "70%",
                maxWidth: "600px",
                marginBottom: "100px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Typography />
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <QRCodeComponent
              style={{
                width: 30,
                height: 30,
                marginBottom: 16,
                alignSelf: "center",
              }}
            />
            <CardContent sx={{ textAlign: "justify" }}>
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
      <Divider sx={{ my: 4 }} />

      <section className="home-container__badge-names">
        <Slider {...settings}>
          <div>
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727713128/cami-talpone-eWzC1UwAIlw-unsplash_tkf4is.jpg"
              alt="Borrower1"
              className="carousel-image"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727713129/khachik-simonian-XYavU5BGF9o-unsplash_ejbz5m.jpg"
              alt="Borrower2"
              className="carousel-image"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727713132/s-o-c-i-a-l-c-u-t-7KkDiSs5UdQ-unsplash_1_jmcqts.jpg"
              alt="Borrower3"
              className="carousel-image"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
        </Slider>
      </section>
      <Divider sx={{ my: 4 }} />

      {/* Lender Section */}
      <section className="home-container__lender-CTA">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 4, bgcolor: "#f5f5f5", height: "350px" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  color="#4CAF50"
                  gutterBottom
                  sx={{ textAlign: "center", letterSpacing: "2px" }}
                >
                  LENDERS
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Maximize Your Lending Opportunities with MMM – Connect with
                  Pre-Vetted Borrowers and Unlock New Avenues for Growth Today.
                </Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#4CAF50", marginTop: "20px" }}
                  fullWidth
                >
                  Start your trial period!
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "350px",
                bgcolor: "#e0e0e0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Placeholder for Lender Image
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Borrower Section */}
      <section className="home-container__borrower-CTA">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "350px",
                bgcolor: "#e0e0e0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Placeholder for Borrower Image
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 4, bgcolor: "#f5f5f5", height: "350px" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  color="#4CAF50"
                  gutterBottom
                  sx={{ textAlign: "center", letterSpacing: "2px" }}
                >
                  BORROWERS
                </Typography>
                <Typography
                  variant="body1"
                  color="text.primary"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Protect Your Credit Score – Apply Through One Streamlined
                  Process For Minimal Verifications And Complete Lender Access.
                </Typography>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#4CAF50", marginTop: "20px" }}
                  fullWidth
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
      <Footer />
    </main>
  );
}
