import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MockFICO() {
  const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    console.log(savedInfo);
  }, []);

  const handleBackToDashboard = () => {
    navigate("/lender");
  };

  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ width: "100%", color: "green", backgroundColor: "white", py: 2 }}
      >
        Borrower FICO Score Information
      </Typography>

      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        display={"grid"}
        sx={{ mt: 5 }}
      >
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Business Name</TableCell>
                <TableCell>FICO Score</TableCell>
                <TableCell>Additional Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{savedInfo.business_name}</TableCell>
                <TableCell>was already displayed before</TableCell>
                <TableCell>Info from API I'm assuming?</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12}>
          <img
            src="./MOCKFICOscore.png"
            alt="FICO"
            style={{
              width: "250px",
              transition: "transform 0.3s",
              cursor: "pointer",
              marginLeft: "25%",
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={handleBackToDashboard}
        sx={{
          mt: 2,
          backgroundColor: "#00a250",
          color: "#fff",
          "&:hover": { backgroundColor: "#008f40" },
        }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}
