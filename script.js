document.getElementById('plusvalia-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const valorCompra = parseFloat(document.getElementById('valor-compra').value);
    const valorVenta = parseFloat(document.getElementById('valor-venta').value);
    const valorCatastralTerreno = parseFloat(document.getElementById('valor-catastral-terreno').value);
    const valorCatastralTotal = parseFloat(document.getElementById('valor-catastral-total').value);
    const anosPosesion = parseInt(document.getElementById('anos-posesion').value);
    const numPropietarios = parseInt(document.getElementById('num-propietarios').value);
    const tipoTransaccion = document.getElementById('tipo-transaccion').value;

    // Coeficiente de temporalidad
    const coeficienteTemporalidad = 0.09;

    // Calcular Base Imponible (Método Objetivo)
    const baseImponible = valorCatastralTerreno * coeficienteTemporalidad;

    // Importe con gravamen (Método Objetivo)
    const gravamenObjetivo = baseImponible * 0.30;

    // Aplicar exención si es herencia
    let resultadoObjetivo = gravamenObjetivo;
    if (tipoTransaccion === 'herencia') {
        resultadoObjetivo *= 0.50;
    }

    // Calcular Plusvalía Bruta (Método Real)
    const plusvaliaBruta = valorVenta - valorCompra;

    // Porcentaje del terreno
    const porcentajeTerreno = (valorCatastralTerreno / valorCatastralTotal) * 100;

    // Plusvalía correspondiente al terreno (Método Real)
    const plusvaliaTerreno = (plusvaliaBruta * porcentajeTerreno) / 100;

    // Importe con gravamen (Método Real)
    const gravamenReal = plusvaliaTerreno * 0.30;

    // Aplicar exención si es herencia
    let resultadoReal = gravamenReal;
    if (tipoTransaccion === 'herencia') {
        resultadoReal *= 0.50;
    }

    // Obtener el importe más bajo
    const resultadoFinal = Math.min(resultadoObjetivo, resultadoReal);

    // Dividir entre el número de propietarios
    const cantidadPorPropietario = resultadoFinal / numPropietarios;

    // Mostrar el resultado
    document.getElementById('resultados').style.display = 'block';
    document.getElementById('resultado').textContent = `Importe total a pagar: €${resultadoFinal.toFixed(2)} 
    (Cantidad por propietario: €${cantidadPorPropietario.toFixed(2)})`;
});
