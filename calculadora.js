const display = document.getElementById('display')//tela da alculadora
const numeros = document.querySelectorAll('[id*=digito]')//pega todos os atributos que começam com digito
const operadores = document.querySelectorAll('[id*=operador]')//pega todos os "operadores" + - etc.. com idiniciandoem 'operador'
//todos armazenados em uma NodeList que são coleções de nodos semelhantes aos objetos retornados pelos métodos 

//vai ajudar a controlar o estado da calculadora
let novoNumero= true//Sinaliza se um novo número está sendo inserido.
let operador//Armazena o operador
let numeroAnterior// Armazena o número anterior

//cada vez que ele clica, pega o evento do botão que estou clicando
//const inserirNumero = (evento) => display.textContent = evento.target.textContent;//target pega o alvo, onde
//textContent pega o que ta na tag

const operacaoPendente = () => operador !== undefined//retorna true se houver uma operação pendente (um operador foi selecionado).

const calcular = () => {//Declara uma função arrow que realiza a operação matemática
    // com base no operador selecionado e nos números anteriores
    if (operacaoPendente()) {//verifica se xiste uma operação pendente pelo operacaoPendente() que retorna verdadeiro
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.'));//Obtém o número atual do display e faz a cnversão para um Float
        //Ao usar replace ele não substitui a cadeia de caracteres original, apenas cria uma nova onde ocorre a substituição no textContent
        //também converte , em . para evitar erros
        novoNumero = true;//indica que um novo número será inserido
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);//
        //OBS Importante:
        //Não chame o eval() para avaliar uma expressão aritmética; JavaScript avalia expressões aritméticas automaticamente.
        //Se você construir uma expressão aritmética como uma string, você pode usar eval() para calcular o resultado depois.
        atualizarDisplay(resultado);//exibe o resultado no display da calcladora
    }
//Resumo: essa função faz o calculo com osnúmeros anteriores, operadores e o número atual e atualiza o display com resultado
}

const atualizarDisplay = (texto) =>{//recebe o paramentro texto
    if(novoNumero){//verifica se novoNumero é verdadeiro, ou seja, se um novoNumero está sendo inserido
        //+= concatena
        display.textContent = texto.toLocaleString('BR');;//atualiza o conteudo do display com um texto formatado para 'br'
        //O método toLocaleString é uma função incorporada (built-in) do JavaScript que permite formatar números, datas e moedas
        novoNumero=false//indica que um novo número não está sendo mais inserido
    }else{//caso um número já estava presente
        display.textContent += texto.toLocaleString('BR');;//concatena o texto que entrou ao existente no display tipo 1 + 2
    }
    document.querySelector('#igual').focus()//coloca um 'foco' no operador igual coomo se o destaca-se

    //resumo; Essa função é frequentemente usada para exibir números ou resultados 
    //em um formato específico e garantir que a interface do usuário esteja atualizada conforme a entrada do usuário.
}

// const selecionarOperador = () =>{
//     if(novoNumero){//evita que guarde a operação antes de digitar um número novo
//         novoNumero = true
//         operador = evento.target.textContent//armazenei a operação
//         numeroAnterior = display.textContent //guarda o numero anterior
//         console.log(operador)
//     }
// }



//estou mandando o texto de cada uma que foi clicada
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)//joga o número no display
//pega os numeros e adiciona acada número um evento
numeros.forEach(numero => numero.addEventListener(//adiciona um evento de clique em cada botão
    'click',inserirNumero)//inserirNumero é o evento
    )

    const selecionarOperador = (evento) => {
    if (!novoNumero) {//verifica se não novo número
        calcular();//chama a função realizando a operação e prepara para uma nova operação
        novoNumero = true;
        operador = evento.target.textContent;//Obtém o texto do operador clicado a partir do evento (evento.target.textContent) e armazena na variável operador.
        numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.'))//Obtém o número anterior digitado no display da 
        //calculadora, convertendo-o para um número de ponto flutuante (parseFloat).
        // Qualquer formatação de milhares usando ponto ou vírgula é removida antes da conversão.
    }
}

//mesma coisa só que com o operador
operadores.forEach(operador => operador.addEventListener(
'click',selecionarOperador)//inserirNumero é o evento
)

const ativarIgual = () => {
    calcular();
    operador = undefined;//Define a variável operador como undefined. Isso pode indicar que, 
    //após realizar a operação, o operador é resetado para que uma nova operação possa ser inserida.
}

document.getElementById('igual').addEventListener('click', ativarIgual)
const limparDisplay = () => (display.textContent = '')
document
    .getElementById('limparD')//pega o id
    .addEventListener('click', limparDisplay)//evento de clique


const limparCalculo = () => {//definiu a função
    limparDisplay();//limpa o display
    operador = undefined;//redefiniu para uma nova operação
    novoNumero = true;// indicando que um novo número pode ser inserido após limpar o cálculo anterior.
    numeroAnterior = undefined;// permite iniciar uma nova operação sem valores anteriores.
}


document
    .getElementById('limparC')
    .addEventListener('click', limparCalculo);//adiciona o evento limparCalculo ao botão limparC



const removerUltimoNumero = () =>
    (display.textContent = display.textContent.slice(0, -1));//Quando chamada, essa função remove o último 
    //caractere do conteúdo de display.textContent.
    //em resumo apagar para cada caracter na ordem em que foi inserido


document
    .getElementById('backspace')
    .addEventListener('click', removerUltimoNumero);//chama o remover

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);//ela multipliaca por -1 não alterando o numero mais o seu valor como positivo ou negativo
    //resumo:  inerte o valor do número do display
};

document.getElementById('inverter').addEventListener('click', inverterSinal);//chama o evento do botão

const existeDecimal = () => display.textContent.indexOf(',') !== -1//retorna true se a vírgula , estiver 
//presente no conteúdo de display.textContent, caso contrário, retorna false.

const existeValor = () => display.textContent.length > 0; //se o conteudo do display for maior que zero ele retorn true
//ou seja que tem algum número presente

const inserirDecimal = () => {//insere uma virgula
    if (!existeDecimal()) {//verifica se NÂO existe uma virgula
    //ele utiliza a função existeDecimal que retorna um true aplicando as condições para false
        if (novoNumero) {
            atualizarDisplay('0,');//Se verdadeira, significa que é o início de um novo número
            // e a função atualizarDisplay('0,') é chamada, inserindo '0,' no display.
            //basicamente preparando para um novo calculo
        } else {
            atualizarDisplay(',');//se a condição não for versdadeira ele insere um virgula
        }
    }
};
document.getElementById('operadorvirg').addEventListener('click', inserirDecimal);// chama a função decimal 

const mapaTeclado = {//mapeia teclas para elementos específicos da interface.
    //Cada chave-valor no objeto representa uma tecla e o ID do elemento correspondente na interface.
    0: 'digitozero',
    1: 'digitoum',
    2: 'digitodois',
    3: 'digitotrês',
    4: 'digitoquatro',
    5: 'digitocinco',
    6: 'digitoseis',
    7: 'digitosete',
    8: 'digitooito',
    9: 'digitonove',
    '/': 'operadordivi',
    'X': 'operadorMult',
    '-': 'operadorsub',
    '+': 'operadorsoma',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparD',
    Escape: 'limparC',
    ',': 'operadorvirg',
};

const mapearTeclado = (evento) => {//função arrow para o evento
    const tecla = evento.key;//Obtém a tecla pressionada a partir do objeto de evento.
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;//verifica se a tecla pressionada está presente no mapa
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();//se a tecla corresponder ela simulará o clique nesse elemento
};
document.addEventListener('keydown', mapearTeclado);//chama o evewnto
