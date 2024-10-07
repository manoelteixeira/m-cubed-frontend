// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import NavBar from "./components/NavBarFolder/NavBar";
// // import Header from "./components/Header";
// import Home from "./Pages/Homepage";
// import Lenderpage from "./Pages/Lenderpage";
// import AboutUs from "./components/AboutFolder/AboutUs";
// import LoginPage from "./Pages/LoginPage";
// import ListOfLenders from "./Pages/ListOfLenders";
// import NewLender from "./Pages/NewLender";
// // import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NewBorrower from "./Pages/NewBorrower";
// import EditLenderForm from "./components/EditUserFolder/EditLenderInfo";
// import BDashboard from "./components/BDashboard/BDashboard";
// import LoanRequestForm from "./components/LoanRequest/LoanRequestForm";
// import EmailNewsletter from "./Pages/EmailNewsletter";
// import EditBorrowerForm from "./components/EditUserFolder/EditBorrowerForm";
// import LenderProposalPage from "./Pages/LenderProposalPage";

// function App() {
//   return (
//     <>
//       {/* <Header /> Call to Action Header for Services */}
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutUs />} />
//         <Route path="/login" element={<LoginPage />} />
//         {/* <Route path="/signup" element={<SignUp/>} /> */}
//         {/* <Route path='/signup' element={<SignUp/>}/> */}
//         <Route path="/lenders" element={<ListOfLenders />} />
//         <Route path="/lenders/signup" element={<NewLender />} />
//         <Route path="/borrowers/signup" element={<NewBorrower />} />
//         <Route path="/lenders/:id/lenderdashboard" element={<Lenderpage />} />
//         <Route
//           path="/borrowers/:id/borrowerdashboard"
//           element={<BDashboard />}
//         />
//         <Route path="/borrowers/:id/new" element={<LoanRequestForm />} />
//         <Route path="/lenders/:id/edit" element={<EditLenderForm />} />
//         <Route path="/borrowers/:id/edit" element={<EditBorrowerForm />} />
//         <Route path="/lenders/:id/proposals" element={<></>} />
//         <Route
//           path="/lenders/:id/proposals/"
//           element={<LenderProposalPage />}
//         />
//         <Route path="borrowers/:id/requests/:id" element={<></>} />
//         <Route path="/disclaimer" element={<></>} />{" "}
//         <Route path="/newsletter" element={<EmailNewsletter />}></Route>
//         {/* FF: Info page for Borrowers/Lenders to know about additional services */}
//       </Routes>
//     </>
//   );
// }

// export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBarFolder/NavBar";
import Home from "./Pages/Homepage";
import Lenderpage from "./Pages/Lenderpage";
import AboutUs from "./components/AboutFolder/AboutUs";
import LoginPage from "./Pages/LoginPage";
import ListOfLenders from "./Pages/ListOfLenders";
import NewLender from "./Pages/NewLender";
import NewBorrower from "./Pages/NewBorrower";
import EditLenderForm from "./components/EditUserFolder/EditLenderInfo";
import EditBorrowerForm from "./components/EditUserFolder/EditBorrowerForm";
import BDashboard from "./components/BDashboard/BDashboard";
import LoanRequestForm from "./components/LoanRequest/LoanRequestForm";
import EmailNewsletter from "./Pages/EmailNewsletter";
import LenderProposalPage from "./Pages/LenderProposalPage";
import EditLoanProposalPage from "./Pages/EditLoanProposalPage";
import Footer from './components/Footer/Footer'
// Grouped by functionality for easier navigation and clarity
function App() {
  return (
    <>
      {/* Navigation bar, displayed across all pages */}
      <NavBar />

      {/* Main routes for different sections of the app */}
      <Routes>
        {/* Home and General Info Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/disclaimer" element={<></>} />
        <Route path="/newsletter" element={<EmailNewsletter />} />
        
        {/* User Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />

        {/* Lenders Section */}
        <Route path="/lenders" element={<ListOfLenders />} />
        <Route path="/lenders/signup" element={<NewLender />} />
        <Route path="/lenders/:id/lenderdashboard" element={<Lenderpage />} />
        <Route path="/lenders/:id/edit" element={<EditLenderForm />} />
        <Route path="/lenders/:id/proposals" element={<LenderProposalPage />} />
        <Route path="/lenders/:lender_id/requests/:id/newproposal" element={<LenderProposalPage/>}/>
        <Route path="/lenders/:lender_id/proposals/:id/edit" element={<EditLoanProposalPage/>}/>
        <Route path="/lenders/:id/edit" element={<EditLenderForm />}/>

        {/* Borrowers Section */}
        <Route path="/borrowers/signup" element={<NewBorrower />} />
        <Route path="/borrowers/:id/borrowerdashboard" element={<BDashboard />}/>
        <Route path="/borrowers/:id/new" element={<LoanRequestForm />}/>
        <Route path="/borrowers/:id/edit" element={<EditBorrowerForm />}/>
        <Route path="borrowers/:borrower_id/requests/:id" element={<></>} />
        <Route path="/disclaimer" element={<></>} />{" "}
        <Route path="/newsletter" element={<EmailNewsletter />}></Route>
        {/* FF: Info page for Borrowers/Lenders to know about additional services */}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;