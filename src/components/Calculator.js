import React, { useState } from "react";
import { evaluate } from "mathjs";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      if (!expression) {
        setResult("Error");
        return;
      }

      let evaluatedResult = evaluate(expression);
      if (expression === "0/0") {
        setResult("NaN");
      } else if (!isFinite(evaluatedResult)) {
        setResult("Infinity");
      } else {
        setResult(evaluatedResult);
      }
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input type="text" value={expression} readOnly />
      <div className="result">{result}</div>
      <div className="buttons">
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/"].map(
          (btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "=") {
                  handleCalculate();
                } else if (btn === "C") {
                  handleClear();
                } else {
                  handleClick(btn);
                }
              }}>
              {btn}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Calculator;
