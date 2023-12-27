let displayValue = '0';
let timeoutId;

function updateDisplay() {
  document.getElementById('display').innerText = displayValue;
}

function appendToDisplay(value) {
  if (displayValue === '0') {
    displayValue = value;
  } else {
    displayValue += value;
  }
  updateDisplay();
}

function clearDisplay() {
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
    } else {
      displayValue = '0';
    }
    updateDisplay();
  }

  function handleClearRelease() {
    clearTimeout(timeoutId);
  }
  
  
  function handleClearLongPress() {
    timeoutId = setTimeout(function() {
      displayValue = '0';
      updateDisplay();
    }, 1000);
  }
  

function calculateResult() {
  try {
    displayValue = eval(displayValue).toString();
  } catch (error) {
    displayValue = 'Error';
  }
  updateDisplay();
}

// Добавлен обработчик событий для клавиатуры
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;
  
  if (isNumeric(key)) {
    appendToDisplay(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Escape') {
    clearDisplay();
  }
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}

document.getElementById('clearButton').addEventListener('click', clearDisplay);
document.getElementById('clearButton').addEventListener('mousedown', handleClearLongPress);
document.getElementById('clearButton').addEventListener('mouseup', handleClearRelease);
document.getElementById('clearButton').addEventListener('mouseleave', handleClearRelease);

updateDisplay();
