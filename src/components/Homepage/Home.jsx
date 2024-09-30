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
      <Divider sx={{ my: 4 }} /> {/* Separator before the carousel */}
      <section className="home-container__badge-names">
        <Slider {...settings}>
          <div>
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727713128/cami-talpone-eWzC1UwAIlw-unsplash_tkf4is.jpg"
              alt="Borrower1"
              className="carousel-image"
              style={{ width: "100%", height: "200px", objectFit: "cover" }} // Consistent size for images
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727713129/khachik-simonian-XYavU5BGF9o-unsplash_ejbz5m.jpg"
              alt="Borrower2"
              className="carousel-image"
              style={{ width: "100%", height: "200px", objectFit: "cover" }} // Consistent size for images
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727713132/s-o-c-i-a-l-c-u-t-7KkDiSs5UdQ-unsplash_1_jmcqts.jpg"
              alt="Borrower3"
              className="carousel-image"
              style={{ width: "100%", height: "200px", objectFit: "cover" }} // Consistent size for images
            />
          </div>
        </Slider>
      </section>
      <Divider sx={{ my: 4 }} /> {/* Separator after the carousel */}
      <section className="home-container__lender-CTA">
        <Box textAlign="center" padding={4} bgcolor="#f5f5f5">
          <Typography variant="h6" color="#4CAF50" marginBottom={2}>
            Lenders: Maximize Your Lending Opportunities with MMM – Connect with
            Pre-Vetted Borrowers and Unlock New Avenues for Growth Today.
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: "#4CAF50" }}
            className="banner-signup"
          >
            Start your trial period!
          </Button>
        </Box>
      </section>
      <section className="home-container__borrower-CTA">
        <Box textAlign="center" padding={4} bgcolor="#f5f5f5">
          <Typography variant="h6" color="#4CAF50">
            Borrowers: Protect your credit score – apply through one streamlined
            process for minimal verifications and complete lender access.
          </Typography>
        </Box>
      </section>
      <section className="home-container__container-5"></section>
    </main>
  );
}
