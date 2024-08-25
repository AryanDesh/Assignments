import { useRef, useState } from 'react';
import Card from './Components/Card';
import './App.css'; // Import the CSS file for App component

interface ISocialMedia {
  name: string;
  URL: string;
}

function App() {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const socialMediaNameRef = useRef<HTMLInputElement>(null);
  const socialMediaURLRef = useRef<HTMLInputElement>(null);
  
  const [socialMedia, setSocialMedia] = useState<ISocialMedia[]>([]);
  const [cardCreated, setCardCreated] = useState<boolean>(false);

  const handleCreateCard = () => {
    const name = nameRef.current?.value.trim() || '';
    const desc = descRef.current?.value.trim() || '';
    if (name && desc) {
      setCardCreated(true);
    }
  };

  const handleAddSocialMedia = () => {
    const socialMediaName = socialMediaNameRef.current?.value.trim() || '';
    const socialMediaURL = socialMediaURLRef.current?.value.trim() || '';
    if (socialMediaName && socialMediaURL) {
      setSocialMedia(prev => [...prev, { name: socialMediaName, URL: socialMediaURL }]);
      if (socialMediaNameRef.current) socialMediaNameRef.current.value = '';
      if (socialMediaURLRef.current) socialMediaURLRef.current.value = '';
    }
  };

  if (cardCreated) {
    return (
      <Card
        name={nameRef.current?.value.trim() || ''}
        desc={descRef.current?.value.trim() || ''}
        socialMedia={socialMedia}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Create Your Business Card</h1>
      </div>
      <div className="form-container">
        <input
          type="text"
          ref={nameRef}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="text"
          ref={descRef}
          placeholder="Description"
          className="form-input"
        />
        <div className="social-media-inputs">
          <input
            type="text"
            ref={socialMediaNameRef}
            placeholder="Add Social Media Name"
            className="form-input"
          />
          <input
            type="text"
            ref={socialMediaURLRef}
            placeholder="Enter Social Media URL"
            className="form-input"
          />
          <button
            className="add-social-media-button"
            onClick={handleAddSocialMedia}
          >
            Add More Social Media
          </button>
        </div>
        <button
          className="create-card-button"
          onClick={handleCreateCard}
        >
          Create Card
        </button>
      </div>
    </div>
  );
}

export default App;
