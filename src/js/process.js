const { ipcRenderer } = require('electron');


function templateDecimalToFlotante(objetProcess) {
    return `
    <div class="card text-white bg-primary mb-3" style="max-width: 300px;">
        <div class="card-header">
            <h3 class="title">Pasos</h2>
        </div>
        <div class="card-body">
            <p>
                <b>Numero: </b>${objetProcess.numero} <br>
                <b>Paso 1:</b> se convierte el numero ${objetProcess.numero} en Binario
                <b>Paso 2:</b> Se normaliza el numero binario ${objetProcess.numeroBinario} rodando la coma(.) ${objetProcess.exponenteDecimal} bits hacia la izquierda obteniendo la normalizacion.
                <br> Numero Normalizado: ${objetProcess.numeroNormalizado} <br>
                <b>Paso 3:</b> se saca el signo ${objetProcess.signo} <br>
                <b>Paso 4:</b> Se saca la mantisa del numero binario normalizado <br> Mantisa: ${objetProcess.mantisa} <br>
                <b>Paso 5:</b> se calcula el exponente  con la formula exp =  e +  int(<span><Sup> expMax </ sup> / <sub> 2 </ sub> </span>)<br> 
                ${objetProcess.exp}+ int(${objetProcess.exponenteMax/2})  =  ${objetProcess.exponenteDecimal} <br>
                <b>Paso 6:</b> se pasa el numero ${objetProcess.exponenteDecimal} a binario ${objetProcess.exponente}<br>
                <b>paso 7</b> se escribe el numero en punto flotante de la forma (signo) (exponente) (mantisa)
                
                <h4>Resultado</h4>
                <h5>${objetProcess.signo} ${objetProcess.exponente} ${objetProcess.mantisa}</h5>
                
            </p>
        </div>
    
    </div>
    `
};


function templateFlotanteADecimal(objetProcess) {
    return `
    <div class="card text-white bg-primary mb-3" style="max-width: 300px;">
        <div class="card-header">
            <h3 class="title">Pasos</h2>
        </div>
        <div class="card-body">
            <p>
                <b>Binario Ingresado: </b>${objetProcess.numero} <br>
                <b>Paso 1:</b> se saca la mantiza, signo y exponente<br>
                Signo: ${objetProcess.signo[0]} <sub> (2) </sub><br>
                Exponente:${objetProcess.exponente} <sub> (2) </sub> <br>
                Mantiza:${objetProcess.mantisa} <sub> (2) </sub> <br>
                <b>Paso 2:</b>  se calcula el exponente con la formula exp - int(<span><Sup> expMax </ sup> / <sub> 2 </ sub> </span>). <br>
                    ${parseInt(objetProcess.exponente, 2)} - int(<span><Sup> ${objetProcess.exponenteMax} </ sup> / <sub> 2 </ sub> </span>) = exp <br>
                    ${parseInt(objetProcess.exponente, 2)} - ${parseInt(objetProcess.exponenteMax/2)} = ${objetProcess.exp} <br>
                
                <b>Paso 3:</b> se une el signo, se reserva un bit adicional, se coloca un punto y se une a la mantisa por lo cual querada de la forma<br> (signo) 1.(mantiza)x2<sup>exp</sup><br>
                numero normalizado = ${objetProcess.signo[0] == 1? '-':'' } ${objetProcess.numeroBinarioNormalizado} x2<sup>${objetProcess.exp}</sup> <br>
                <b>Paso 4:</b> se calcula el binario guardado multiplicando el numero por el exponente <br>
                numero = ${objetProcess.numeroBinario} <br>
                <b>Paso 5:</b> pasar el binario a decimal<br> 
      
                <h5>${objetProcess.numeroBaseDies}</h5>
                
            </p>
        </div>
    
    </div>
    `
};






ipcRenderer.on('process:viewDecimal', (e, objetProcess) => {
    console.log(objetProcess);

    document.getElementById('main').innerHTML = templateDecimalToFlotante(objetProcess);
    // document.write(objetProcess.signo + " " + objetProcess.mantisa)

});

ipcRenderer.on('process:viewFlotante', (e, objetProcess) => {
    console.log(objetProcess);

    document.getElementById('main').innerHTML = templateFlotanteADecimal(objetProcess);
    // document.getElementById('main').innerHTML = templateDecimalToFlotante();
    // document.write(objetProcess.signo + " " + objetProcess.mantisa)
});