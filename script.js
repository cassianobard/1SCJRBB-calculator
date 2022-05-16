const display = document.getElementById('display')
const buttons = document.querySelectorAll('[id*=tecla]')
const operators = document.querySelectorAll('[id*=operador]')

let newNumber = true
let operator
let previousNumber

function updateDisplay(numero) {
  if (Number(numero) || Number(display.textContent) || display.textContent.includes(',')) { //evita múltiplos zeros no display
    if (newNumber) {
      display.textContent = numero
      newNumber = false
    }
    else display.textContent += numero
  }
}

const insertNumber = (event) => {
  updateDisplay(event.target.textContent)
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber))

const selectOperator = (event) => {
  newNumber = true
  operator = event.target.textContent
  previousNumber = display.textContent.replace(',', '.')
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator))

const calculate = () => {
  const actualNumber = display.textContent.replace(',', '.')
  const result = eval(`${previousNumber}${operator}${actualNumber}`).toString().replace('.', ',')
  newNumber = true
  updateDisplay(result)
}

const equal = document.querySelector("#igual")

equal.addEventListener('click', calculate)

const clearDisplay = () => {
  display.textContent = 0
  newNumber = true
}

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay)

const clearCalc = () => {
  clearDisplay()
  operator = undefined
  previousNumber = undefined
}

document.querySelector("#limparCalculo").addEventListener("click", clearCalc)

const removeLastNumber = () =>
  (display.textContent = display.textContent.slice(0, -1))

document.querySelector("#backspace").addEventListener("click", removeLastNumber)

const invertSignal = () => {
  newNumber = true
  updateDisplay(display.textContent * -1)
}

document.querySelector("#inverter").addEventListener("click", invertSignal)

const decimal = () => {
  if (newNumber) {
    display.textContent = '0,'
    newNumber = false
  }
  else {
    if (!display.textContent.includes(',')) {
      display.textContent += ','
    }
  }
}

document.querySelector("#decimal").addEventListener("click", decimal)

clearDisplay() //inicia a calculadora com '0' na tela
