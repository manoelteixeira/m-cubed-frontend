import React from 'react'
import { QRCode } from 'react-qr-code'
import { Container, Typography, Box, Link } from '@mui/material';

const API = import.meta.env.VITE_BASE_URL;

export default function QRCodeComponent() {


  return (
    <Container>   
        <Box>
            <QRCode value={`${API}/newsletter`} size={100} bgColor={'#ffffff'} fgColor={'#000000'} level={'H'} />
        </Box>
    </Container>
  )
}
// Additional Code if we want to expand on other QRCODE page implications or options. 

 {/* <Typography variant='h4' gutterBottom>
            Join MMM Mailing List and Stay in the know of our Recent Updates!
        </Typography>
        <Typography variant='body1' gutterBottom>
            Scan the QR Provided:
        </Typography> */}
            {/* <Typography>
        Or visit: <Link href={`${API}/newsletter`} target="_blank" rel="noreferrer">{`${API}/newsletter`}</Link>
        </Typography> */}
