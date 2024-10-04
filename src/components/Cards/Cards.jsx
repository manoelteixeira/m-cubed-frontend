import React from 'react';
import './Cards.css';

const teamMembers = [
  {
    name: "Katlyn Winegardner",
    role: "Fullstack Developer",
    description: "",
    linkedIn: "",
    gitHub: "",
    imageUrl: "/images/katlyn.jpg",
  },
  {
    name: "Rizel",
    role: "Backend Engineer",
    description: "",
    linkedIn: "",
    gitHub: "",
    imageUrl: "/images/john.jpg",
  },
  {
    name: "Manoel",
    role: "UI/UX Designer",
    description: "",
    linkedIn: "",
    gitHub: "",
    imageUrl: "/images/jane.jpg",
  },
  {
    name: "Aaron",
    role: "Fullstack Developer",
    description: "",
    linkedIn: "",
    gitHub: "Images/Aaron.jpeg",
  },
  {
    name: "Kubra",
    role: "Fullstack Developer",
    description: "",
    linkedIn: "",
    gitHub: "",
    imageUrl: "/images/emily.jpg",
  },
];

const Cards = () => {
  return (
    <div>
      {teamMembers.map((member, index) => (
        <div key={index} className="member">
          <div className="photo-wrapper">
            <img
              src={member.imageUrl}
              className="member-photo"
              alt={member.name}
            />
          </div>
          <div className="member-container">
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
