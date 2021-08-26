class Calculator{
    constructor(previousDigitTextElement, currentDigitTextElement){
        this.previousDigitTextElement = previousDigitTextElement;
        this.currentDigitTextElement = currentDigitTextElement;
        this.clear(); //calling clear function
    }

    clear(){
        this.currentDigit = '';
        this.previousDigit = '';
        this.operation = undefined;
    }

    delete(){

    }

    clickNumber(number){
        if(number === '.' && this.currentDigit.includes('.')){
            return;
        }
        this.currentDigit = this.currentDigit.toString() + number.toString();
    }

    chooseOperation(operation){
        this.operation = operation;
        this.previousDigit = this.currentDigit;
        this.currentDigit = '';
    }

    calculate(){

    }

    updateDisplay(){
        this.currentDigitTextElement.innerText = this.currentDigit;
        this.previousDigitTextElement.innerText = this.previousDigit;
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear-all]');
const previousDigitTextElement = document.querySelector('[data-previous-digits]');
const currentDigitTextElement = document.querySelector('[data-current-digits]');

const calculator  = new Calculator(previousDigitTextElement, currentDigitTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.clickNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
