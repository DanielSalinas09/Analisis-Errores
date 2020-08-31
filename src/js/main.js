const {
    ipcRenderer
} = require('electron');
let decimalAFlotante = document.querySelector('#decimal-a-flotante');
let flotanteADecimal = document.querySelector('#flotante-a-decimal');
let epsilon = document.querySelector('#epsilon');

let TemplateDecimalAFlotante = `
    <div class="card boder-primary mb-3" style="max-width: 500px; border-radius:15px;">
        <form action="">
            <div class="card-header">
                <h3 class="card-title">Decimal a Punto Flotante</h3>
            </div>
            <div class="card-body">

                <div class="form-group">
                    <fieldset>
                        <input class="form-control" type="text" id="num" placeholder="Numero">
                    </fieldset>
                </div>

                <div class="form-group">
                    <fieldset>
                        <input class="form-control" type="text" id="bitMantiza" placeholder="num bits mantisa">
                    </fieldset>
                </div>

                <div class="form-group">
                    <fieldset>
                        <input class="form-control" type="text" id="bitExponente" placeholder="num bit Exponente">
                    </fieldset>
                </div>
                <input class="btn btn-primary border" type="submit" id="submitDecimalAFlotante" value="Enviar">
            </div>
        </form>
    </div>

    <div style="display:none">
        <h2>Resultado:</h2>
        <div class="card border-secondary mb-3" style="max-width: 300px;">
            <div class="card-body" id="resultDecimalAFlotante">
                
            </div>
        </div>
        <button class="btn btn-outline-primary" id="verProcedimiento">ver procedimiento</button>
    </div>
`

let TemplateFlotanteADecimal = `
<div class="card boder-primary mb-3" style="max-width: 500px; border-radius:15px;">
    <form action="">
        <div class="card-header">
            <h3 class="card-title">Punto Flotante a decimal</h3>
        </div>
        <div class="card-body">

            <div class="form-group">
                <fieldset>
                    <input class="form-control" type="text" id="numFlotante" placeholder="Numero">
                </fieldset>
            </div>
            <input class="btn btn-primary border" type="submit" id="submitFlotanteADecimal" value="Enviar">
        </div>
    </form>
</div>

<div style ="display:none">
    <h2>Resultado:</h2>
    <div class="card border-secondary mb-3" style="max-width: 300px;">
        <div class="card-body" id="resultadoFlotanteADecimal">
            
        </div>
    </div>
    <button class="btn btn-outline-primary" id="verProcedimiento2">ver procedimiento</button>
</div>
`

let epsilonTemplate = `
<div class="card boder-primary mb-3" style="max-width: 500px; border-radius:15px;">
    <form action="">
        <div class="card-header">
            <h3 class="card-title">Calcular epsilon</h3>
        </div>
        <div class="card-body">
            <input class="btn btn-primary border" type="submit" id="submitEpsilon" value="Calcular">
        </div>
    </form>
</div>

<div style ="display:none">
    <h2>Resultado:</h2>
    <div class="card border-secondary mb-3" style="max-width: 300px;">
        <div class="card-body" id="resultadoEpsilon">
            
        </div>
    </div>
</div>
`;

decimalAFlotante.addEventListener('click', () => {

    if (!decimalAFlotante.classList.contains('active')) {
        if (flotanteADecimal.classList.contains('active')) {
            flotanteADecimal.classList.remove('active');

        } else {
            epsilon.classList.remove('active');
        }
        decimalAFlotante.classList.add('active')
    } //comprobar cual clase tiene active y añadir active a la clase seleccionada

    main.innerHTML = TemplateDecimalAFlotante;

    //ejecutar proceso de calcular decial a punto flotante
    const btnDecimalAFlotante = document.getElementById('submitDecimalAFlotante');

    btnDecimalAFlotante.addEventListener('click', (e) => {
        DecimalToPuntoFlotante();

        e.preventDefault();
    });


    function DecimalToPuntoFlotante() {
        let bitMantiza, bitExp, bits; //1011010.101011 || -90.671575
        let exp, num, numArray = [],
            numeroNormalizado = "",
            numero, e,
            expMayor, exponente;
        let mantizaSting = "",
            signo = "0";
        let mantiza = [],
            aux = [];


        bitExp = document.querySelector('#bitExponente').value;
        bitMantiza = document.querySelector('#bitMantiza').value;
        numero = document.querySelector('#num').value;
        num = parseFloat(numero).toString(2);
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
            numeroNormalizado += numArray[i]
            if (i > 1 && i <= parseInt(bitMantiza) + 1) {

                mantiza.push(numArray[i]);
            }
        } // añade la mantiza a una array
        console.log("signo : ", signo);
        console.log("exponente : ", exp);
        expMayor = Math.pow(2, bitExp) - 1;
        e = parseInt((parseInt(expMayor) / 2) + exp);
        exponente = e.toString(2);
        console.log("mantisa : ", mantiza);
        console.log("exponente mayor : ", expMayor);
        console.log("exponente : ", exponente);


        for (const char in mantiza) {
            if (mantiza.hasOwnProperty(char)) {

                mantizaSting += mantiza[char];
            }
        }
        document.getElementById("resultDecimalAFlotante").parentElement.parentElement.style = "display:block";
        document.getElementById("resultDecimalAFlotante").innerHTML = `

        <span class="text-warning" stlye="font-size:25px">${signo}</span>
        <span class="text-success" stlye="font-size:25px">${exponente}</span>
        <span class="text-danger" stlye="font-size:25px">${mantizaSting}</span>

        `;
        document.getElementById('verProcedimiento').addEventListener('click', () => {
            let objectProcess = {
                "numero": numero,
                "numeroBinario": num,
                "numeroNormalizado": numeroNormalizado,
                "signo": signo,
                "exponente": exponente,
                "exponenteMax": expMayor,
                "exp": exp,
                "exponenteDecimal": e,
                "mantisa": mantizaSting
            }
            ipcRenderer.send('process:DecimalAFlotante', objectProcess)
        });


    }
});

flotanteADecimal.addEventListener('click', () => {
    if (!flotanteADecimal.classList.contains('active')) {
        if (decimalAFlotante.classList.contains('active')) {
            decimalAFlotante.classList.remove('active');

        } else {
            epsilon.classList.remove('active');
        }
        flotanteADecimal.classList.add('active')
    } //comprobar cual clase tiene active y añadir active a la clase seleccionada
    main.innerHTML = TemplateFlotanteADecimal;

    const btnFlotanteADecimal = document.getElementById('submitFlotanteADecimal');
    btnFlotanteADecimal.addEventListener('click', (e) => {

        FlotanteADecimal();
        e.preventDefault();
    })



    function FlotanteADecimal() {
        let bitMantiza, bitExp, bits; //1011010.101011 || -90.671575
        let exp, num, numArray = [],
            expMayor, exponente;
        let mantisaSting = "",
            signo = "0";
        let mantiza = [],
            aux = [];
        exponenteString = '';



        // bits = document.querySelector('#bits').value;
        // bitExp = document.querySelector('#bitExponente').value;
        // bitMantiza = document.querySelector('#bitMantiza').value;
        num = document.querySelector('#numFlotante').value;
        num = num.trim();

        for (let i = 0; i < num.length; i++) {
            aux[i] = num[i]
        }


        let x;

        for (let i = 0; i <= num.length; i++) {
            if (num[i] === ' ') { //1 10101 01101010  || 1 1010101 1111

                if (i > 1) {
                    x = i - x;


                    exponente = aux.splice(0, x - 1)
                } else {
                    x = i;
                    signo = aux.splice(0, x)
                }
                aux.shift();
            }
            if (i == num.length) {
                mantiza = aux;

            }

        }




        for (const char in mantiza) {
            if (mantiza.hasOwnProperty(char)) {
                mantisaSting += mantiza[char];

            }
        }
        for (const char in exponente) {
            if (exponente.hasOwnProperty(char)) {
                exponenteString += exponente[char];

            }
        }

        console.log("signo : ", signo);
        console.log("exponente : ", exponente);
        console.log("mantisa : ", mantiza);

        expMayor = Math.pow(2, exponenteString.length) - 1;
        exp = parseInt(exponenteString, 2) - parseInt(expMayor / 2);

        let parteDecimalBinario = '';
        let numeroBinarioNormalizado = "1." + mantisaSting;
        let partDecimal;
        if (exp == 0) {
            console.log("numero Binario ", numeroBinarioNormalizado);
            for (let i = 0; i < numeroBinarioNormalizado.length; i++) {
                if (i > 1) {
                    parteDecimalBinario += numeroBinarioNormalizado[i];
                }


            }

        } else {
            console.log(numeroBinarioNormalizado, " x2^", exp);
            numArray = []
            for (let i = 0; i < numeroBinarioNormalizado.length; i++) {

                numArray[i] = numeroBinarioNormalizado[i];

            }
            console.log(numArray);
            numArray.splice(1, 1);
            numArray.splice(exp + 1, 0, '.');
            numeroBinarioNormalizado = '';
            for (let i = 0; i < numArray.length; i++) {

                numeroBinarioNormalizado += numArray[i];

            }

            partDecimal = numArray.splice(exp + 2, numArray.length);

            for (let i = 0; i < partDecimal.length; i++) {
                parteDecimalBinario += partDecimal[i];

            }
        }




        console.log(parteDecimalBinario);
        console.log("numero binario : ", numeroBinarioNormalizado);
        let decimal = 0;

        for (let i = 0; i < parteDecimalBinario.length; i++) {
            if (parteDecimalBinario[i] == '1') {
                x = (i + 1) * (-1);
                decimal += Math.pow(2, x);
            }
        }

        console.log("parte flotante ", decimal);
        let numeroBaseDies = parseInt(numeroBinarioNormalizado, 2) + decimal;
        if (signo[0] == '1') {
            numeroBaseDies = numeroBaseDies * (-1);
        }
        console.log(numeroBaseDies);


        document.getElementById("resultadoFlotanteADecimal").parentElement.parentElement.style = "display:block";
        document.getElementById("resultadoFlotanteADecimal").innerHTML = `
        <span class="<span class="text-warning" stlye="font-size:25px">${numeroBaseDies}</span>
        
        `
        document.getElementById('verProcedimiento2').addEventListener('click', () => {

            ipcRenderer.send('process:flotanteADecimal', "hola desde la otra ventana ")
        });
    }



});

epsilon.addEventListener('click', () => {
    if (!epsilon.classList.contains('active')) {
        if (flotanteADecimal.classList.contains('active')) {
            flotanteADecimal.classList.remove('active');
        } else {
            decimalAFlotante.classList.remove('active');
        }
        epsilon.classList.add('active')
    } //comprobar cual clase tiene active y añadir active a la clase seleccionada
    main.innerHTML = epsilonTemplate;


    //logica
    const btnEpsilon = document.getElementById('submitEpsilon');
    btnEpsilon.addEventListener('click', (e) => {
        console.log("aja");
        let epsilon = 1;

        while ((epsilon + 1) > 1) {
            epsilon = epsilon / 2;
        }

        epsilon = epsilon * 2;
        let element = document.getElementById('resultadoEpsilon');
        element.parentElement.parentElement.style = "display:block;";
        element.innerHTML = epsilon;

        e.preventDefault();
    });



});

decimalAFlotante.click();