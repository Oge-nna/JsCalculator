class Calculator {
    constructor(oldValueTextElement, newValueTextElement) {
        this.oldValueTextElement = oldValueTextElement
        this.newValueTextElement = newValueTextElement
        this.clear()
    }

    clear() {
        this.newValue = ''
        this.oldValue = ''
        this.operation = undefined
    }

    delete() {
        this.newValue = this.newValue.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.newValue.includes('.')) return
        this.newValue = this.newValue.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.newValue === '') return
        if (this.oldValue !== '') (
            this.compute()
        )
        this.operation = operation
        this.oldValue = this.newValue
        this.newValue = ''


    }

    compute() {
        let computation
        const prev = parseFloat(this.oldValue)
        const current = parseFloat(this.newValue)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
           case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.newValue = computation
        this.operation = undefined
        this.oldValue = ''

    }

    updateDisplay() {
        this.newValueTextElement.innerText = this.newValue
        this.oldValueTextElement.innerText = this.oldValue
    }
}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const oldValueTextElement = document.querySelector('[data-old-value]')
const newValueTextElement = document.querySelector('[data-new-value]')

const calculator = new Calculator(oldValueTextElement, newValueTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})