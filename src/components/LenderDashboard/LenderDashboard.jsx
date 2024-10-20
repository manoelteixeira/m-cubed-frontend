import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoansMarketplace from "./LoansMarketplace";
import LoanProposals from "./LoanProposals";
import { Paper, Typography, Grid } from "@mui/material";

const API = import.meta.env.VITE_BASE_URL;

const LenderDashboard = ({ user, token }) => {
  const [loanProposals, setLoanProposals] = useState([]);
  const [filteredLoanProposals, setFilteredLoanProposals] = useState([]);

  const loadLoanProposals = () => {
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/lenders/${user.id}/proposals`, options)
      .then((res) => res.json())
      .then((data) => {
        setLoanProposals(data);
        setFilteredLoanProposals(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLoanProposals();
  }, []);

  return (
    <div className="lender-dashboard" style={{ backgroundColor: "#f6f7f8" }}>
      {/* Welcome Section */}
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#f6f7f8",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ color: "black", textAlign: "left" }}>
              Welcome,{" "}
              <span style={{ color: "#00A250" }}>{user.business_name}</span>!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "black", textAlign: "left" }}
            >
              We’re excited to have you on board. Explore the latest loan
              requests from pre-qualified borrowers, ready for your review.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <LoansMarketplace
        user={user}
        token={token}
        loadLoanProposals={loadLoanProposals}
      />
      <LoanProposals
        user={user}
        token={token}
        loanProposals={loanProposals}
        loadLoanProposals={loadLoanProposals}
        filteredLoanProposals={filteredLoanProposals}
        setFilteredLoanProposals={setFilteredLoanProposals}
      />
    </div>
  );
};

LenderDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default LenderDashboard;
