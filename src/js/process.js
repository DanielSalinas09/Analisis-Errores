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


ipcRenderer.on('process:viewDecimal', (e, objetProcess) => {
    console.log(objetProcess);
    
    document.getElementById('main').innerHTML = templateDecimalToFlotante(objetProcess);
    // document.write(objetProcess.signo + " " + objetProcess.mantisa)
    
});

ipcRenderer.on('process:viewFlotante', (e, objetProcess) => {
    console.log(objetProcess);
    // document.getElementById('main').innerHTML = templateDecimalToFlotante();
    // document.write(objetProcess.signo + " " + objetProcess.mantisa)
});


