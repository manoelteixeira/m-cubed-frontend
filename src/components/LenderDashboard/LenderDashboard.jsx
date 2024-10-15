                                        <Typography>
                                          <strong>Verified Documents:</strong>
                                        </Typography>
                                        <ul>
                                          <li>
                                            <Link
                                              href={
                                                borrowerDetails.fico_score_link
                                              }
                                              target="_blank"
                                              rel="noopener"
                                              sx={{ color: "#00a250" }}
                                            >
                                              FICO Score - Verified
                                            </Link>
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

                                    {/* Proposal Form on Right */}
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: "#00a250",
                                          marginBottom: 1,
                                        }}
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
                                          label="Description"
                                          fullWidth
                                          name="description"
                                          value={lenderProposal.description}
                                          onChange={handleProposalChange}
                                          multiline
                                          rows={3}
                                          sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                          label="Loan Amount"
                                          fullWidth
                                          name="loan_amount"
                                          value={lenderProposal.loan_amount}
                                          onChange={handleProposalChange}
                                          sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                          label="Interest Rate"
                                          fullWidth
                                          name="interest_rate"
                                          value={lenderProposal.interest_rate}
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
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            marginTop: 2,
                                          }}
                                        >
                                          <Button
                                            variant="contained"
                                            sx={{
                                              backgroundColor: "#00a250",
                                              color: "#fff",
                                              marginRight: 2,
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
                                            color="error"
                                            // startIcon={<DeleteIcon />}
                                            sx={{
                                              marginRight: 2,
                                              backgroundColor: "darkred",
                                              "&:hover": {
                                                backgroundColor: "#b30000",
                                              },
                                            }}
                                            onClick={() =>
                                              handleDeleteProposal(loan.id)
                                            }
                                          >
                                            DELETE
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
                                            onClick={() =>
                                              setExpandedRowId(null)
                                            }
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

        {/* Dialog for Proposal Submission */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
LenderDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
};
