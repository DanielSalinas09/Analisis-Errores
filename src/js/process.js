const { ipcRenderer } = require('electron');


function templateDecimalToFlotante() {
    return `
    <div class="card border-secondary mb-3" style="max-width: 500px;">
    <div class="card-header">
        <h3 class="title">Pasos</h2>
    </div>
    <div class="card-body">
        <p>
            <b>Numero: </b> []<br>
            <b>Paso 1:</b> se convierte el numero [] en Binario<br> Numero Binario:[] <br>
            <b>Paso 2:</b> Se normaliza el numero binario [] rodando la coma(.)[exponente] obteniendo la normalizacion. <br> Numero Normalizado:[] <br>
            <b>Paso 3:</b> se saca el signo[] <br>
            <b>Paso 4:</b> Se saca la mantisa del numero binario normalizado <br> Mantisa: [] <br>
            <b>Paso 5:</b> El exponente tiene un tamaño [] Bits, sacamos el exponente maximo dividiendo [valor de exponente]/2 =[resultado] <br>
            <b>Paso 6:</b> Luego para sacar el exponente sumamos exponente maximo entre [e es 2^6 no se como llamarlo] [exp_max]+[e]=[resultado de exp] <br>
            <b>Paso 7:</b> luego convertimos [resultado exp] a binario. <br> Exp: [exp en binario]
        </p>
    </div>
    
    </div>
    `
};


ipcRenderer.on('process:viewDecimal', (e, objetProcess) => {
    console.log(objetProcess);
    document.getElementById('main').innerHTML = templateDecimalToFlotante();
    // document.write(objetProcess.signo + " " + objetProcess.mantisa)
});

ipcRenderer.on('process:viewFlotante', (e, objetProcess) => {
    console.log(objetProcess);
    // document.getElementById('main').innerHTML = templateDecimalToFlotante();
    // document.write(objetProcess.signo + " " + objetProcess.mantisa)
});