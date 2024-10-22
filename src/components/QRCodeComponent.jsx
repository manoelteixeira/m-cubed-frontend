import React from "react";
import { QRCode } from "react-qr-code";
import { Container, Typography, Box, Link } from "@mui/material";

const API = import.meta.env.VITE_BASE_URL;

export default function QRCodeComponent() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      {/* <Typography variant='h4' gutterBottom>
            Join MMM Mailing List
        </Typography> */}
      <Typography variant="body1" gutterBottom>
        Or Scan the QR code:
      </Typography>
      <Box>
        <QRCode
          value={`${API}/newsletter`}
          size={100}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
      </Box>
      {/* <Typography>
            Or visit: <Link href={`${API}/newsletter`} target="_blank" rel="noreferrer">{`${API}/newsletter`}</Link>
        </Typography> */}
    </Container>
  );
}
