import React from 'react';
import './AboutUs.css'; 

const teamMembers = [
  {
    name: 'Katlyn Winegardner',
    role: 'Fullstack Developer',
    imageUrl: '/images/katlyn.jpg' 
  },
  {
    name: 'Rizel',
    role: 'Backend Engineer',
    imageUrl: '/images/john.jpg'
  },
  {
    name: 'Manoel',
    role: 'UI/UX Designer',
    imageUrl: '/images/jane.jpg'
  },
  {
    name: 'Aaron',
    role: 'Fullstack Developer',
    imageUrl: 'Images/Aaron.jpeg'
  },
  {
    name: 'Kubra',
    role: 'Fullstack Developer',
    imageUrl: '/images/emily.jpg'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className='first-rectangle'>
        <h2>From a Simple Idea to a Bold Mission – Discover Who We Are</h2>
        <p>
        Our app transforms the small-ticket equipment financing market by giving borrowers and lenders a seamless, 
        transparent platform to connect. Borrowers can list their loan requirements with ease, while lenders gain access 
        to real-time opportunities tailored to their interests – all without the hassle of multiple credit pulls that can
         harm a business’s future. Whether you’re starting out or expanding, we simplify the financing process so you can focus on what matters most – growing your business.
        </p>
      </div>

      <div className='second-rectangle'>
        <h3>Discover Our Mission</h3>
        <p>  Our team is dedicated to creating innovative solutions that help small businesses grow. 
          Together, we are building a platform that connects borrowers with lenders in a seamless,
           secure, and transparent way.</p>
      </div>

      <div className="team-section">
        <h1>The Team Behind MoneyMoneyMoney</h1>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div key={index} className='team-member'>
              <div className="member-photo-wrapper">
                <img src={member.imageUrl} className="team-member-photo" alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className='bottom-section'></div>
    </div>
  );
};

export default AboutUs;

