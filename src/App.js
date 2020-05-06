import React, { useState } from "react";

function App() {
  const [binValue, setBinValue] = useState("");
  const [decValue, setDecValue] = useState(null);
  const [error, setError] = useState(null);

  function convertBin2Dec() {
    function validate() {
      if (!binValue) {
        throw Error("Enter a valid value");
      }

      const regex = /[^01]/g;
      if (regex.test(binValue)) {
        throw Error("Should have only 0s and 1s");
      }
    }

    function convert() {
      const length = binValue.length;
      let base = 0;
      let sum = 0;

      for (let i = length - 1; i >= 0; i--) {
        sum += binValue[i] * 2 ** base;
        base += 1;
      }

      setDecValue(sum);
    }

    try {
      setDecValue(null);
      validate();
      convert();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="main">
      <div className="input-container">
        <input
          className="input-container--input"
          placeholder="bin number"
          value={binValue}
          onChange={(e) => {
            setError(null);
            setBinValue(e.target.value);
          }}
        />
        <button className="input-container--button" onClick={convertBin2Dec}>
          CONVERT
        </button>
      </div>
      <div className="result">
        <div className="result--success">{decValue}</div>
        <div className="result--error">{error}</div>
      </div>
    </div>
  );
}

export default App;
