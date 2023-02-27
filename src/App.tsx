import styles from "./App.module.css";

import { useState } from "react";
import KeyPad from "./components/KeyPad";
import { buttonValues } from "./data";

interface Calc {
  operator: string;
  operand: number;
  total: number;
}

function App() {
  const [calc, setCalc] = useState<Calc>({
    operator: "",
    operand: 0,
    total: 0,
  });

  const reset = () => {
    setCalc({
      operator: "",
      operand: 0,
      total: 0,
    });
  };

  const getOperation = (a: number, b: number, sign: string) => {
    let operation;
    switch (sign) {
      case "+":
        operation = a + b;
        break;
      case "-":
        operation = a - b;
        break;
      case "×":
        operation = a * b;
        break;
      default:
        operation = a / b;
        break;
    }
    return operation;
  };

  const insertPositiveOrNegative = () => {
    const { operand, total } = calc;
    setCalc({
      ...calc,
      operand: operand ? operand * -1 : 0,
      total: total ? total * -1 : 0,
      operator: "",
    });
  };

  const equals = () => {
    const { operand, operator, total } = calc;
    if (operator && operand) {
      setCalc({
        ...calc,
        total: !operand ? 0 : getOperation(total, operand, operator),
        operator: "",
        operand: 0,
      });
    }
  };

  const calculatePercent = () => {
    const { operand, total } = calc;

    setCalc({
      ...calc,
      operand: operand / 100,
      total: total / 100,
      operator: "%",
    });
  };

  const operatorHandler = (sign: string) => {
    const { operand, total, operator } = calc;
    setCalc({
      ...calc,
      operator: sign,
      total: !operand
        ? total
        : !total
        ? operand
        : getOperation(total, operand, operator),
      operand: 0,
    });
  };

  const decimalHandler = () => {
    const { operand } = calc;
    const newNumber = operand / 10;

    setCalc({
      ...calc,
      operand: !operand.toString().includes(".") ? newNumber : operand,
    });
  };

  const numbers = (num: string) => {
    const { operand, total, operator } = calc;
    
    setCalc({
      ...calc,
      operand:
        operand % 1 === 0 && !operand.toString().includes(".")
          ? Number(operand + num)
          : 0,
      total: !operator ? 0 : total,
    });
  };

  

  const handleCommas = (num: number) => {
    if (calc.operator !== "%") {
      return Intl.NumberFormat("en-US").format(num);
    }
    return num;
  };

  const reduceFontSizeAsInputGrows = () => {
    const { total, operand } = calc;
    if (total.toString().length >= 20 || operand.toString().length >= 20) {
      return "10px";
    }
    if (total.toString().length >= 6 || operand.toString().length >= 6) {
      return "1rem";
    }

    return "3rem";
  };

  const handleOnClick = (e: any) => {
    const { innerHTML } = e.target;

    switch (innerHTML) {
      case "AC":
        reset();
        break;
      case "+/-":
        insertPositiveOrNegative();
        break;
      case "%":
        calculatePercent();
        break;
      case "=":
        equals();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        operatorHandler(innerHTML);
        break;
      case ".":
        decimalHandler();
        break;
      default:
        numbers(innerHTML);
        break;
    }
  };

  const display = calc.operand
    ? handleCommas(calc.operand)
    : handleCommas(calc.total);

  return (
    <div className={styles.wrapper}>
      <div className={styles.calcGrid}>
        <div className={styles.total}>
          <div style={{ fontSize: reduceFontSizeAsInputGrows() }}>
            {display}
          </div>
        </div>
        {buttonValues.map(({ className, label }) => (
          <KeyPad
            key={label}
            className={className || ""}
            value={label}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
