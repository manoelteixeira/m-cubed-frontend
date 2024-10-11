import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { getLoanRequest, getProposalsByRequestId } from ".././services/serviceRequest";

const API = import.meta.env.VITE_BASE_URL;

export default function ShowBorrowerLoanDetails() {
  const [request, setRequest] = useState(null);
  const [offers, setOffers] = useState([]);
  const { borrower_id, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestResponse = await fetch(`${API}/borrowers/${borrower_id}/requests/${id}`);
        const requestData = await requestResponse.json();
        setRequest(requestData);

        const offersResponse = await getProposalsByRequestId(borrower_id, id);
        const sortedOffers = offersResponse.sort((a, b) => a.repayment_term - b.repayment_term);
        setOffers(sortedOffers);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [borrower_id, id]);

  if (!request) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Loan Request Details
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <BusinessIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Title" secondary={request.title} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Loan Amount" secondary={`$${parseFloat(request.value).toLocaleString()}`} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Created At"
              secondary={new Date(request.created_at).toLocaleDateString()}
            />
          </ListItem>
        </List>
      </Paper>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Loan Offers
        </Typography>
        {offers.length > 0 ? (
          <List>
            {offers.map((offer, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <AttachMoneyIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary={`${offer.title} - $${offer.loan_amount.toLocaleString()}`}
                  secondary={`Repayment Term: ${offer.repayment_term} months | Interest Rate: ${offer.interest_rate}%`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No loan offers available.</Typography>
        )}
      </Paper>
    </Box>
  );
}