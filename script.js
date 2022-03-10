class Calculadora {
    constructor(primeiroOperador, segundoOperador) {
        this.numeroAntes = primeiroOperador
        this.numeroAtual = segundoOperador
        this.limpador()
    }

    limpador() {
        this.operador2 = ''
        this.operador1 = ''
        this.operation = undefined
    }

    delete() {
        this.operador2 = this.operador2.toString().slice(0, -1)
    }

    juntaNumeros(numero) {
        if (numero === '.' && this.operador2.includes('.')) return
        this.operador2 = this.operador2.toString() + numero.toString()
    }

    escolhaDeSinais(operation) {
        if (this.operador2 === '') return
        if (this.operador1 !== '') {
            this.compute()
        }
        this.operation = operation
        this.operador1 = this.operador2
        this.operador2 = ''
    }

    compute() {
        let calculo
        const antes  = parseFloat(this.operador1)
        const depois = parseFloat (this.operador2)
        if (isNaN(antes) || isNaN(depois)) return
        switch(this.operation){
            case '+':
                calculo = antes + depois
                break
            case '-':
                calculo = antes - depois
                break
            case '*':
                calculo = antes * depois
                break
            case '÷':
                calculo = antes / depois
                break
            default: 
            return 
        }
        this.operador2 = calculo
        this.operation = undefined
        this.operador1 = ''
    }

    getNumeroMostrado(numero){
        const stringNumero = numero.toString()
        const DigitosInt = parseFloat(stringNumero.split('.')[0])
        const DigitosDecimais = stringNumero.split('.')[1]
        let integerDisplay
        if(isNaN(DigitosInt)) {
            integerDisplay = ''
        } else {
            integerDisplay = DigitosInt.toLocaleString('pt', {
                maximumFractionDigits: 0})
        }
        if (DigitosDecimais != null){
            return `${integerDisplay}.${DigitosDecimais}`
        }else{
            return integerDisplay
        }
    }
    

    updateMostrador() {
        this.numeroAtual.innerText = this.getNumeroMostrado(this.operador2)
        if(this.operation != null) {
            this.numeroAntes.innerText = `${this.getNumeroMostrado(this.operador1)} ${this.operation}`
        }else{
        this.numeroAntes.innerText = ''
        }
    }

}


const botaoNumeros = document.querySelectorAll('[data-num]')
const botaoOperacionais = document.querySelectorAll('[data-op]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoDelete = document.querySelector('[data-del]')
const botaoLimpadorAC = document.querySelector('[data-limpar]')
const primeroOperador = document.querySelector('[data-operadoresAntes]')
const segundoOperador = document.querySelector('[data-operadoresAtuais]')


const calculadora = new Calculadora(primeroOperador, segundoOperador)

botaoNumeros.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.juntaNumeros(button.innerText)
        calculadora.updateMostrador()
    })
})

botaoOperacionais.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.escolhaDeSinais(button.innerText)
        calculadora.updateMostrador()
    })
})

botaoIgual.addEventListener('click', button => {
    calculadora.compute()
    calculadora.updateMostrador()
})

botaoLimpadorAC.addEventListener('click', button => {
    calculadora.limpador()
    calculadora.updateMostrador()
})

botaoDelete.addEventListener('click', button => {
    calculadora.delete()
    calculadora.updateMostrador()
})

