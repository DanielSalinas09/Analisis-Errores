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
                <b>Paso 2:</b> Se normaliza el numero binario ${objetProcess.numeroBinario} rodando la coma(.) ${objetProcess.exponenteDecimal} hacia la izquierda obteniendo la normalizacion. <br> Numero Normalizado:${objetProcess.numeroNormalizado} <br>
                <b>Paso 3:</b> se saca el signo ${objetProcess.signo} <br>
                <b>Paso 4:</b> Se saca la mantisa del numero binario normalizado <br> Mantisa: ${objetProcess.mantisa} <br>
                <b>Paso 5:</b> El exponente tiene un tamaño ${objetProcess.exp} Bits,<br> 
                <b>Paso 6: </b>sacamos el exponente maximo ${objetProcess.exponenteMax} <br>
                <b>Paso 7:</b> Luego para sacar el exponente sumamos ${objetProcess.exponente}<br>
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
                <b>Numero: </b>${objetProcess.numero} <br>
                <b>Paso 1:</b> se saca la mantiza, signo y exponente<br>
                Signo: ${objetProcess.signo} <br>
                Exponente:s
                Mantiza:
                <b>Paso 2:</b>  se calcula el exponente con la formula exp - int(expMax/2). <br>
                <b>Paso 3:</b>  se escribe el numero y se reserva un bit adicional por lo cual querada (signo) 1.(mantiza)x2^exp<br>
                <b>Paso 4:</b> se calcula el binario guardado multiplicando eñ numero por el exponente <br>
                <b>Paso 5:</b> pasar el binario a decimal Bits,<br> 
                
                <h4>Resultado</h4>
                <h5>${objetProcess.signo} ${objetProcess.exponente} ${objetProcess.mantisa}</h5>
                
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


