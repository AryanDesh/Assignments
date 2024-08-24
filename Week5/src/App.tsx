import { useRef, useState } from 'react'
import Card from './Components/Card';

interface ISocialMedia {
  name : string,
  URL : string
}
function App() {
  const name = useRef<HTMLInputElement>(null);
  const desc = useRef<HTMLInputElement>(null);
  const socialMediaName = useRef<HTMLInputElement>(null);
  const socialMediaURL = useRef<HTMLInputElement>(null);
  const [socialMedia, setSocialMedia] = useState<ISocialMedia[]>([]);
  const [cardCreated, setCardCreated] = useState<boolean>(false);
  
  const createCard = () => {
    const Name = name.current?.value.trim() || '';
    const Desc = desc.current?.value.trim() || '';
    const curSocialMediaName = socialMediaName.current?.value.trim() || '';
    const curSocialMediaURL = socialMediaURL.current?.value.trim() || '';
    if(Name && Desc && curSocialMediaName && curSocialMediaURL ){
      const curSocialMedia : ISocialMedia = { name : curSocialMediaName , URL :curSocialMediaURL}
      setSocialMedia([...socialMedia, curSocialMedia]);
      setCardCreated(true);
    }
  }
  if (cardCreated) {
    return (
      <Card
        name={name.current?.value.trim() || ''}
        desc={desc.current?.value.trim() || ''}
        socialMedia={socialMedia}
      />
    );
  }

  return (
    <>
     <h1 className="text-3xl font-bold">Go Ahead and create your business card in one click!</h1>
      <input type="text" ref={name} placeholder='Name' className="border p-2 mb-2" /> <br />
      <input type="text" ref={desc} placeholder='Description' className="border p-2 mb-2" /> <br />
      <input type="text" ref={socialMediaName} placeholder='Add Social media' className="border p-2 mb-2" /> <br />
      <input type="text" ref={socialMediaURL} placeholder='Enter Social media URL' className="border p-2 mb-2" /> <br />
      <button onClick={createCard} className="bg-blue-500 text-white p-2 rounded">Create Card</button>
 
    </>
  )
}

export default App
