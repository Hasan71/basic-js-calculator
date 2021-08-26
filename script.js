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
        this.currentDigit = this.currentDigit.toString().slice(0,-1); //deleting the last digit everytime
    }

    clickNumber(number){
        if(number === '.' && this.currentDigit.includes('.')){
            return;
        }
        this.currentDigit = this.currentDigit.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentDigit === ''){
            return;
        }
        if(this.previousDigit != ''){
            this.calculate(); //if previous operation already exist , then it will call calculate func
        }
        this.operation = operation;
        this.previousDigit = this.currentDigit;
        this.currentDigit = '';
    }

    calculate(){
        let calculation;
        const previous = parseFloat(this.previousDigit);
        const current = parseFloat(this.currentDigit);
        if(isNaN(previous) || isNaN(current)){
            return;
        }
        switch (this.operation) { //working on all 4 mathmetical opeations
            case '+':
                calculation = previous + current;
                break;
                case '+':
                    calculation = previous + current;
                    break;
                case '-':
                    calculation = previous - current;
                    break;
                case '*':
                    calculation = previous * current;
                    break;
                case '÷':
                    calculation = previous / current;
                    break;
                default:
                    return;
        }
        this.currentDigit = calculation;
        this.operation = undefined;
        this.previousDigit = '';
    }

    getDisplayNumber(number){ //shows comma  in large number and fix decimal values
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intergerDisplay;
        if (isNaN(integerDigits)){
            intergerDisplay = '';
        }else{
            intergerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0});
        }

        if (decimalDigits !=null){
            return `${intergerDisplay}.${decimalDigits}`;
        } else{
            return intergerDisplay;
        }
    }

    updateDisplay(){
        this.currentDigitTextElement.innerText = this.getDisplayNumber(this.currentDigit);
        if(this.operation != null){
            this.previousDigitTextElement.innerText = 
            `${this.getDisplayNumber(this.previousDigit)} ${this.operation}` //to show operation sign beside curret digits
        }else{
            this.previousDigitTextElement.innerText = '';
        }
        
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

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clickNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})