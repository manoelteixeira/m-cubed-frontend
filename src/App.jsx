import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Homepage";
import NavBar from "./components/NavBarFolder/NavBar";
import AboutUs from "./components/AboutFolder/AboutUs";
import NewLender from "./Pages/NewLender";
import Lenderpage from "./Pages/Lenderpage";
import BDashboard from "./components/BDashboard/BDashboard";
import NewBorrower from "./Pages/NewBorrower";
import ListOfLenders from "./Pages/ListOfLenders";
// import EditLenderForm from "./components/EditUserFolder/EditLenderInfo";
import LoanRequestForm from "./components/LoanRequest/LoanRequestForm";
import EmailNewsletter from "./Pages/EmailNewsletter";
import EditBorrowerPage from "./Pages/EditBorrowerPage";
import LenderProposalPage from "./Pages/LenderProposalPage";
import EditLoanRequestForm from "./components/editLoanRequestForm/editLoanRequestForm";
import Cards from "./components/Cards/Cards";
import EditLoanProposalPage from "./components/LoanProposals/EditLoanProposalForm";
import SignInForm from "./Pages/LoginPage.jsx";
import ForgotCredentials from "./components/ForgotCredentials/ForgotCredentials.jsx";
import Footer from "./components/Footer/Footer";
import EditLenderPage from "./Pages/EditLenderPage.jsx";
import ShowBorrowerDetails from "./components/ShowDetailsForBorrower/ShowBorrowerDetails";
import ShowBorrowerLoanDetails from "./components/ShowDetailsForBorrower/ShowBorrowerLoanDetails";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [toke, setToken] = useState(null);
  return (
    <>
      {/* Navigation bar, displayed across all pages */}
      <NavBar />

      {/* Main routes for different sections of the app */}
      <Routes>
        {/* Home and General Info Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<Cards />} />
        <Route
          path="/login"
          element={<SignInForm setUser={setUser} setToken={setToken} />}
        />
        <Route path="/forgotcredentials" element={<ForgotCredentials />} />{" "}
        {/* Lender Section  */}
        <Route
          path="/lenders/:lender_id/requests/:id/newproposal"
          element={<LenderProposalPage />}
        />
        <Route
          path="/lenders/:lender_id/proposals/:id/edit"
          element={<EditLoanProposalPage />}
        />
        <Route path="/lenders/:id/lenderdashboard" element={<Lenderpage />} />
        <Route path="/lenders/:id/proposals" element={<LenderProposalPage />} />
        <Route path="/lenders/:id/edit" element={<EditLenderPage />} />
        <Route path="/lenders/signup" element={<NewLender />} />
        <Route path="/signup/lender" element={<></>}></Route>
        <Route path="/lenders" element={<ListOfLenders />} />
        {/* Borrowers Section */}
        <Route
          path="/borrowers/:id/edit-request/:requestId"
          element={<EditLoanRequestForm />}
        />
        <Route path="borrowers/:borrower_id/requests/:id" element={<></>} />
        <Route
          path="/borrowers/:borrower_id/borrowerloandetails/:id"
          element={<ShowBorrowerLoanDetails />}
        />
        <Route
          path="/borrowers/:id/borrowerdashboard"
          element={<BDashboard />}
        />
        <Route
          path="/borrowers/:id/borrowerdetails"
          element={<ShowBorrowerDetails />}
        />
        <Route
          path="/borrowers/:id/requests/new"
          element={<LoanRequestForm />}
        />
        <Route path="/borrowers/:id/edit" element={<EditBorrowerPage />} />
        <Route path="/borrowers/:id/new" element={<LoanRequestForm />} />
        <Route path="/borrowers/signup" element={<NewBorrower />} />
        <Route path="/borrowers/:id" element={<BDashboard />} />
        <Route path="/disclaimer" element={<></>} />
        <Route path="/newsletter" element={<EmailNewsletter />}></Route>
      </Routes>

      {/* Footer  */}
      <Footer />
    </>
  );
}

export default App;
