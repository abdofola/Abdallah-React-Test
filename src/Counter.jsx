import React from "react";

export default function Couner() {
  const [count, setCount] = React.useState(0);
  const increment = (e) => setCount(count + 1);
  const decrement = (e) => setCount(count - 1);

  return (
    <div>
        <div>Count is: {count} </div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
}
