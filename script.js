/**
 * @TODO make calculator evaluate 1 pair of numbers at a time
 * @TODO improve CSS of calculator 
 * @TODO bug where display doesn't work properly???
 *      - when subtracting a large number from another number 
 *      - while typing out the large number, display snaps back and can't scroll
 * @TODO add decimal points, backspace, negation buttons
 */

// GLOBAL VARIABLES
let displayValue = "";
let isScreenFull = false;
let numBuffer = '';
let expressionValues = [];

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
    if (num2 === 0) {
        return "???";
    }
    return num1 / num2;
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

function populateDisplay(keyInput) {
    if (displayValue.length < MAX_DISPLAY_LENGTH) {
        displayValue += keyInput;
        if (displayValue.length > MAX_DISPLAY_LENGTH) {
            displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
            isScreenFull = true;
        }
    }
}

function updateDisplay() {
    populateDisplay(this.textContent);
    DISPLAY_CONTAINER.textContent = displayValue;
}

function pushNumberQueue() {
    numBuffer += this.textContent;
}

function pushOperandQueue() {
    expressionValues.push(parseFloat(numBuffer));
    expressionValues.push(this.textContent);
    numBuffer = '';
}

function resetDisplay() {
    displayValue = '';
    numBuffer = '';
    DISPLAY_CONTAINER.textContent = displayValue;
    expressionValues.length = 0;
    isScreenFull = false;
}

function isValidExpression() {
    return !expressionValues.includes(NaN);
}


/**
 * @TODO change this to evaluate ONLY ONE PAIR OF NUMBERS at a time
 */
function evalExpression() {

    expressionValues.push(parseInt(numBuffer));
    numBuffer = '';
    
    if (isValidExpression()) {
        
        let num1;
        let num2;
        let operand;
        let numStored = false;

        for (let i = 0; i < expressionValues.length; i++) {
            if (i % 2 === 0) { // number
                if (numStored) {
                    num2 = expressionValues[i];
                    num1 = operate(operand, num1, num2);
                } else {
                    num1 = expressionValues[i];
                    numStored = true;
                }
            } else { // operand
                operand = expressionValues[i];
            }
        }

        if (num1 === "???") {
            expressionValues.length = 0;
            DISPLAY_CONTAINER.textContent = num1;
            displayValue = '';
            isScreen = false;
            numBuffer = '';
            return;
        }

        num1 = Number(num1.toFixed(3)); // round to 3 decimal places, if need be

        let valueParsed = num1.toString();
        console.log('valueParsed = ' + valueParsed);
        if (valueParsed.length > MAX_DISPLAY_LENGTH) { // truncate display value if too long
            displayValue = valueParsed.slice(0, MAX_DISPLAY_LENGTH);
            isScreenFull = true;
        } else {
            displayValue = valueParsed;
        }
        expressionValues.length = 0;
        DISPLAY_CONTAINER.textContent = displayValue;
        numBuffer = valueParsed;
        isScreenFull = false;
    } else {
        displayValue = "INVALID EXPR";
        DISPLAY_CONTAINER.textContent = displayValue;
        displayValue = '';
        expressionValues.length = 0;
        numBuffer = '';
    }
}

function hookUpButtons() {
    NUMBER_KEYS.forEach(key => {
        key.addEventListener('click', updateDisplay);
        key.addEventListener('click', pushNumberQueue);
    });
    OPERAND_KEYS.forEach(key => {
        key.addEventListener('click', updateDisplay);
        key.addEventListener('click', pushOperandQueue);
    });
    CLEAR_KEY.addEventListener('click', resetDisplay);
    EQUALS_KEY.addEventListener('click', evalExpression);
}

hookUpButtons();


// POINT OF EXECUTION