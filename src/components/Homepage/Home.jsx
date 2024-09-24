// src/components/Homepage/Home.jsx
import React from "react";
import "./Home.scss";
import LenderPhoto from "../../assets/LenderPhoto.jpeg";
import BorrowerPhoto from "../../assets/BorrowerPhoto.jpeg";

export default function Home() {
  return (
    <main className="home-container">
      <section className="home-container__landing-intro">
        <h1>Title for Banking</h1>
        <img src="" alt="possible-img" id="" />
      </section>
      <section className="home-container__badge-names">
        <h2>Sponsors 1</h2> {/* Horizontal display */}
        <h2>Sponsors 2</h2>
        <h2>Sponsors 3</h2>
        <h2>Sponsors 4</h2>
        <h2>Sponsors 5</h2>
      </section>
      {/*Hopscotch Patch work display */}
      <section className="home-container__lender-CTA">
        <div className="details-container">
          <p className="lender-details">
            Diversify your Portfolio by Partnering with M-cubed for endless
            Possibilites
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
          <p>Small </p>
          <p className="borrower-details">
            {" "}
            <span>Apply</span> for faster funding for qualifying loan requests
          </p>
        </div>
      </section>
      <section className="home-container__container-5"></section>
    </main>
  );
}
