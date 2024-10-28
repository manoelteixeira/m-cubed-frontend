import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import {
  CardContent,
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
    <main
      style={{
        backgroundColor: "#f6f7f8",
        marginTop: "32px",
        paddingBottom: "80px",
      }}
    >
      <Grid container spacing={1} justifyContent="center" sx={{ padding: 5 }}>
        {/* Equipment Financing Section */}
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
          <CardContent>
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
                      mb: 1.5,
                      p: 2,
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: { xs: "2.5rem", sm: "3.5rem" },
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
                ml: 2.5,
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
                mt: 3,
                fontSize: "1.2rem",
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "#00a250", fontWeight: "bold" }}>MMM</span>{" "}
              is a game-changing platform designed for businesses seeking
              small-ticket equipment financing. With one streamlined
              application, minimal credit pulls, and direct access to a network
              of lenders—no middlemen—we cut through the noise to deliver fast,
              effective financing solutions.
            </Typography>

            <Link to="/borrowers/signup" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#00a250",
                  marginTop: "60px",
                  padding: "12px",
                }}
                fullWidth
              >
                Get Started Today!
              </Button>
            </Link>
          </CardContent>
        </Grid>

        {/* Images Section */}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <motion.img
            src="./borrowerdashboard.jpeg"
            alt="Borrower Dashboard"
            style={{
              width: "90%",
              height: "auto",
              borderRadius: "12px",
              marginBottom: "30px",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.img
            src="./lenderdashboard.jpeg"
            alt="Lender Dashboard"
            style={{
              width: "90%",
              height: "auto",
              borderRadius: "12px",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Grid>
      </Grid>

      {/* How This Works Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ padding: 18 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729626240/How_This_Works_al2y1c.png"
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

        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729648309/Minimalist_Gradient_Pricing_Comparison_Chart_Table_Graph_6_zjfgti.png"
            alt="Better Way"
            style={{
              width: "100%",
              maxWidth: 1200,
              borderRadius: 8,
              marginTop: "40px",
            }}
          />
        </Grid>
      </Grid>

      {/* Why Choose MMM Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img
            src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729626240/How_This_Works_3_dspdnb.png"
            alt="Why Choose MMM"
            style={{ width: "100%", maxWidth: 1200, borderRadius: 8 }}
          />
        </Grid>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6} sm={6} display="flex" justifyContent="center">
            <Link to="/borrowers/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729523962/Add_a_heading_500_x_500_px_6_yzy8zi.png"
                alt="Borrowers"
                style={{ width: 600, height: 600, borderRadius: 8 }}
              />
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} display="flex" justifyContent="center">
            <Link to="/lenders/signup">
              <img
                src="https://res.cloudinary.com/dxeoesm7e/image/upload/v1729523962/Add_a_heading_500_x_500_px_7_yoovqn.png"
                alt="Lenders"
                style={{ width: 600, height: 600, borderRadius: 8 }}
              />
            </Link>
          </Grid>
        </Grid>
      </Grid>

      {/* Accordion Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ padding: 5 }}>
        <Grid item xs={12} md={8} lg={7}>
          {/* Accordion 1: Understanding the Small-Ticket Equipment Financing Industry */}
          <Accordion sx={{ maxWidth: "2400px", width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "1.7rem",
                }}
              >
                Understanding the $300B Small-Ticket Equipment Financing
                Industry
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                color="black"
                sx={{ textAlign: "justify", mb: 2 }}
              >
                The small-ticket equipment financing industry, according to the
                Equipment Leasing and Finance Association (ELFA), is valued at
                over $300 billion and is growing at a 7.2% CAGR. For more
                information, you can access the{" "}
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
                intermediaries, but the demand for streamlined, direct solutions
                is growing fast as companies look for efficiency.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Transforming Borrowers’ Access to Equipment Financing */}
          <Accordion sx={{ maxWidth: "2400px", width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#black",
                  fontSize: "1.7rem",
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
                benefit from streamlined applications, minimal credit pulls, and
                fast approvals, all while avoiding the hassle and cost of
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
                industrial equipment, and more—all with competitive rates! We
                help businesses focus on growth, not bureaucracy.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 3: Powering New Lending Opportunities */}
          <Accordion sx={{ maxWidth: "2400px", width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#black",
                  fontSize: "1.7rem",
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
                offers lenders access to a pre-qualified borrower pool, reducing
                administrative burdens and enabling faster decision-making.
                Lenders can view loans that meet their specific criteria and
                approve them in just a few clicks, creating new opportunities in
                a growing market.
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

          {/* Accordion 4: Our Mission */}
          <Accordion sx={{ maxWidth: "2400px", width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#00a250",
                  fontSize: "1.7rem",
                }}
              >
                Our Mission: TO GET YOU FUNDED.{" "}
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
                , we don’t just offer financing – we unlock growth. If you’ve
                been stuck with limited choices, it’s time to dive into
                something bigger. We bring you competitive rates that help your
                business thrive. Whether you’re a borrower pushing for that next
                goal or a lender hunting for new opportunities,{" "}
                <span style={{ color: "#00a250", fontWeight: "bold" }}>
                  MMM
                </span>{" "}
                makes it happen.
              </Typography>
              <Typography
                variant="body1"
                color="black"
                sx={{ textAlign: "justify", mb: 2, fontWeight: "bold" }}
              >
                Our mission is simple: More choices, more power to you. Let’s
                get you funded today!
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 5: Future Features */}
          <Accordion sx={{ maxWidth: "2400px", width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#black",
                  fontSize: "1.7rem",
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
                We’re just getting started at{" "}
                <span style={{ color: "#00a250", fontWeight: "bold" }}>
                  MMM
                </span>
                ! Exciting features are on the way, and we want you to be a part
                of our journey as we roll them out:
              </Typography>
              <List sx={{ listStyleType: "decimal", pl: 4 }}>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>AI-powered loan matching:</b> Speed up and improve
                        how borrowers and lenders connect, with AI handling the
                        matching process.
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Ratings and reviews:</b> Borrowers and lenders can
                        build trust by reviewing and rating each other after
                        transactions.
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Financial health dashboard:</b> Borrowers can track
                        their creditworthiness and gain insights to improve
                        their chances of approval.
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Automated repayment tracking:</b> Simplify loan
                        management with auto-scheduled repayments and real-time
                        tracking for both parties.
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Customizable lender search filters:</b> Lenders can
                        easily find loans that match their specific criteria,
                        from industry to loan size.
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Instant loan offers:</b> Pre-qualified borrowers will
                        soon receive loan offers in minutes instead of days.
                      </>
                    }
                  />
                </ListItem>

                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Success stories:</b> Showcase how{" "}
                        <span style={{ color: "#00a250", fontWeight: "bold" }}>
                          MMM
                        </span>{" "}
                        is helping businesses grow, providing real examples of
                        our impact.
                      </>
                    }
                  />
                </ListItem>

                {/* Additional Future Features */}
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Second-hand marketplace:</b> A marketplace for
                        buying/selling second-hand equipment and second-hand
                        financing options.
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>Live-streaming of equipment showcases:</b> Watch
                        manufacturers demo their products live to promote
                        financing and special lender offers.
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText
                    primary={
                      <>
                        <b>More ads for lender specials:</b> Promote special
                        financing rates from lenders directly within the
                        marketplace.
                      </>
                    }
                  />
                </ListItem>
              </List>
              <Typography
                variant="body1"
                color="black"
                sx={{ textAlign: "justify", mt: 2 }}
              >
                Big things are coming—stay tuned!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </main>
  );
}
