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
