import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header";
import Home from "./Pages/Homepage";
import Lenderpage from "./Pages/Lenderpage";
import AboutUs from "./components/AboutUs";
// import LenderDashboard from "./components/LenderDashboard";
function App() {
  return (
    <>
      <Header /> {/* Call to Action Header for Services */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path='/login' element={<Login/>}/> */}
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path="/lenders/:id/lenderdashboard" element={<Lenderpage />} />
        <Route path="/borrowers/:id/borrowersdashboard" element={<></>} />
        <Route path="/lenders/:id/edit" element={<></>} />
        <Route path="/borrowers/:id/edit" element={<></>} />
        <Route path="lenders/:id/proposals" element={<></>} />
        <Route path="lenders/:id/proposals/:id" element={<></>} />
        <Route path="borrowers/:id/requests/:id" element={<></>} />
        <Route path="/disclaimer" element={<></>} />{" "}
        {/* FF: Info page for Borrowers/Lenders to know about additional services */}
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
