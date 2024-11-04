import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MOCKSOS() {
  const savedInfo = JSON.parse(localStorage.getItem("borrowerInfo"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleBackToDashboard = () => {
    navigate("/lender");
  };

  return (
    <Box sx={{ margin: "40px auto", maxWidth: "800px", textAlign: "center" }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#00a250",
            backgroundColor: "#f0f8f0",
            borderRadius: 2,
            py: 2,
          }}
        >
          Secretary of State Certification
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <Grid item xs={12} sm={8}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Business Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Address</strong>
                  </TableCell>
                  <TableCell>
                    <strong>City, State</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Industry</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Start Date</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{savedInfo.business_name}</TableCell>
                  <TableCell>{`${savedInfo.street}, ${savedInfo.zip_code}`}</TableCell>
                  <TableCell>{`${savedInfo.city}, ${savedInfo.state}`}</TableCell>
                  <TableCell>{savedInfo.industry}</TableCell>
                  <TableCell>
                    {new Date(savedInfo.start_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img
              src="./MOCKStateOfSecretary.png"
              alt="SOS"
              style={{
                width: "100%",
                maxWidth: "250px",
                cursor: "pointer",
                borderRadius: 5,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleOpen}
            />
          </Grid>
        </Grid>

        {/* Full-Size Image Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./MOCKStateOfSecretary.png"
              alt="SOS"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: 5,
              }}
            />
          </Box>
        </Dialog>

        <Button
          variant="contained"
          onClick={handleBackToDashboard}
          sx={{
            mt: 3,
            backgroundColor: "#00a250",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#008f40" },
          }}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
