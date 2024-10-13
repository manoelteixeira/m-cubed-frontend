// import React from "react";
// import "./AboutUs.css";

// const teamMembers = [
//   {
//     name: "Katlyn Winegardner",
//     role: "Fullstack Developer",
//     imageUrl: "/images/katlyn.jpg",
//   },
//   {
//     name: "Rizel",
//     role: "Backend Engineer",
//     imageUrl: "/images/john.jpg",
//   },
//   {
//     name: "Manoel",
//     role: "UI/UX Designer",
//     imageUrl: "/images/jane.jpg",
//   },
//   {
//     name: "Aaron",
//     role: "Fullstack Developer",
//     imageUrl: "Images/Aaron.jpeg",
//   },
//   {
//     name: "Kubra",
//     role: "Fullstack Developer",
//     imageUrl: "/images/emily.jpg",
//   },
// ];

// export default function AboutUs() {
//   return (
//     <div className="about-us">
//       <div className="first-rectangle">
//         <h2>From a Simple Idea to a Bold Mission – Discover Who We Are</h2>
//         <p>
//           Our app transforms the small-ticket equipment financing market by
//           giving borrowers and lenders a seamless, transparent platform to
//           connect. Borrowers can list their loan requirements with ease, while
//           lenders gain access to real-time opportunities tailored to their
//           interests – all without the hassle of multiple credit pulls that can
//           harm a business’s future. Whether you’re starting out or expanding, we
//           simplify the financing process so you can focus on what matters most –
//           growing your business.
//         </p>
//       </div>

//       <div className="second-rectangle">
//         <h3>Discover Our Mission</h3>
//         <p>
//           {" "}
//           Our team is dedicated to creating innovative solutions that help small
//           businesses grow. Together, we are building a platform that connects
//           borrowers with lenders in a seamless, secure, and transparent way.
//         </p>
//       </div>

//       <div className="team-section">
//         <h1>The Team Behind MoneyMoneyMoney</h1>
//         <div className="team-container">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="team-member">
//               <div className="member-photo-wrapper">
//                 <img
//                   src={member.imageUrl}
//                   className="team-member-photo"
//                   alt={member.name}
//                 />
//               </div>
//               <h3>{member.name}</h3>
//               <h4>{member.role}</h4>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bottom-section"></div>
//     </div>
//   );
// }

// export default AboutUs;

import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Avatar,
  Link,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { styled } from "@mui/system";

// Custom MMM color theme
const MMMGreen = "#00a250";
const MMMWhite = "#f6f7f8";

// Styled components for team cards
const TeamCard = styled(Card)({
  maxWidth: 345,
  backgroundColor: MMMWhite,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
  },
  textAlign: "center",
  padding: "30px",
  marginBottom: "60px",
});

const Paragraph = styled(Typography)({
  textAlign: "justify",
  marginBottom: "60px",
});

// Team data
const teamMembers = [
  {
    name: "Aaron Constant",
    role: "Fullstack Engineer",
    bio: "Aaron Constant is currently a Residential Counselor, providing support to individuals with mental health conditions. In addition to his counseling work, he is an enthusiastic and self-taught cosmetic chemist, enjoying the creation of skincare and haircare products. Aaron is also pursuing a career in software engineering with a strong passion for technology and video game creation. Aaron is hoping to develop a game for others enjoyment such as the games that he has enjoyed since his youth. With this passion he plans to utilize his skill set to reach out to other communities, travel and experience diverse cultures firsthand in hopes to widen his reach of understanding of communities and in all aspects through the intricate and meticulous world of tech.",
    imageUrl: "Images/Aaron.jpeg",
    github: "https://github.com/AaronConstant",
    linkedin: "https://www.linkedin.com/in/aaronconstant/",
  },
  {
    name: "Katlyn Winegardner",
    role: "Fullstack Engineer",
    bio: "Placeholder for bio",
    imageUrl: "/images/katlyn.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Kubra Bodur",
    role: "Fullstack Engineer",
    bio: "I’m Kübra, and I'm from Turkey. I taught physics for nine years before moving here. With my interest in technology and my husband’s support, I started my journey with Pursuit, which changed both my career and my life.",
    imageUrl: "/images/emily.jpg",
    github: "https://github.com/kbodur",
    linkedin: "https://www.linkedin.com/in/kubra-bodur-6524b5297",
  },
  {
    name: "Manoel Alves Teixeira",
    role: "Fullstack Engineer",
    bio: "Placeholder for bio",
    imageUrl: "/images/jane.jpg",
    github: "https://github.com/manoelteixeira",
    linkedin: "https://www.linkedin.com/in/manoel-alves-teixeira/",
  },
  {
    name: "Rizel Enad",
    role: "Fullstack Engineer",
    bio: "For over two decades, Rizel helped build a small business. Now, she’s focused on creating solutions for consumers and businesses. In her free time, she’s working on her Villain Chess app.",
    imageUrl: "/images/john.jpg",
    github: "https://github.com/renad-lab",
    linkedin: "https://www.linkedin.com/in/rizelenad/",
  },
];

// Main About Us Component
export default function AboutUs() {
  return (
    <Box
      sx={{
        backgroundColor: MMMWhite,
        paddingBottom: "120px",
        paddingTop: "100px",
      }}
    >
      <Container maxWidth="lg">
        {/* ELFA Market Data Section */}
        <Box sx={{ textAlign: "center", margin: "60px 0" }}>
          <Typography variant="h4" component="h2" color={MMMGreen} gutterBottom>
            WE'RE TRANSFORMING SMALL-TICKET EQUIPMENT FINANCING
          </Typography>
          <Paragraph variant="body1" color="textSecondary">
            According to the 2024 Survey of Equipment Finance Activity (SEFA)
            conducted by the Equipment Leasing and Finance Association (ELFA),
            the small-ticket equipment financing market contributes roughly $300
            billion annually to the $1 trillion equipment finance industry. In
            2023, the small-ticket segment, defined as transactions up to
            $250,000, saw significant growth, highlighting its importance in
            supporting businesses of all sizes. For more details, visit{" "}
            <Link
              href="https://www.elfaonline.org/SEFA"
              target="_blank"
              rel="noopener"
            >
              ELFA's SEFA Report
            </Link>
            .
          </Paragraph>
        </Box>

        {/* Platform Disruption Section */}
        <Box
          sx={{
            textAlign: "center",
            margin: "60px 0",
            backgroundColor: MMMGreen,
            color: MMMWhite,
            padding: "60px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            How We're Changing the Game
          </Typography>
          <Paragraph variant="body1" sx={{ color: MMMWhite }}>
            Our platform transforms the $300 billion small-ticket equipment
            financing market by linking borrowers and lenders seamlessly.
            Borrowers post their financing needs, while lenders access
            pre-qualified deals instantly – without triggering multiple credit
            checks. Whether launching or expanding, we simplify financing,
            letting you focus on scaling your business.
          </Paragraph>
        </Box>

        {/* Team Section */}
        <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
          <Typography
            variant="h4"
            component="h1"
            color={MMMGreen}
            gutterBottom
            sx={{ marginBottom: "60px" }}
          >
            The Team Behind MoneyMoneyMoney
          </Typography>
          <Grid container spacing={10} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <TeamCard>
                  <Avatar
                    src={member.imageUrl}
                    alt={member.name}
                    sx={{ width: 80, height: 80, margin: "0 auto 10px" }}
                  />
                  <Typography variant="h6" component="h3" color={MMMGreen}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ margin: "10px 0", textAlign: "justify" }}
                  >
                    {member.bio}
                  </Typography>
                  <Box>
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener"
                      sx={{ marginRight: "10px" }}
                    >
                      <GitHubIcon sx={{ color: MMMGreen }} />
                    </Link>
                    <Link href={member.linkedin} target="_blank" rel="noopener">
                      <LinkedInIcon sx={{ color: MMMGreen }} />
                    </Link>
                  </Box>
                </TeamCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ textAlign: "center", marginTop: "60px" }}>
          <Typography variant="h5" component="h2" color={MMMGreen}>
            Why Choose Us?
          </Typography>
          <Grid
            container
            spacing={10}
            justifyContent="center"
            sx={{ marginTop: "60px" }}
          >
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: "center" }}>
                <BusinessIcon sx={{ fontSize: 50, color: MMMGreen }} />
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                  Seamless Financing
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: "center" }}>
                <PeopleIcon sx={{ fontSize: 50, color: MMMGreen }} />
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                  Trusted Team
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: "center" }}>
                <CheckCircleIcon sx={{ fontSize: 50, color: MMMGreen }} />
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                  Real-Time Opportunities
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
