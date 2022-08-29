const buttons = document.querySelectorAll('.keyboardButton');
const inputField = document.querySelector('.inputField');
let previousSymbolType;
let isFinished = false;


setupCalculator()

function setupCalculator() {
  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  })
}

function handleClick(event) {
  checkStatus()

  const button = event.currentTarget;
  // с просто target getAttribute не работает
  const currentSymbolType = button.getAttribute('data-symbol-type');
  const currentSymbol = button.getAttribute('data-symbol');

  if (currentSymbolType === 'operation') {
    handleOperation(currentSymbol);
  } else {
    handleSymbol(currentSymbol, currentSymbolType);
  }
}

function handleSymbol(symbol, currentSymbolType) {
  if (symbol === '=') {
    const expressionResult = eval(`${preprocessExpression(inputField.innerHTML)}`);
    inputField.innerHTML += ` = ${expressionResult}`;

    isFinished = true;
  } else {
    let appendedSymbol = (previousSymbolType === 'number' && currentSymbolType === 'operand') ? ` ${symbol} ` : `${symbol}`;
    inputField.innerHTML += appendedSymbol;

    previousSymbolType = currentSymbolType;
  }
}

function checkStatus() {
  if (isFinished) {
    clearAll();
    isFinished = false;
  }
}

function preprocessExpression(expression) {
  expression = expression.replace('×', '*');
  expression = expression.replace('÷', '/');

  return expression
}

function handleOperation(currentSymbol) {
  if (currentSymbol === 'clear') {
    clearLastSymbol();
  } else {
    clearAll();
  }
}

function clearAll() {
  inputField.innerHTML = "";
}

function clearLastSymbol() {
  inputField.innerHTML = inputField.innerHTML.slice(0, -1);
}

