import { useEffect, useState } from 'react';
import { Box, Typography, Dialog, Grid, Table,TableBody, TableHead, TableRow, TableCell } from '@mui/material';

export default function MOCKSOS() {
  const savedInfo = JSON.parse(localStorage.getItem('borrowerInfo'));
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(savedInfo);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ margin: 10 }}>
      <Typography
        variant="h4"
        align="center" 
        sx={{ width: '100%', color: 'green', backgroundColor: 'white', py: 2 }}
      >
        Borrower State of Secretary Certification
      </Typography>

      
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        display={'grid'}
        sx={{ mt: 5, ml: 30 }}
      >
        <Grid item xs={6} sx={{width:'100vw'}}>
          <Table sx={{ml: 20}}>
            <TableHead>
              <TableRow>
                <TableCell>Business Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City, State</TableCell>
                <TableCell>Vertical</TableCell>
                <TableCell>Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{savedInfo.business_name}</TableCell>
                <TableCell>{`${savedInfo.street}, ${savedInfo.zip_code}`}</TableCell>
                <TableCell>{`${savedInfo.city}, ${savedInfo.state}`}</TableCell>
                <TableCell>{savedInfo.industry}</TableCell>
                <TableCell>{new Date(savedInfo.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={6}>
          <img
            src="./MOCKStateOfSecretary.png"
            alt="SOS"
            style={{
              width: isExpanded ? '300px' : '250px',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              marginLeft: '55%'
            }}
            onClick={handleOpen}
          />
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <img
            src="./MOCKStateOfSecretary.png"
            alt="SOS"
            style={{ width: '110%', maxWidth: '600px' }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}
