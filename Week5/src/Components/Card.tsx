import React from 'react';

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
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-gray-600">{desc}</p>
      <div className="mt-4">
        <h3 className="text-xl font-medium">Social Media</h3>
        <ul>
          {socialMedia.map((media, index) => (
            <li key={index} className="mt-2">
              <a href={media.URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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
