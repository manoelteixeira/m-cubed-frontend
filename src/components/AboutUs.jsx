import React from 'react';
import './AboutUs.css'; 

const teamMembers = [
  {
    name: 'Katlyn Winegardner',
    role: 'Fullstack Developer',
    description: 'Katlyn is passionate about building user-friendly applications that solve real-world problems. She focuses on both frontend and backend development for our projects.',
    imageUrl: '/images/katlyn.jpg' 
  },
  {
    name: 'Rizel',
    role: 'Backend Engineer',
    description: 'John specializes in database management and API development, ensuring the backend services run efficiently and scale as needed.',
    imageUrl: '/images/john.jpg'
  },
  {
    name: 'Manoel',
    role: 'UI/UX Designer',
    description: 'Jane designs intuitive interfaces and enhances user experiences to ensure that our platform is easy to navigate and visually appealing.',
    imageUrl: '/images/jane.jpg'
  },
  {
    name: 'Aaron',
    role: 'Product Manager',
    description: 'Emily ensures the team stays on track and works towards delivering features that align with the project’s overall vision.',
    imageUrl: '/images/emily.jpg'
  },
  {
    name: 'Kubra',
    role: 'Product Manager',
    description: 'Emily ensures the team stays on track and works towards delivering features that align with the project’s overall vision.',
    imageUrl: '/images/emily.jpg'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p>
        Our team is dedicated to creating innovative solutions that help small businesses grow. Together, we are building a platform that connects borrowers with lenders in a seamless, secure, and transparent way.
      </p>
      
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.imageUrl} alt={`${member.name}'s photo`} className="team-member-photo" />
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
