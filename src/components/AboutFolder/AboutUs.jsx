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

// Team data
const teamMembers = [
  {
    name: "Aaron Constant",
    role: "Software Engineer",
    bio: "Aaron Constant is currently a Residential Counselor, providing support to individuals with mental health conditions. In addition to his counseling work, he is an enthusiastic and self-taught cosmetic chemist, enjoying the creation of skincare and haircare products. Aaron is also pursuing a career in software engineering with a strong passion for technology and video game creation. Aaron is hoping to develop a game for others enjoyment such as the games that he has enjoyed since his youth. With this passion he plans to utilize his skill set to reach out to other communities, travel and experience diverse cultures firsthand in hopes to widen his reach of understanding of communities and in all aspects through the intricate and meticulous world of tech.",
    imageUrl: "Images/Aaron.jpeg",
    github: "https://github.com/AaronConstant",
    linkedin: "https://www.linkedin.com/in/aaronconstant/",
  },
  {
    name: "Katlyn Winegardner",
    role: "Software Engineer",
    bio: "Hi, I’m Katlyn Winegardner, a full-stack developer passionate about using technology to advocate for my community and create real change.",
    imageUrl: "/images/katlyn.jpg",
    github: "https://github.com/KatWine",
    linkedin: "https://www.linkedin.com/in/katlyn-winegardner/",
  },
  {
    name: "Kubra Bodur",
    role: "Software Engineer",
    bio: "I’m Kübra, and I'm from Turkey. I taught physics for nine years before moving here. With my interest in technology and my husband’s support, I started my journey with Pursuit, which changed both my career and my life.",
    imageUrl: "/images/emily.jpg",
    github: "https://github.com/kbodur",
    linkedin: "https://www.linkedin.com/in/kubra-bodur-6524b5297",
  },
  {
    name: "Manoel Alves Teixeira",
    role: "Software Engineer",
    bio: "Hi, I’m Manoel! I am from Brazil, and I’ve been coding since I was a teenager, and what started as a hobby has turned into a passion for solving problems and building robots. My ultimate goal? To create innovative solutions that push the boundaries of technology.",
    imageUrl: "/images/jane.jpg",
    github: "https://github.com/manoelteixeira",
    linkedin: "https://www.linkedin.com/in/manoel-alves-teixeira/",
  },
  {
    name: "Rizel Enad",
    role: "Software Engineer",
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
        {/* Team Section */}
        <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
          <Typography
            variant="h4"
            component="h1"
            color={MMMGreen}
            gutterBottom
            sx={{ marginBottom: "60px" }}
          >
            Meet The Team Behind MoneyMoneyMoney
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
      </Container>
    </Box>
  );
}
