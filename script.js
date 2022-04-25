/**
 * @TODO add decimal points, backspace, negation buttons
 */

// GLOBAL VARIABLES
const STATE_CLEAR = 0;          // nothing inputted
const STATE_ONE_NUM = 1;        // 1 operand
const STATE_ONE_NUM_OPR = 2;    // 1 operand, 1 operator
const STATE_ONE_EXPR = 3;       // 1 full expression
let state = STATE_CLEAR;

let displayValue = "";          // value on calculator's display
let numBuffer = '';             // buffer to build up a number
let expressionValues = [];      // buffer to build up an expression

const DECIMAL_PLACES = 3;
const MAX_DISPLAY_LENGTH = 10;

const DISPLAY_CONTAINER = document.querySelector(".display-container");
const KEYPAD_CONTAINER = document.querySelector(".keypad-container");

const ALL_KEYS = document.querySelectorAll(".key");
const NUMBER_KEYS = document.querySelectorAll(".number");
const OPERAND_KEYS = document.querySelectorAll('.operand');
const EQUALS_KEY = document.querySelector('.evaluate');
const CLEAR_KEY = document.querySelector('.clear');
const NEGATE_KEY = document.querySelector('.negate');
const DEL_KEY = document.querySelector('.delete');
const DECIMAL_KEY = document.querySelector('.decimal');


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
    return ((num2 === 0) ? "???" : num1 / num2);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "input one of the following: + - * /";        
    }
}

function appendDisplayValue(keyInput) {
    if (displayValue.length < MAX_DISPLAY_LENGTH) {
        displayValue += keyInput;
        if (displayValue.length > MAX_DISPLAY_LENGTH) {
            displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
        }
    }
}

function updateDisplay(character) {
    appendDisplayValue(character);
    DISPLAY_CONTAINER.textContent = displayValue;
}

function buildNumber() {
    if (state % 2 === 0) state++; // if state was CLEAR or ONE_NUM_OPR, goto ONE_NUM/ONE_EXPR, respectively
    numBuffer += this.textContent;
    updateDisplay(this.textContent);
}

function displayInvalid(errorMessage = 'INVALID') {
    displayValue = errorMessage;
    DISPLAY_CONTAINER.textContent = displayValue;
    displayValue = '';
    expressionValues = [];
    numBuffer = '';
    state = STATE_CLEAR;
}

function pushOperator() {    
    if (state % 2 === 0) { // if state was CLEAR or ONE_NUM_OPR, display error message
        displayInvalid();
        return;
    } else {
        if (state === STATE_ONE_EXPR) {
            evalExpression();
        }
        updateDisplay(this.textContent);
        expressionValues.push(parseFloat(numBuffer));
        expressionValues.push(this.textContent);
        state = STATE_ONE_NUM_OPR;
        numBuffer = '';
    }
}

function clearDisplay() {
    displayValue = '';
    numBuffer = '';
    DISPLAY_CONTAINER.textContent = displayValue;
    expressionValues.length = 0;
    state = STATE_CLEAR;
}

function roundNumber(num, decimalPlaces) {
    const roundingNum = Math.pow(10, decimalPlaces);
    return Math.round(num * roundingNum) / roundingNum;
}

function evalExpression() {
    if (state % 2 === 0) {
        displayInvalid();
        return;
    } else if (state === STATE_ONE_EXPR) {
        expressionValues.push(parseFloat(numBuffer));
        let value = operate(expressionValues[1], expressionValues[0], expressionValues[2]);
        if (value === "???") {
            displayInvalid(value);
            return;
        } else {
            value = roundNumber(value, DECIMAL_PLACES);
            displayValue = value.toString();
            DISPLAY_CONTAINER.textContent = displayValue;
            expressionValues = [];
            numBuffer = value.toString();
            state = STATE_ONE_NUM;
        }
    }   
}

function hookUpButtons() {
    NUMBER_KEYS.forEach(key => {
        key.addEventListener('click', buildNumber);
    });
    OPERAND_KEYS.forEach(key => {
        key.addEventListener('click', pushOperator);
    });
    CLEAR_KEY.addEventListener('click', clearDisplay);
    EQUALS_KEY.addEventListener('click', evalExpression);
}

hookUpButtons();