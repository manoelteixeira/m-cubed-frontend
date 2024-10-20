import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import { CardContent, Button, Typography, Card, Grid } from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
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
    <main style={{ backgroundColor: "#f6f7f8", marginTop: "64px" }}>
      <Grid container spacing={1} justifyContent="center" sx={{ padding: 5 }}>
        <Grid
          item
          xs={12}
          sm={6}
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
              maxWidth: 1200,
              height: "auto",
              padding: 0,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <CardContent>
              {/* Equipment Slider */}
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
                        mb: 2,
                        p: 2,
                        textAlign: "left",
                        fontWeight: "bold",
                        fontSize: { xs: "2.5rem", sm: "3.5rem" },
                      }}
                    >
                      {item}
                    </Typography>
                  </motion.div>
                ))}
              </Slider>

              {/* MMM Description */}
              <Typography
                variant="h6"
                color="black"
                sx={{
                  fontWeight: "bold",
                  textAlign: "justify",
                  mb: 1,
                  marginTop: 2,
                }}
              >
                <span style={{ color: "#00a250", fontWeight: "bold" }}>
                  MMM
                </span>{" "}
                is a game-changing platform designed for businesses seeking
                small-ticket equipment financing. With one streamlined
                application, minimal credit pulls, and direct access to a
                network of lenders—no middlemen— we cut through the noise to
                deliver fast, effective financing solutions.
              </Typography>

              {/* Link to Borrower Signup */}
              <Link to="/borrowers/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#00a250", marginTop: "60px" }}
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
          sm={6}
          md={6}
          sx={{ display: "flex", justifyContent: "center", padding: 0 }}
        >
          {/* Placeholder for Product Images */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              backgroundColor: "transparent",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Dashboard Images
            </Typography>
            <img
              src="https://via.placeholder.com/300"
              alt="Product Placeholder"
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
            <img
              src="src/assets/LenderDashboard.png"
              alt="Product Placeholder"
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
          </Card>
        </Grid>
      </Grid>

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
          <Grid item xs={4} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974117/Add_a_heading_500_x_500_px_1_hl4tvp.png"
              alt="How it works step 2"
              style={{ width: 400, height: 400, borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={4} sm={4} display="flex" justifyContent="center">
            <img
              src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1727974118/Add_a_heading_500_x_500_px_2_f3zlzp.png"
              alt="How it works step 3"
              style={{ width: 400, height: 400, borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* New Banner Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728576656/How_This_Works_2_tg9j17.png"
            alt="Why Choose MMM"
            style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
          />
        </Grid>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6} sm={6} display="flex" justifyContent="center">
            <Link to="/borrowers/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1728581611/Add_a_heading_500_x_500_px_3_w06vz8.png"
                alt="Borrowers"
                style={{ width: 600, height: 600, borderRadius: 8 }}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} display="flex" justifyContent="center">
            <Link to="/lenders/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729438568/Add_a_heading_500_x_500_px_5_znsmck.png"
                alt="Lenders"
                style={{ width: 600, height: 600, borderRadius: 8 }}
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
