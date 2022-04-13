// GLOBAL VARIABLES
let displayValue = "";

const MAX_DISPLAY_LENGTH = 15;
const DISPLAY_CONTAINER = document.querySelector(".display-container");
const KEYPAD_CONTAINER = document.querySelector(".keypad-container");

const ALL_KEYS = document.querySelectorAll(".key");
const NUMBER_KEYS = document.querySelectorAll(".number");
const OPERAND_KEYS = document.querySelectorAll('.operand');
const EQUALS_KEY = document.querySelector('.evaluate');
const CLEAR_KEY = document.querySelector('.clear');


// FUNCTIONS
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

// [12] [+] [7] [-] [5] [*] [3]

// [12 + 7] - 5 * 3
//     [19 - 5] * 3
//         [14 * 3]
//             [42]
function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "input one of the following: + - * /";        
    }
}

function populateDisplay(keyInput) {
    if (displayValue.length < MAX_DISPLAY_LENGTH) {
        displayValue += keyInput;
        if (displayValue.length > MAX_DISPLAY_LENGTH) {
            displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
        }
    }
}

function updateDisplay() {
    populateDisplay(this.textContent);
    DISPLAY_CONTAINER.textContent = displayValue;
}

function resetDisplay() {
    displayValue = '';
    DISPLAY_CONTAINER.textContent = displayValue;
}

function hookUpButtons() {
    NUMBER_KEYS.forEach(key => key.addEventListener('click', updateDisplay));
    OPERAND_KEYS.forEach(key => key.addEventListener('click', updateDisplay));
    CLEAR_KEY.addEventListener('click', resetDisplay);
    // add event listener for EQUALS_KEY to evaluate current expression
}

hookUpButtons();



/**
 * 1. when user presses a button, display should be updated 
 * 2. "correct" order should be: <digit> ... <digit> | <operand> <digit> ... <digit>
 * 3. when CLR pressed, clear the entire display
 * 4. when = is pressed, evaluate the expression on the display
 * 5. ORDER OF OPERATIONS IGNORED (FOR NOW)
 * 
 * - calculations always start with a number
 * - if operands are used, they MUST be followed by another number
 * - if number is too big to fit on display, it will be truncated (to MAX_DISPLAY_LENGTH digits)
 * - if equals pressed after a "correct" order of operations, evaluate the expression on screen 
 */



// POINT OF EXECUTION