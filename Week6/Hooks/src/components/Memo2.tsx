import React, { useMemo, useState } from 'react'

// In this assignment, you will create a component that renders a large list of sentences and includes an input field for filtering these items. 
// The goal is to use useMemo to optimize the filtering process, ensuring the list is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value in the dependency array

const words = ["hi", "my", "name", "is", "for", "to", "random", "word" ];
const TOTAL_LINES = 1000;
const ALL_WORDS : string[]= [];
for (let i = 0; i < TOTAL_LINES; i++) {
    let sentence = "";
    for (let j = 0; j < words.length; j++) {
        sentence += (words[Math.floor(words.length * Math.random())])
        sentence += " "
    }
    ALL_WORDS.push(sentence);
}


const Memo2 :React.FC = () => {

    const [input, setInput] = useState("")
    const [sentences] = useState(ALL_WORDS)

    const results = useMemo(() => {
        return sentences.filter(x => x.includes(input))
    }, [input])

  return (
    <div>
        <input
        value ={input}
        onChange ={(e) => {setInput(e.target.value)}}
        >
        </input>
        <div>
            {results}
        </div>
    </div>
  )
}

export default Memo2