import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Button,
  Collapse,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
  TablePagination,
} from "@mui/material";
import PropTypes from "prop-types";

const API = import.meta.env.VITE_BASE_URL;

export default function LoanProposals({
  user,
  token,
  loanProposals,
  loadLoanProposals,
  filteredLoanProposals,
  setFilteredLoanProposals,
}) {
  const [pageLoanProposals, setPageLoanProposals] = useState(0);
  const [rowsPerPageLoanProposals, setRowsPerPageLoanProposals] = useState(5);
  const [searchTermLoanProposals, setSearchTermLoanProposals] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [creditReports, setCreditReports] = useState([]);

  const [lenderProposal, setLenderProposal] = useState({
    title: "",
    description: "",
    loan_amount: "",
    interest_rate: "",
    repayment_term: "",
    additional_requirements: {
      downpayment: false,
      personal_guarantee: false,
      others: false,
    },
  });

  const fetchBorrowerDetails = async (borrowerId) => {
    if (!borrowerId) return;
    try {
      const res = await fetch(`${API}/borrowers/${borrowerId}`, {
        headers: { Authorization: token },
      });
      if (!res.ok) throw new Error("Failed to fetch borrower details");
      const data = await res.json();

      setBorrowerDetails({
        business_name: data.borrower.business_name || "N/A",
        industry: data.borrower.industry || "N/A",
        street: data.borrower.street || "N/A",
        city: data.borrower.city || "N/A",
        state: data.borrower.state || "N/A",
        zip_code: data.borrower.zip_code || "N/A",
        fico_score_link:
          data.borrower.fico_score_link || "/mock-fico-score.pdf",
        secretary_of_state_link:
          data.borrower.secretary_of_state_link || "/mock-sos-certificate.pdf",
        drivers_license_link:
          data.borrower.drivers_license_link || "/mock-drivers-license.pdf",
      });
      setCreditReports(data.credit_reports);
    } catch (error) {
      console.error("Failed to fetch borrower details", error);
    }
  };

  const toggleRowExpansion = (rowId, borrowerId, proposal) => {
    if (expandedRowId === rowId) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(rowId);
      fetchBorrowerDetails(borrowerId);
      if (proposal) {
        setLenderProposal({
          title: proposal.title,
          description: proposal.description,
          loan_amount: proposal.loan_amount.toString(),
          interest_rate: proposal.interest_rate.toString(),
          repayment_term: proposal.repayment_term.toString(),
          additional_requirements: proposal.additional_requirements || {},
        });
      }
    }
  };

  const handleProposalChange = (event) => {
    const { name, value } = event.target;
    setLenderProposal((prevProposal) => ({
      ...prevProposal,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setLenderProposal((prevProposal) => ({
      ...prevProposal,
      additional_requirements: {
        ...prevProposal.additional_requirements,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleResubmitProposal = async () => {
    const proposalData = {
      ...lenderProposal,
      loan_amount: parseFloat(lenderProposal.loan_amount),
      interest_rate: parseFloat(lenderProposal.interest_rate),
      repayment_term: parseInt(lenderProposal.repayment_term, 10),
    };

    const endpoint = `${API}/lenders/${user.id}/proposals/${expandedRowId}`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(proposalData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Proposal resubmitted successfully.");
        setExpandedRowId(null);
      } else {
        alert(result.error || "Error resubmitting proposal.");
      }
    } catch (error) {
      alert(error.message || "Failed to resubmit the proposal.");
    }
  };

  const handleSearchChangeLoanProposals = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermLoanProposals(term);

    const filteredProposals = loanProposals.filter(
      (loan) =>
        loan.title?.toLowerCase().includes(term) ||
        loan.description?.toLowerCase().includes(term)
    );

    setFilteredLoanProposals(filteredProposals);
  };

  useEffect(() => {
    loadLoanProposals();
  }, [user]);

  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#f6f7f8" }}>
        <Typography variant="h5" sx={{ color: "#00a250", marginBottom: 2 }}>
          Loan Proposals
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item>
            <TextField
              placeholder="Search Loan Proposals"
              variant="outlined"
              value={searchTermLoanProposals}
              onChange={handleSearchChangeLoanProposals}
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#00a250" },
                  "&:hover fieldset": { borderColor: "#00a250" },
                  "&.Mui-focused fieldset": { borderColor: "#00a250" },
                },
              }}
            />
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  { header: "Title", align: "left" },
                  { header: "Description", align: "left" },
                  { header: "Loan Amount", align: "right" },
                  { header: "Interest Rate", align: "right" },
                  { header: "Repayment Term", align: "center" },
                  { header: "Status", align: "center" },
                ].map(({ header, align }) => (
                  <TableCell key={header} align={align}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLoanProposals
                .slice(
                  pageLoanProposals * rowsPerPageLoanProposals,
                  pageLoanProposals * rowsPerPageLoanProposals +
                    rowsPerPageLoanProposals
                )
                .map((loan) => (
                  <React.Fragment key={loan.id}>
                    <TableRow
                      hover
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        toggleRowExpansion(loan.id, loan.borrower_id, loan)
                      }
                    >
                      <TableCell align="left" sx={{ color: "#00a250" }}>
                        {loan.title}
                      </TableCell>
                      <TableCell align="left">{loan.description}</TableCell>
                      <TableCell align="right">
                        {parseFloat(loan.loan_amount).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {parseFloat(loan.interest_rate).toFixed(2)}%
                      </TableCell>
                      <TableCell align="center">
                        {loan.repayment_term} months
                      </TableCell>
                      <TableCell align="center">
                        {loan.accepted === null
                          ? "Pending"
                          : loan.accepted
                          ? "Accepted"
                          : "Rejected"}
                      </TableCell>
                    </TableRow>

                    {expandedRowId === loan.id && (
                      <TableRow key={`${loan.id}-collapse`}>
                        <TableCell colSpan={6}>
                          <Collapse in={expandedRowId === loan.id}>
                            <Box
                              margin={2}
                              sx={{
                                backgroundColor: "#fff",
                                padding: 2,
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#00a250", marginBottom: 1 }}
                                  >
                                    Borrower Details
                                  </Typography>
                                  <Box sx={{ marginTop: 2 }}>
                                    <Typography>
                                      <strong>Business Name:</strong>{" "}
                                      {borrowerDetails.business_name}
                                    </Typography>
                                    <Typography>
                                      <strong>Industry:</strong>{" "}
                                      {borrowerDetails.industry}
                                    </Typography>
                                    <Typography>
                                      <strong>Location:</strong>{" "}
                                      {borrowerDetails.street},{" "}
                                      {borrowerDetails.city},{" "}
                                      {borrowerDetails.state}{" "}
                                      {borrowerDetails.zip_code}
                                    </Typography>

                                    <Typography
                                      variant="subtitle1"
                                      sx={{ marginTop: 2 }}
                                    >
                                      Credit Reports:
                                    </Typography>
                                    {creditReports.length > 0 ? (
                                      <ul>
                                        {creditReports.map((report, index) => {
                                          const isExpired =
                                            new Date(report.expire_at) <
                                            new Date();
                                          return (
                                            <li
                                              key={index}
                                              style={{
                                                color: isExpired
                                                  ? "red"
                                                  : "black",
                                              }}
                                            >
                                              Bureau: {report.credit_bureau},
                                              Score:{" "}
                                              <Link
                                                href={
                                                  borrowerDetails.fico_score_link
                                                }
                                                target="_blank"
                                                sx={{ color: "#00a250" }}
                                              >
                                                {report.score}
                                              </Link>
                                              , Expires on:{" "}
                                              {new Date(
                                                report.expire_at
                                              ).toLocaleDateString()}{" "}
                                              {isExpired && "(EXPIRED)"}
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    ) : (
                                      <Typography>
                                        No reports available
                                      </Typography>
                                    )}

                                    <Typography
                                      variant="subtitle1"
                                      sx={{ marginTop: 2 }}
                                    >
                                      Verified Documents:
                                    </Typography>
                                    <ul>
                                      <li
                                        style={{
                                          color: creditReports.some(
                                            (report) =>
                                              new Date(report.expire_at) <
                                              new Date()
                                          )
                                            ? "red"
                                            : "#00a250",
                                        }}
                                      >
                                        Credit Score - Verified{" "}
                                        {creditReports.some(
                                          (report) =>
                                            new Date(report.expire_at) <
                                            new Date()
                                        ) && "(EXPIRED)"}
                                      </li>
                                      <li>
                                        <Link
                                          href={
                                            borrowerDetails.secretary_of_state_link
                                          }
                                          target="_blank"
                                          rel="noopener"
                                          sx={{ color: "#00a250" }}
                                        >
                                          Secretary of State Certificate -
                                          Verified
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          href={
                                            borrowerDetails.drivers_license_link
                                          }
                                          target="_blank"
                                          rel="noopener"
                                          sx={{ color: "#00a250" }}
                                        >
                                          Driver's License - Verified
                                        </Link>
                                      </li>
                                    </ul>
                                  </Box>
                                </Grid>

                                <Grid item xs={6}>
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#00a250", marginBottom: 1 }}
                                  >
                                    Edit Loan Proposal
                                  </Typography>
                                  <Box sx={{ marginTop: 2 }}>
                                    <TextField
                                      label="Title"
                                      fullWidth
                                      name="title"
                                      value={lenderProposal.title}
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Loan Amount"
                                      fullWidth
                                      name="loan_amount"
                                      value={parseFloat(
                                        lenderProposal.loan_amount
                                      ).toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                      })}
                                      InputProps={{
                                        readOnly: true,
                                        sx: { color: "gray" },
                                      }}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Interest Rate"
                                      fullWidth
                                      name="interest_rate"
                                      value={`${parseFloat(
                                        lenderProposal.interest_rate
                                      ).toFixed(2)}%`}
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                      label="Repayment Term"
                                      fullWidth
                                      name="repayment_term"
                                      value={lenderProposal.repayment_term}
                                      onChange={handleProposalChange}
                                      sx={{ marginBottom: 2 }}
                                    />
                                    <Typography variant="subtitle1">
                                      Additional Requirements
                                    </Typography>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            lenderProposal
                                              .additional_requirements
                                              .downpayment
                                          }
                                          onChange={handleCheckboxChange}
                                          name="downpayment"
                                          sx={{
                                            color: "#00a250",
                                            "&.Mui-checked": {
                                              color: "#00a250",
                                            },
                                          }}
                                        />
                                      }
                                      label="Downpayment"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            lenderProposal
                                              .additional_requirements
                                              .personal_guarantee
                                          }
                                          onChange={handleCheckboxChange}
                                          name="personal_guarantee"
                                          sx={{
                                            color: "#00a250",
                                            "&.Mui-checked": {
                                              color: "#00a250",
                                            },
                                          }}
                                        />
                                      }
                                      label="Personal Guarantee"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            lenderProposal
                                              .additional_requirements.others
                                          }
                                          onChange={handleCheckboxChange}
                                          name="others"
                                          sx={{
                                            color: "#00a250",
                                            "&.Mui-checked": {
                                              color: "#00a250",
                                            },
                                          }}
                                        />
                                      }
                                      label="Others"
                                    />
                                    <TextField
                                      label="Description"
                                      fullWidth
                                      name="description"
                                      value={lenderProposal.description}
                                      onChange={handleProposalChange}
                                      multiline
                                      rows={3}
                                      sx={{ marginTop: 2, marginBottom: 2 }}
                                    />
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "10px",
                                        marginTop: 2,
                                      }}
                                    >
                                      <Button
                                        variant="contained"
                                        sx={{
                                          backgroundColor: "#00a250",
                                          color: "#fff",
                                          "&:hover": {
                                            backgroundColor: "#007a3e",
                                          },
                                        }}
                                        onClick={handleResubmitProposal}
                                      >
                                        Resend Proposal
                                      </Button>
                                      <Button
                                        variant="contained"
                                        sx={{
                                          backgroundColor: "gray",
                                          color: "#fff",
                                          "&:hover": {
                                            backgroundColor: "black",
                                          },
                                        }}
                                        onClick={() => setExpandedRowId(null)}
                                      >
                                        Cancel
                                      </Button>
                                    </Box>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredLoanProposals.length}
          page={pageLoanProposals}
          onPageChange={(event, newPage) => setPageLoanProposals(newPage)}
          rowsPerPage={rowsPerPageLoanProposals}
          onRowsPerPageChange={(event) =>
            setRowsPerPageLoanProposals(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Paper>
    </Grid>
  );
}

LoanProposals.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  loanProposals: PropTypes.array,
  loadLoanProposals: PropTypes.func,
  filteredLoanProposals: PropTypes.array,
  setFilteredLoanProposals: PropTypes.func,
};
