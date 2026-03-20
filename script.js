let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        if (currentInput.length < 10) {
            if (num === '.' && currentInput.includes('.')) return;
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current === 0 ? "ERR_DIV_0" : prev / current; break;
        default: return;
    }

    if (typeof result === 'number' && result.toString().length > 10) {
        result = parseFloat(result.toFixed(7));
    }

    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

updateDisplay();