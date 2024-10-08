import { useCallback, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

const Callback1 =() => {
    const [count, setCount] = useState(0);

    const handleIncrement = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []); 
    const handleDecrement = useCallback(() => {
        setCount(prevCount => prevCount - 1);
    }, [])
    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

interface CounterButtonsProps {
    onIncrement: () => void;
    onDecrement: () => void;
}
const CounterButtons: React.FC<CounterButtonsProps> = ({ onIncrement , onDecrement })  => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
);
export default Callback1