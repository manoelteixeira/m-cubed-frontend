import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header";
import Home from "./Pages/Homepage";
import Lenderpage from "./Pages/Lenderpage";
import AboutUs from "./components/AboutFolder/AboutUs";
import SignInForm from "./components/SignInForm";
import ListOfLenders from "./Pages/ListOfLenders";
import NewLender from "./Pages/NewLender";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewBorrower from "./Pages/NewBorrower";


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
      <Header /> {/* Call to Action Header for Services */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<SignInForm />} />
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path='/lenders' element={<ListOfLenders/>}/>
        <Route path='/lenders/new' element={<NewLender/>}/>
        <Route path='/borrowers/new' element={<NewBorrower/>}/>
        <Route path="/lenders/:id/lenderdashboard" element={<Lenderpage />} />
        <Route path="/borrowers/:id/borrowersdashboard" element={<></>} />
        <Route path="/lenders/:id/edit" element={<></>} />
        <Route path="/borrowers/:id/edit" element={<></>} />
        <Route path="/lenders/:id/proposals" element={<></>} />
        <Route path="/lenders/:id/proposals/:id" element={<></>} />
        <Route path="borrowers/:id/requests/:id" element={<></>} />
        <Route path="/disclaimer" element={<></>} />{" "}
        {/* FF: Info page for Borrowers/Lenders to know about additional services */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
