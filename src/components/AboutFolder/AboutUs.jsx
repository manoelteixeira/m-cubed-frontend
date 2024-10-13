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
  CardContent,
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

// Styled components
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
  padding: "20px",
});

const Paragraph = styled(Typography)({
  textAlign: "justify",
});

const teamMembers = [
  {
    name: "Aaron Constant",
    role: "Fullstack Engineer",
    bio: "Placeholder for bio",
    imageUrl: "Images/Aaron.jpeg",
    github: "#",
    linkedin: "#",
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
    bio: "Placeholder for bio",
    imageUrl: "/images/emily.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Manoel Alves Teixeira",
    role: "Fullstack Engineer",
    bio: "Placeholder for bio",
    imageUrl: "/images/jane.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Rizel Enad",
    role: "Fullstack Engineer",
    bio: "Placeholder for bio",
    imageUrl: "/images/john.jpg",
    github: "#",
    linkedin: "#",
  },
];

export default function AboutUs() {
  return (
    <Box sx={{ backgroundColor: MMMWhite, paddingBottom: "50px" }}>
      <Container maxWidth="lg">
        {/* Introduction Section */}
        <Box sx={{ textAlign: "center", margin: "40px 0" }}>
          <Typography variant="h4" component="h2" color={MMMGreen} gutterBottom>
            From a Simple Idea to a Bold Mission – Discover Who We Are
          </Typography>
          <Paragraph variant="body1" color="textSecondary">
            Our app transforms the small-ticket equipment financing market by
            connecting borrowers and lenders seamlessly. Borrowers can list
            their loan requirements easily, while lenders access real-time
            opportunities tailored to their needs – all without multiple credit
            pulls. Whether you’re starting or expanding, we simplify financing
            so you can focus on growing your business.
          </Paragraph>
        </Box>

        {/* Mission Section */}
        <Box
          sx={{
            textAlign: "center",
            margin: "40px 0",
            backgroundColor: MMMGreen,
            color: MMMWhite,
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom>
            Discover Our Mission
          </Typography>
          <Paragraph variant="body1" sx={{ color: MMMWhite }}>
            Our team is dedicated to creating innovative solutions that help
            small businesses grow. We are building a platform that connects
            borrowers with lenders in a seamless, secure, and transparent way.
          </Paragraph>
        </Box>

        {/* Team Section */}
        <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
          <Typography variant="h4" component="h1" color={MMMGreen} gutterBottom>
            The Team Behind MoneyMoneyMoney
          </Typography>
          <Grid container spacing={6} justifyContent="center">
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
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ margin: "10px 0" }}
                  >
                    {member.bio}
                  </Typography>
                  {/* GitHub and LinkedIn Links */}
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

        {/* Bottom Section with Icons */}
        <Box sx={{ textAlign: "center", marginTop: "50px" }}>
          <Typography variant="h5" component="h2" color={MMMGreen}>
            Why Choose Us?
          </Typography>
          <Grid
            container
            spacing={6}
            justifyContent="center"
            sx={{ marginTop: "20px" }}
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
