import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [factorial, setFactorial] = useState([]);

  const myfactorial = n => !(n > 1) ? 1 : myfactorial(n - 1) * n;
  const onSubmit = e => {
    e.preventDefault();
    const formElems = e.target.elements;
    setFactorial( myfactorial(parseInt(formElems.number.value)))


  }
  return (
      <>
  <div>
    <h1>Factorial Calculator</h1>
    <form onSubmit={onSubmit}>
      <input name="number" type="number" placeholder="Enter a number..." />
      <br />
      <button>Calculate Factorial</button>
    </form>
    <h2>Factorial: {factorial}</h2>
  </div>
  </>
  );
}

export default App;
