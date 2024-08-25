import React from 'react';
import './Card.css'; // Import the CSS file

interface ISocialMedia {
  name: string;
  URL: string;
}

interface CardProps {
  name: string;
  desc: string;
  socialMedia: ISocialMedia[];
}

const Card: React.FC<CardProps> = ({ name, desc, socialMedia }) => {
  return (
    <div className="card-container">
      <h2 className="card-title">{name}</h2>
      <p className="card-description">{desc}</p>
      <div className="card-social-media">
        <h3>Social Media</h3>
        <ul>
          {socialMedia.map((media, index) => (
            <li key={index}>
              <a href={media.URL} target="_blank" rel="noopener noreferrer">
                {media.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
