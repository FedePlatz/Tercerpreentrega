const interesesPorCuotas = [
    { cuotas: [1, 2, 3], interesMensual: 0.2 },
    { cuotas: [4, 5, 6], interesMensual: 0.1 },
    { cuotas: [7, 8, 9], interesMensual: 0.08 },
    { cuotas: [10, 11, 12], interesMensual: 0.05 },
];

class CalculadoraCredito {
    constructor() {
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resultadoElemento = document.getElementById("resultado");
        this.formularioElemento = document.getElementById("formularioCredito");
        this.formularioElemento.addEventListener("submit", this.handleFormSubmit);
    }

    calcularInteres(montoTotal, interes) {
        return montoTotal * interes;
    }

    calcularCredito(monto, cuotas) {
        const interesMensual = interesesPorCuotas.find(
            (intervalo) => cuotas >= intervalo.cuotas[0] && cuotas <= intervalo.cuotas[2]
        ).interesMensual;

        return monto + cuotas * this.calcularInteres(monto, interesMensual);
    }

    handleFormSubmit(evento) {
        evento.preventDefault();
        const montoCredito = parseFloat(document.getElementById("montoCredito").value);
        const numCuotas = parseInt(document.getElementById("cuotas").value);

        if (!isNaN(montoCredito) && !isNaN(numCuotas) && numCuotas >= 1 && numCuotas <= 12) {
            const resultado = this.calcularCredito(montoCredito, numCuotas);
            const resultadoRedondeado = Math.round(resultado);
            this.resultadoElemento.innerHTML = `El costo del crédito de ${montoCredito} ARS a ${numCuotas} cuotas es de ${resultadoRedondeado} ARS`;

            const datosParaAlmacenar = {
                montoCredito,
                numCuotas,
                resultado: resultadoRedondeado
            };
            localStorage.setItem("datosCredito", JSON.stringify(datosParaAlmacenar));
        } else {
            this.resultadoElemento.innerHTML = "Por favor, ingrese un monto de crédito válido y un número de cuotas válido (1-12).";
        }
    }
}

const datosAlmacenados = localStorage.getItem("datosCredito");
if (datosAlmacenados) {
    const datosParseados = JSON.parse(datosAlmacenados);
    document.getElementById("montoCredito").value = datosParseados.montoCredito;
    document.getElementById("cuotas").value = datosParseados.numCuotas;
    document.getElementById("resultado").innerHTML = `El costo del crédito de ${datosParseados.montoCredito} ARS a ${datosParseados.numCuotas} cuotas es de ${datosParseados.resultado} ARS`;
}

const calculadoraCredito = new CalculadoraCredito();