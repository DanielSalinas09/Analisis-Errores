// const btnFlotante = document.getElementById('submitFlotante');




const btnDecimalAFlotante = document.getElementById('submitDecimalAFlotante');

btnDecimalAFlotante.addEventListener('click', (e) => {
    DecimalToPuntoFlotante();
    e.preventDefault();
});


function DecimalToPuntoFlotante() {
    let bitMantiza, bitExp, bits; //1011010.101011 || -90.671575
    let exp, num, numArray = [],
        expMayor, exponente;
    let mantizaSting = "",
        signo = "0";
    let mantiza = [],
        aux = [];

    bits = document.querySelector('#bits').value;
    bitExp = document.querySelector('#bitExponente').value;
    bitMantiza = document.querySelector('#bitMantiza').value;
    num = parseFloat(document.querySelector('#num').value).toString(2);
    console.log("numero en binario : ", num);

    numArray = new Array(parseInt(num.length));

    for (let i = 0; i < num.length; i++) {

        numArray[i] = num[i];
    }
    if (numArray[0] == '-') {
        numArray.shift();
        signo = "1";
    }
    let pos = numArray.indexOf('.')
    numArray.splice(pos, 1);
    numArray.splice(1, 0, '.');
    console.log("numero normalizado : ", numArray);


    exp = pos - 1; // saca el exponente
    console.log("bits del exponente", bitExp);
    for (let i = 0; i < numArray.length; i++) {
        if (i > 1 && i <= parseInt(bitMantiza) + 1) {

            mantiza.push(numArray[i]);
        }
    } // añade la mantiza a una array
    console.log("signo : ", signo);
    console.log("exponente : ", exp);
    expMayor = Math.pow(2, bitExp) - 1;
    exponente = parseInt((parseInt(expMayor) / 2) + exp).toString(2);
    console.log("mantisa : ", mantiza);
    console.log("exponente mayor : ", expMayor);
    console.log("exponente : ", exponente);


    for (const char in mantiza) {
        if (mantiza.hasOwnProperty(char)) {

            mantizaSting += mantiza[char];
        }
    }
    console.log(signo, " ", exponente, " ", mantizaSting);
    let templateConversion =
        `
    <div>
    ${signo} ${exponente} ${mantizaSting} 
    </div>
    <button id="pasos">
        ver pasos
    </button>
    
    paso 1: se conviente el numero ${document.querySelector('#num').value} a binario 
         ${num}
    PASO 2: se normaliza el numero binario ${numArray}
     
    `;
    document.querySelector('#result').innerHTML = templateConversion;


    let pasos = document.querySelector('#pasos');
    pasos.addEventListener('click', (e) => {

        e.preventDefault();
    });
}

// btnFlotante.addEventListener('click', (e) => {
//     submitFlotante();
//     e.preventDefault();
// });







function submitFlotante() {
    let bitMantiza, bitExp, bits; //1011010.101011 || -90.671575
    let exp, num, numArray = [],
        expMayor, exponente;
    let mantizaSting = "",
        signo = "0";
    let mantiza = [],
        aux = [];



    // bits = document.querySelector('#bits').value;
    // bitExp = document.querySelector('#bitExponente').value;
    // bitMantiza = document.querySelector('#bitMantiza').value;
    num = document.querySelector('#num').value;
    num = num.trim();
    for (let i = 0; i < num.length; i++) {

        numArray[i] = num[i];
    }
    aux = numArray;

    let x;

    for (let i = 0; i <= numArray.length; i++) {
        if (numArray[i] === ' ') { //1 101010 1011011

            if (i > 1) {
                x = i - x;

                exponente = aux.splice(0, x + 1)
            } else {
                x = i;
                signo = aux.splice(0, x + 1)
            }
            aux.shift();
        }
        if (i == numArray.length) {
            mantiza = numArray.splice(0, i)


        }

    }
    expMayor = Math.pow(2, exponente.length) - 1;
    exp = parseInt(exponente, 2) - parseInt(expMayor / 2);

    console.log(parseInt(exponente, 2));

    console.log(exp);
    console.log("signo ", signo);
    console.log("exponente  ", exponente);
    console.log("mantisa ", mantiza);



    // console.log("numero en binario : ", num);

}