import React,  { useState ,useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

const Memo1 : React.FC = () => {
    const [input, setInput] = useState(0);
    // Your solution starts here
      const expensiveValue = useMemo(()=>{
        let num = 1;
        for (let i = 1; i <= input; i++){
          num = num*i;
        }
        return num;
      }, [input]); 

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}

export default Memo1