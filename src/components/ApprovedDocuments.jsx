import React, { useState } from 'react'
import { Grid, Paper, Modal, Box, Typography } from '@mui/material'
import MockFICO from './MockData/MockFICO'
import MOCKSOS from './MockData/MOCKSOS'
import MockDriversLicense from './MockData/MockDriversLicense'

const documentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
}

const labelStyle = {
  mt: 2,
  mb: 4,
  padding: '8px 16px',
  borderRadius: '20px',
  backgroundColor: 'rgb(1, 162, 80)',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#115293',
  },
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
}

export default function ApprovedDocuments() {
  const [openModal, setOpenModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const handleOpenModal = (document) => {
    setSelectedDocument(document)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedDocument(null)
  }

  const renderDocument = () => {
    switch(selectedDocument) {
      case 'FICO':
        return <MockFICO />
      case 'SOS':
        return <MOCKSOS />
      case 'DriversLicense':
        return <MockDriversLicense />
      default:
        return null
    }
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={documentStyle} onClick={() => handleOpenModal('FICO')}>
            <Typography variant="subtitle1" sx={labelStyle}>
              FICO Score
            </Typography>
            <MockFICO />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={documentStyle} onClick={() => handleOpenModal('SOS')}>
            <Typography variant="subtitle1" sx={labelStyle}>
              Secretary of State
            </Typography>
            <MOCKSOS />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={documentStyle} onClick={() => handleOpenModal('DriversLicense')}>
            <Typography variant="subtitle1" sx={labelStyle}>
              Driver's License
            </Typography>
            <MockDriversLicense />
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {renderDocument()}
        </Box>
      </Modal>
    </>
  )
}
