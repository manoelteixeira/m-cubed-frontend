import React from "react";
import { Route, Routes } from "react-router-dom";
import Network from "./components/Network";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import AboutUs from "./components/AboutUs.jsx";
import "./App.css";

const App = () => {
  return (
    <>
      <Header /> {/* Call to Action Header for Services */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/login' element={<Login/>}/> */}
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path="/AboutUs" element={<AboutUs />} />
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
    </>
  );
};

export default App;
