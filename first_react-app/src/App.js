import { useState, useEffect } from "react";

import "./App.css";

// Component => A piece of code that returns or rendors some JSX(combined html and javascript)

const Person = (props) => {
  return (
    <>
      <h1>Name:{props.name}</h1>
      <h1>Last Name:{props.lastName}</h1>
    </>
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    alert("You have changed the counter to " + counter);
  }, [counter]);
  return (
    <div className="App">
      <Person name={"Sinmbf"} lastName={"Lost"} />

      <button onClick={() => setCounter((prevCount) => prevCount - 1)}>
        -
      </button>
      <h1>{counter}</h1>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
        +
      </button>
    </div>
  );
};

export default App;
