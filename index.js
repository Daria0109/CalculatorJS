class Calculator {
  constructor(prevDisplayElement, currentDisplayElement) {
    this.prevDisplayElement = prevDisplayElement;
    this.currentDisplayElement = currentDisplayElement;
    this.clear();
  }

  clear() {
    this.prevNumber = "";
    this.currentNumber = "";
    this.operation = undefined;
  }

  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  getOperation(operation) {
    if (this.currentNumber === "" || this.currentNumber === ".") return;
    if (this.prevNumber !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.prevNumber = this.currentNumber;
    this.currentNumber = "";
  }

  calculate() {
    let result;
    const prev = parseFloat(this.prevNumber);
    const current = parseFloat(this.currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "x":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
    }
    this.currentNumber = result;
    this.prevNumber = "";
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerForDisplay;
    if (isNaN(integerDigits)) {
      integerForDisplay = "";
    } else {
      integerForDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerForDisplay}.${decimalDigits}`;
    } else {
      return integerForDisplay;
    }
  }

  setNumberToDisplay(number) {
    if (number === "." && this.currentNumber.toString().includes(".")) return;
    this.currentNumber = this.currentNumber.toString() + number.toString();
  }

  updateDisplay() {
    this.currentDisplayElement.innerText = this.getDisplayNumber(
      this.currentNumber
    );
    if (this.operation != null) {
      this.prevDisplayElement.innerText = `${this.getDisplayNumber(
        this.prevNumber
      )} ${this.operation}`;
    } else {
      this.prevDisplayElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll(".numb");
const operationButtons = document.querySelectorAll(".operator");
const clearAllButton = document.querySelector(".clear-all");
const deleteButton = document.querySelector(".delete");
const resultButton = document.querySelector(".result");
const prevDisplayElement = document.querySelector(".calc__display-previous");
const currentDisplayElement = document.querySelector(".calc__display-current");

const calc = new Calculator(prevDisplayElement, currentDisplayElement);

for (let numberBtn of numberButtons) {
  numberBtn.addEventListener("click", () => {
    calc.setNumberToDisplay(numberBtn.innerText);
    calc.updateDisplay();
  });
}

for (let operationBtn of operationButtons) {
  operationBtn.addEventListener("click", () => {
    calc.getOperation(operationBtn.innerText);
    calc.updateDisplay();
  });
}

clearAllButton.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});

resultButton.addEventListener("click", () => {
  calc.calculate();
  calc.updateDisplay();
});
