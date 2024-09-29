import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import LenderForm from "./components/LenderForm";
import BorrowerForm from "./components/BorrowerForm";
import LoanRequestForm from "./components/LoanRequestForm";
import LoanProposalForm from "./components/LoanProposalForm";

// Create a custom theme with green as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Green color for buttons
      contrastText: "#ffffff", // White text color for contrast
    },
    secondary: {
      main: "#4caf50", // Use green color for secondary buttons as well
      contrastText: "#ffffff", // White text color for contrast
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Stack spacing={5}>
          {" "}
          <PrimaryButton />
          <SecondaryButton />
          <LenderForm />
          <BorrowerForm />
          <LoanRequestForm />
          <LoanProposalForm />
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default App;
