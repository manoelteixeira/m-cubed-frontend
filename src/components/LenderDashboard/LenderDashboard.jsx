// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import LoansMarketplace from "./LoansMarketplace";
// import LoanProposals from "./LoanProposals";
// import { Paper, Typography, Grid, Box } from "@mui/material";

// const API = import.meta.env.VITE_BASE_URL;

// const LenderDashboard = ({ user, token }) => {
//   const [loanProposals, setLoanProposals] = useState([]);
//   const [filteredLoanProposals, setFilteredLoanProposals] = useState([]);

//   const loadLoanProposals = () => {
//     const options = {
//       headers: { Authorization: token },
//     };
//     fetch(`${API}/lenders/${user.id}/proposals`, options)
//       .then((res) => res.json())
//       .then((data) => {
//         setLoanProposals(data);
//         setFilteredLoanProposals(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     loadLoanProposals();
//   }, []);

//   return (
//     <div className="lender-dashboard" style={{ backgroundColor: "#f6f7f8" }}>
//       {/* Welcome Section */}
//       <Paper
//         elevation={0}
//         sx={{
//           padding: "20px",
//           marginBottom: "40px",
//           backgroundColor: "#f6f7f8",
//           paddingTop: "40px",
//         }}
//       >
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Grid item>
//             <Typography variant="h4" sx={{ color: "black", textAlign: "left" }}>
//               Welcome,{" "}
//               <span style={{ color: "#00A250" }}>{user.business_name}!</span>
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ color: "black", textAlign: "left" }}
//             >
//               We’re excited to have you on board! Explore the latest loan
//               requests from pre-qualified borrowers, ready for your review.
//             </Typography>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Loans Marketplace */}
//       <Box sx={{ marginBottom: "80px" }}>
//         <LoansMarketplace
//           user={user}
//           token={token}
//           loadLoanProposals={loadLoanProposals}
//           sx={{
//             border: "none",
//             boxShadow: "none",
//             backgroundColor: "#f6f7f8",
//           }}
//         />
//       </Box>

//       {/* Loan Proposals */}
//       <Box sx={{ marginTop: "80px" }}>
//         <LoanProposals
//           user={user}
//           token={token}
//           loanProposals={loanProposals}
//           loadLoanProposals={loadLoanProposals}
//           filteredLoanProposals={filteredLoanProposals}
//           setFilteredLoanProposals={setFilteredLoanProposals}
//           sx={{
//             border: "none",
//             boxShadow: "none",
//             backgroundColor: "#f6f7f8",
//           }}
//         />
//       </Box>
//     </div>
//   );
// };

// LenderDashboard.propTypes = {
//   user: PropTypes.object,
//   token: PropTypes.string,
// };

// export default LenderDashboard;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoansMarketplace from "./LoansMarketplace";
import LoanProposals from "./LoanProposals";
import { Paper, Typography, Grid, Box, Tabs, Tab } from "@mui/material";

const API = import.meta.env.VITE_BASE_URL;

const LenderDashboard = ({ user, token }) => {
  const [loanProposals, setLoanProposals] = useState([]);
  const [filteredLoanProposals, setFilteredLoanProposals] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const loadLoanProposals = () => {
    const options = {
      headers: { Authorization: token },
    };
    fetch(`${API}/lenders/${user.id}/proposals`, options)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLoanProposals(data);
          setFilteredLoanProposals(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLoanProposals();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="lender-dashboard" style={{ backgroundColor: "#f6f7f8" }}>
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          marginBottom: "40px",
          backgroundColor: "#f6f7f8",
          paddingTop: "40px",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" sx={{ color: "black", textAlign: "left" }}>
              Welcome,{" "}
              <span style={{ color: "#00A250" }}>{user.business_name}!</span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "black", textAlign: "left" }}
            >
              We’re excited to have you on board! Explore the latest loan
              requests from pre-qualified borrowers, ready for your review.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Horizontal Tabs */}
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "20px" }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{
            ".MuiTabs-flexContainer": {
              justifyContent: "center",
            },
            ".MuiTab-root": {
              minWidth: "auto",
              padding: "12px 24px",
              backgroundColor: "#f6f7f8",
              "&.Mui-selected": {
                backgroundColor: "#00A250",
                color: "white",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              },
              color: "#00A250",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginRight: "4px",
            },
            ".MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab label="Loans Marketplace" />
          <Tab label="Loan Proposals" />
        </Tabs>
      </Box>

      <Box sx={{ padding: "20px" }}>
        {activeTab === 0 && (
          <Box sx={{ marginBottom: "80px" }}>
            <LoansMarketplace
              user={user}
              token={token}
              loadLoanProposals={loadLoanProposals}
              sx={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f6f7f8",
              }}
            />
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ marginTop: "20px" }}>
            <LoanProposals
              user={user}
              token={token}
              loanProposals={loanProposals}
              loadLoanProposals={loadLoanProposals}
              filteredLoanProposals={filteredLoanProposals}
              setFilteredLoanProposals={setFilteredLoanProposals}
              sx={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f6f7f8",
              }}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

LenderDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};

export default LenderDashboard;
