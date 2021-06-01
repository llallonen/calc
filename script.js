// let keyboard = document.getElementById('calc__keyboard--main');

// let selectedBtn;

// let output = document.getElementById('calc__keyboard--main');

// keyboard.onclick = function(event) {
//     let target = event.target;

//     while (target != this) {
//       if (target.tagName == 'BUTTON') {
//         highlight(target);
//         return;
//       }
//       target = target.parentNode;
//     }
//   }

//   function highlight(node) {
//     if (selectedBtn) {
//       selectedBtn.classList.remove('highlight');
//     }
//     selectedBtn = node;
//     selectedBtn.classList.add('highlight');
// }

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    result: '',
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand  = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;

    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, SecondOperand, operator) {
    if (operator === '+') {
        return firstOperand + SecondOperand;
    } else if (operator === '*') {
        return firstOperand * SecondOperand
    } else if (operator === '-') {
        return firstOperand - SecondOperand
    } else if (operator === '/') {
        return firstOperand / SecondOperand
    }

    return SecondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector('.calc__display');
  display.value = calculator.displayValue;
}

updateDisplay();


const keys = document.querySelector('.calc__keyboard--main');
keys.addEventListener('click', (event) => {

    const { target } = event;

    if(!target.matches('button')) {
        return;
    }

    if(target.classList.contains('btn--operator')) {
        handleOperator(target.value);
		updateDisplay();
        return;
    }

    if(target.classList.contains('btn--clear')) {
        console.log('clear', target.value);
        return;
    }

    if(target.classList.contains('btn--point')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    
    inputDigit(target.value);
    updateDisplay();
});
