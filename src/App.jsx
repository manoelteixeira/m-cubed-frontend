// // src/App.jsx
// import "./App.css";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
// import Home from "./Pages/Homepage";
// import NavBar from "./components/NavBarFolder/NavBar";
// import AboutUs from "./components/AboutFolder/AboutUs";
// import NewLender from "./Pages/NewLender";
// import Lenderpage from "./Pages/Lenderpage";
// import BDashboard from "./components/BDashboard/BDashboard";
// import NewBorrower from "./Pages/NewBorrower";
// import ListOfLenders from "./Pages/ListOfLenders";
// // import EditLenderForm from "./components/EditUserFolder/EditLenderInfo";
// import LoanRequestForm from "./components/LoanRequest/LoanRequestForm";
// import EmailNewsletter from "./Pages/EmailNewsletter";
// import EditBorrowerPage from "./Pages/EditBorrowerPage";
// import LenderProposalPage from "./Pages/LenderProposalPage";
// import EditLoanRequestForm from "./components/editLoanRequestForm/editLoanRequestForm";
// // import Cards from "./components/Cards/Cards";
// import EditLoanProposalPage from "./components/LoanProposals/EditLoanProposalForm";
// import SignInForm from "./Pages/LoginPage.jsx";
// import ForgotCredentials from "./components/ForgotCredentials/ForgotCredentials.jsx";
// import Footer from "./components/Footer/Footer.jsx";
// import EditLenderPage from "./Pages/EditLenderPage.jsx";
// import ShowBorrowerDetails from "./components/ShowDetailsForBorrower/ShowBorrowerDetails";
// import ShowBorrowerLoanDetails from "./components/ShowDetailsForBorrower/ShowBorrowerLoanDetails";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import MockFICO from "./components/MockData/MockFICO.jsx";
// import MOCKSOS from "./components/MockData/MOCKSOS.jsx";
// import MockDriversLicense from "./components/MockData/MockDriversLicense.jsx";
// function App() {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const credentials = JSON.parse(localStorage.getItem("credentials"));
//     if (credentials) {
//       // console.log(credentials);
//       const { timestamp } = credentials;
//       const time = new Date(timestamp);
//       const now = new Date();
//       const timeDif = Math.abs(time - now) / (1000 * 60 * 60);
//       if (timeDif < 12) {
//         setUser(credentials.user);
//         setToken(credentials.token);
//       } else {
//         localStorage.removeItem("credentials");
//       }
//     }
//   }, []);

//   return (
//     <>
//       {/* Navigation bar, displayed across all pages */}
//       <NavBar
//         setUser={setUser}
//         setToken={setToken}
//         isAuthenticated={!!user && !!token}
//       />

//       {/* Main routes for different sections of the app */}
//       <Routes>
//         {/* Home and General Info Pages */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutUs />} />
//         {/* <Route path="/team" element={<Cards />} /> */}
//         <Route
//           path="/login"
//           element={<SignInForm setUser={setUser} setToken={setToken} />}
//         />
//         <Route path="/forgotcredentials" element={<ForgotCredentials />} />{" "}
//         {/* Lender Section  */}
//         <Route
//           path="/lenders/:lender_id/requests/:id/newproposal"
//           element={<LenderProposalPage />}
//         />
//         <Route
//           path="/lenders/:lender_id/proposals/:id/edit"
//           element={<EditLoanProposalPage />}
//         />
//         {/* <Route path="/lenders/:id/lenderdashboard" element={<Lenderpage />} /> */}
//         <Route
//           // path="/lenders/:id/lenderdashboard"
//           path="/lender/"
//           element={
//             <ProtectedRoute
//               element={Lenderpage}
//               isAuthenticated={!!user && !!token}
//               user={user}
//               token={token}
//             />
//           }
//         />
//         <Route path="/lenders/:id/proposals" element={<LenderProposalPage />} />
//         <Route path="/lenders/:id/edit" element={<EditLenderPage />} />
//         <Route
//           path="/lenders/signup"
//           element={<NewLender setUser={setUser} setToken={setToken} />}
//         />
//         <Route path="/signup/lender" element={<></>}></Route>
//         <Route path="/lenders" element={<ListOfLenders />} />
//         {/* Borrowers Section */}
//         <Route
//           path="/borrowers/:id/edit-request/:requestId"
//           element={<EditLoanRequestForm />}
//         />
//         {/* <Route
//           path="/borrowers/:id/approved-documents"
//           element={<ApprovedDocuments />}
//         /> */}
//         <Route path="borrowers/:borrower_id/requests/:id" element={<></>} />
//         <Route
//           path="/borrowers/:borrower_id/borrowerloandetails/:id"
//           element={<ShowBorrowerLoanDetails />}
//         />
//         <Route
//           path="/borrower/"
//           element={
//             <ProtectedRoute
//               element={BDashboard}
//               isAuthenticated={!!user && !!token}
//               user={user}
//               token={token}
//             />
//           }
//         />
//         <Route
//           path="/borrowers/:id/borrowerdetails"
//           element={<ShowBorrowerDetails />}
//         />
//         <Route
//           path="/borrowers/new-request"
//           element={
//             <ProtectedRoute
//               element={LoanRequestForm}
//               isAuthenticated={!!user && !!token}
//               user={user}
//               token={token}
//             />
//           }
//         />
//         <Route path="/mock-fico-score" element={<MockFICO />} />
//         <Route path="/mock-sos-certificate" element={<MOCKSOS />} />
//         <Route path="/mock-drivers-license" element={<MockDriversLicense />} />
//         <Route path="/borrowers/:id/edit" element={<EditBorrowerPage />} />
//         <Route path="/borrowers/:id/new" element={<LoanRequestForm />} />
//         <Route
//           path="/borrowers/signup"
//           element={<NewBorrower setUser={setUser} setToken={setToken} />}
//         />
//         {/* <Route path="/borrowers/:id" element={<BDashboard />} /> */}
//         <Route path="/disclaimer" element={<></>} />
//         <Route path="/newsletter" element={<EmailNewsletter />}></Route>
//       </Routes>
//       {/* <ToastContainer /> */}

//       <Footer />
//     </>
//   );
// }

// export default App;

// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider and createTheme
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import Home from "./Pages/Homepage";
import NavBar from "./components/NavBarFolder/NavBar";
import AboutUs from "./components/AboutFolder/AboutUs";
import NewLender from "./Pages/NewLender";
import Lenderpage from "./Pages/Lenderpage";
import BDashboard from "./components/BDashboard/BDashboard";
import NewBorrower from "./Pages/NewBorrower";
import ListOfLenders from "./Pages/ListOfLenders";
import LoanRequestForm from "./components/LoanRequest/LoanRequestForm";
import EmailNewsletter from "./Pages/EmailNewsletter";
import EditBorrowerPage from "./Pages/EditBorrowerPage";
import LenderProposalPage from "./Pages/LenderProposalPage";
import EditLoanRequestForm from "./components/editLoanRequestForm/editLoanRequestForm";
import EditLoanProposalPage from "./components/LoanProposals/EditLoanProposalForm";
import SignInForm from "./Pages/LoginPage.jsx";
import ForgotCredentials from "./components/ForgotCredentials/ForgotCredentials.jsx";
import Footer from "./components/Footer/Footer.jsx";
import EditLenderPage from "./Pages/EditLenderPage.jsx";
import ShowBorrowerDetails from "./components/ShowDetailsForBorrower/ShowBorrowerDetails";
import ShowBorrowerLoanDetails from "./components/ShowDetailsForBorrower/ShowBorrowerLoanDetails";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MockFICO from "./components/MockData/MockFICO.jsx";
import MOCKSOS from "./components/MockData/MOCKSOS.jsx";
import MockDriversLicense from "./components/MockData/MockDriversLicense.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem("credentials"));
    if (credentials) {
      const { timestamp } = credentials;
      const time = new Date(timestamp);
      const now = new Date();
      const timeDif = Math.abs(time - now) / (1000 * 60 * 60);
      if (timeDif < 12) {
        setUser(credentials.user);
        setToken(credentials.token);
      } else {
        localStorage.removeItem("credentials");
      }
    }
  }, []);

  // Create a theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00a250",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00a250",
              },
              "&:hover fieldset": {
                borderColor: "#00a250",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00a250",
              },
            },
            "& label": {
              color: "#00a250",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00a250",
              },
              "&:hover fieldset": {
                borderColor: "#00a250",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00a250",
              },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* Navigation bar, displayed across all pages */}
      <NavBar
        setUser={setUser}
        setToken={setToken}
        isAuthenticated={!!user && !!token}
      />

      {/* Main routes for different sections of the app */}
      <Routes>
        {/* Home and General Info Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
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
        <Route
          path="/lender/"
          element={
            <ProtectedRoute
              element={Lenderpage}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
        <Route path="/lenders/:id/proposals" element={<LenderProposalPage />} />
        <Route path="/lenders/:id/edit" element={<EditLenderPage />} />
        <Route
          path="/lenders/signup"
          element={<NewLender setUser={setUser} setToken={setToken} />}
        />
        <Route path="/lenders" element={<ListOfLenders />} />
        {/* Borrowers Section */}
        <Route
          path="/borrowers/:id/edit-request/:requestId"
          element={<EditLoanRequestForm />}
        />
        <Route path="/borrowers/:borrower_id/requests/:id" element={<></>} />
        <Route
          path="/borrower/"
          element={
            <ProtectedRoute
              element={BDashboard}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
        <Route
          path="/borrowers/:id/borrowerdetails"
          element={<ShowBorrowerDetails />}
        />
        <Route
          path="/borrowers/new-request"
          element={
            <ProtectedRoute
              element={LoanRequestForm}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
        <Route path="/mock-fico-score" element={<MockFICO />} />
        <Route path="/mock-sos-certificate" element={<MOCKSOS />} />
        <Route path="/mock-drivers-license" element={<MockDriversLicense />} />
        <Route path="/borrowers/:id/edit" element={<EditBorrowerPage />} />
        <Route path="/borrowers/:id/new" element={<LoanRequestForm />} />
        <Route
          path="/borrowers/signup"
          element={<NewBorrower setUser={setUser} setToken={setToken} />}
        />
        <Route path="/disclaimer" element={<></>} />
        <Route path="/newsletter" element={<EmailNewsletter />}></Route>
      </Routes>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
