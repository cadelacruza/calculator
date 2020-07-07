const calculator = {
  displayValue: "0",
  firstNum: null,
  waitingForSecond: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector("#input");
  display.textContent = calculator.displayValue;
}
updateDisplay();

const container = document.querySelector("main");
container.addEventListener("click", (e) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  } else if (target.classList.contains("operation")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  } else if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  } else if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {
  const { displayValue, waitingForSecond } = calculator;
  if (waitingForSecond === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecond = false;
  } else {
    calculator.displayValue =
      displayValue === "0 " ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecond === true) {
    return;
  }
  if (calculator.displayValue.includes(dot)) {
    return;
  } else {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstNum, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecond) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstNum === null) {
    calculator.firstNum = inputValue;
  } else if (operator) {
    const currentValue = firstNum || 0;
    const result = performCalculation[operator](firstNum, inputValue);
    calculator.displayValue = String(result);
    calculator.firstNum = result;
  }

  calculator.waitingForSecond = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  "/": (firstNum, secondOperand) => firstNum / secondOperand,

  x: (firstNum, secondOperand) => firstNum * secondOperand,

  "+": (firstNum, secondOperand) => firstNum + secondOperand,

  "-": (firstNum, secondOperand) => firstNum - secondOperand,

  "=": (firstNum, secondOperand) => secondOperand,
};
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}
