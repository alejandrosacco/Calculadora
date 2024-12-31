let input = document.getElementById('input');
let output = document.getElementById('output');
let numbers = document.querySelectorAll('.number');
let letters = document.querySelectorAll('.letter');
let operators = document.querySelectorAll('.op');
let functions = document.querySelectorAll('.function');
let auxiliares = document.querySelectorAll('.aux');

document.addEventListener('DOMContentLoaded', ()=>{
    input.value = '';
    output.value = '';
    localStorage.setItem('disp', 'false');
})

/*******************************Logica de operaciones*******************************/

function operacion(inputValue){
    let operando1;
    let operando2;
    let aux;
    if(inputValue.indexOf('(') != -1){
        operando1 = inputValue.slice(inputValue.indexOf('(')+1, inputValue.lastIndexOf(')'));
        console.log(operando1);
        aux = inputValue.slice(inputValue.lastIndexOf(')')+1, inputValue.lastIndexOf(')')+2);
        console.log(aux);
        operando2 = inputValue.slice(inputValue.lastIndexOf(')')+2);
        console.log(operando2);
        switch(aux){
            case '+':
                return operacion(operando1) + operacion(operando2);
            case '-':
                return operacion(operando1) - operacion(operando2);
            case '*':
                return operacion(operando1) * operacion(operando2);
            case '/':
                return operacion(operando1) / operacion(operando2);
        }
    }    
    else if(inputValue.indexOf('+') != -1){
        operando1 = inputValue.slice(0, inputValue.indexOf('+'));
        operando2 = inputValue.slice(inputValue.indexOf('+')+1);
        return operacion(operando1) + operacion(operando2);
    }
    else if(inputValue.indexOf('-') != -1){
        operando1 = inputValue.slice(0, inputValue.indexOf('-'));
        operando2 = inputValue.slice(inputValue.indexOf('-')+1);
        return operacion(operando1) - operacion(operando2);
    }
    else if(inputValue.indexOf('*') != -1){
        operando1 = inputValue.slice(0, inputValue.indexOf('*'));
        operando2 = inputValue.slice(inputValue.indexOf('*')+1);
        return operacion(operando1) * operacion(operando2);
    }
    else if(inputValue.indexOf('/') != -1){
        operando1 = inputValue.slice(0, inputValue.indexOf('/'));
        operando2 = inputValue.slice(inputValue.indexOf('/')+1);
        return operacion(operando1) / operacion(operando2);
    }
    else
        return parseFloat(inputValue);
}

/***********************************************************************************/


/*******************************Funcionalidad de botones*******************************/

document.getElementById('display').addEventListener('click', ()=>{
    localStorage.setItem('disp', 'true');
    document.getElementById('currentMode').innerHTML = 'Current mode: Display';
});

document.getElementById('calculate').addEventListener('click', ()=>{
    localStorage.setItem('disp', 'false');
    document.getElementById('currentMode').innerHTML = 'Current mode: Calculate';
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        input.value += parseFloat(number.innerHTML);
    });
});

letters.forEach(letter => {
    letter.addEventListener('click', () => {
        input.value += letter.innerHTML;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        input.value += operator.innerHTML;
    });
});

auxiliares.forEach(aux => {
    aux.addEventListener('click', () => {
        input.value += aux.innerHTML;
    });
});

functions.forEach(func => {
    func.addEventListener('click', () => {
        let inputValue = input.value;
        let xy = true;
        if(inputValue == ''){
            inputValue = output.value;
            xy = false;
        }        
        if(localStorage.getItem('disp') == 'true'){
            switch(func.id){
                case 'exp':
                    output.value = "\\[\e^{(" + inputValue + ")}\\]";
                    console.log(output.value);
                break;
                case 'log':
                    output.value = "\\[\log({" + inputValue + "})\\]";
                break;
                case 'cos':
                    output.value = "\\[\cos({" + inputValue + "})\\]";
                    console.log(output.value);
                break;
                case 'sen':
                    output.value = "\\[\sen({" + inputValue + "})\\]";
                break;
                case 'tan':
                    output.value = "\\[\ttan({" + inputValue + "})\\]";
                break;
                case 'sqrt':
                    output.value = "\\[\\sqrt({" + inputValue + "})\\]";
                break;
                case 'exp2':
                    output.value = "\\(" + inputValue + "^2\\)";
                    console.log(output.value);
                break;
                case 'exp3':
                    output.value = "\\(" + inputValue + "^3\\)";
                break;
                case 'expy':
                    if(xy){
                        output.value = "\\(" + output.value + "^" + inputValue + "\\)";
                    }
                    else
                        break;
                break;
            } 
        }
        else{
            switch(func.id){
                case 'exp':
                    output.value = Math.exp(inputValue);
                break;
                case 'log':
                    output.value = Math.log(inputValue);
                break;
                case 'cos':
                    output.value = Math.cos(inputValue);
                break;
                case 'sen':
                    output.value = Math.sin(inputValue);
                break;
                case 'tan':
                    output.value = Math.tan(inputValue);
                break;
                case 'sqrt':
                    output.value = Math.sqrt(inputValue);
                break;
                case 'exp2':
                    output.value = Math.pow(inputValue, 2);
                break;
                case 'exp3':
                    output.value = Math.pow(inputValue, 3);
                break;
                case 'expy':
                    if(xy){
                        output.value = Math.pow(output.value, inputValue);
                    }
                    else
                        break;
                break;
            }
        }
        MathJax.typesetPromise([output]).then(() => {
            console.log('MathJax typesetting complete');
        }).catch((err) => console.log('MathJax typesetting error: ', err));
        input.value = '';
    });
});

document.getElementById('clear').addEventListener('click', () => {
    input.value = '';
    output.value = '';
});

document.getElementById('erase').addEventListener('click', () => {  
    input.value = input.value.slice(0, -1);
});

document.getElementById('calc').addEventListener('click', () => {
    if(localStorage.getItem('disp') != 'true'){
        if(input.value != ''){
            output.value = operacion(input.value);
        }
    }
    else
        output.value = input.value;
    console.log(output.value);
    input.value = '';   
});

document.getElementById('test').addEventListener('click', ()=>{

})

/**************************************************************************************/