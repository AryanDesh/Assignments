import React, { useState, useCallback, ReactHTMLElement } from 'react';

// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of 
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

const Callback2 : React.FC = () => {
    const [inputText, setInputText] = useState('');

    const showAlert = useCallback(() => {
        window.alert(inputText)
    }, [inputText])

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter some text"
            />
            <Alert showAlert={showAlert} />
        </div>
    );
};

interface AlertProps {
    showAlert: () => void;
}

const Alert: React.FC<AlertProps> = ({showAlert}) => {
    return <button onClick={showAlert}>Show Alert</button>
}

export default Callback2