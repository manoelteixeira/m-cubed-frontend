// src/components/Homepage/Home.jsx
import React from "react";
import "./Home.scss";
import LenderPhoto from "../../assets/LenderPhoto.jpeg";
import BorrowerPhoto from "../../assets/BorrowerPhoto.jpeg";
import Handshake from '../../assets/handshake-no-bg.png'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <section className="home-container__landing-intro">
        <div className="first-slide-display">
          <h1>M-cubed: Borrower <span>Smarter</span>, Lend With <span>Confidence!</span> </h1>
          <div className="btn-email-entry">
            <p>Sign up for our Newsletter if want to keep updated with all things cubey</p>
            <input type="text" placeholder="Enter Email Here" name='email-entry' />
            <button>Sign Up</button>
            <Link>Already Have an account?</Link>
          </div>
        </div>
        <img src={Handshake} alt="possible-img" id="handshake" />
      </section>
      <section className="home-container__badge-names">
        {/* Horizontal display */}
        <h2>Sponsors 1</h2> 
        <h2>Sponsors 2</h2>
        <h2>Sponsors 3</h2>
        <h2>Sponsors 4</h2>
        <h2>Sponsors 5</h2>
      </section>
      {/*Hopscotch Patch work display */}
      <section className="home-container__lender-CTA">
        <div className="details-container">
          <p className="lender-details">
            <em>Diversify</em> your Portfolio by Partnering with M-cubed for endless 
             <strong> Possibilites</strong>...
          </p>
          <button className="banner-signup">Sign up Now</button>
        </div>
        <img src={LenderPhoto} alt="borrower copilot pic" id="lender-photo" />
      </section>
      <section className="home-container__borrower-CTA">
        <img
          src={BorrowerPhoto}
          alt="borrwer copilot pic"
          id="borrower-photo"
        />
        <div>
          <div className="designer-"></div>
          <p className="borrower-details">
            {" "}
            <span>Apply </span>for <em> faster</em> funding for Qualifying Loan Requests with ease with you in mind with every step of the way!
          </p>
        </div>
      </section>
      <section className="home-container__container-5"></section>
    </main>
  );
}
