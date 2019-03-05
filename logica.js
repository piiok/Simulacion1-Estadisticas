/**Apenas carga la pagina y todas las librerias estan cargadas se ejcuta */
window.onload = function() {
	//Colas
	$('#iteraciones').val('1000');
	proceso(1000);

	//Ascensor
	var cantidad = getRandomInt();
	$('#iteracionesAsc').val('1000');
	$('#capacidad').val('' + cantidad);
	var pisos = getRandomInt();
	$('#pisos').val('' + pisos);
	proceso2(1000);
	// proceso3();
};

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min = 1, max = 100) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**  METODOS COLAS */
function proceso(e) {
	var qp = 0;
	var p1p = 0;
	var p2p = 0;
	var tsp1p = 0;
	var tsp2p = 0;
	var stepsp = 0;

	for (i = 0; i < e; i++) {
		var q = getRandomInt();
		qp += q;
		var p1 = getRandomInt();
		p1p += p1;
		var p2 = getRandomInt();
		p2p += p2;
		var config1 = roundRobin(q, p1, p2);
		stepsp += config1[1];
		tsp1p += config1[0][0];
		tsp2p += config1[0][1];
		console.log(
			'q=' +
				q +
				', p1=' +
				p1 +
				', p2=' +
				p2 +
				', steps=' +
				config1[1] +
				', Tsp1=' +
				config1[0][0] +
				', Tsp2=' +
				config1[0][1]
		);
	}

	qp /= e;
	p1p /= e;
	p2p /= e;
	tsp1p /= e;
	tsp2p /= e;
	stepsp /= e;

	$('#qpromedio').val('' + qp);
	$('#p1promedio').val('' + p1p);
	$('#p2promedio').val('' + p2p);
	$('#tsp1promedio').val('' + tsp1p);
	$('#tsp2promedio').val('' + tsp2p);
	$('#stepspromedio').val('' + stepsp);
}

function roundRobin(quantum, p1, p2) {
	tiempoSalida1 = 0;
	tiempoSalida2 = 0;
	checkpoint = 0;
	tiempos = [ [ p1 ], [ p2 ], [ tiempoSalida1 ], [ tiempoSalida2 ] ]; // se llena con p1, p2, ts1, ts2 respectivamente
	labels = [];

	termino1 = false;
	termino2 = false;

	while (p1 != 0 || p2 != 0) {
		//Mirar si p1 > quantum
		if (!termino1) {
			if (p1 > quantum) {
				avance = quantum;
				tiempoSalida1 += quantum;
				p1 -= quantum;
			} else {
				ultAvance1 = p1;
				tiempoSalida1 += p1;
				p1 = 0;
				termino1 = true;
			}
		}
		tiempos[0].push(p1);
		tiempos[2].push(tiempoSalida1);

		//mirar si p2 > quantum
		if (!termino2) {
			if (p2 > quantum) {
				if (!termino1) {
					tiempoSalida2 = tiempoSalida2 + avance + quantum;
					tiempoSalida1 = tiempoSalida2;
				} else {
					tiempoSalida2 += ultAvance1;
					ultAvance1 = 0;
					tiempoSalida2 += quantum;
				}
				p2 -= quantum;
			} else {
				if (!termino1) {
					tiempoSalida2 = tiempoSalida2 + avance + p2;
					tiempoSalida1 = tiempoSalida2;
				} else {
					tiempoSalida2 += ultAvance1;
					ultAvance1 = 0;
					tiempoSalida2 += p2;
				}
				p2 = 0;
				termino2 = true;
			}
		}
		tiempos[1].push(p2);
		tiempos[3].push(tiempoSalida2);
	}
	return [ [ tiempos[2][tiempos[0].length - 1], tiempos[3][tiempos[0].length - 1] ], tiempos[0].length ];
}
/**FIN METODOS COLAS */

/** METODOS ASCENSOR */

function configuracion2(a) {
	return {
		type: 'horizontalBar',
		data: {
			labels: a[0],
			// backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
			datasets: [
				{
					backgroundColor: '#49147F',
					label: 'Personas en el ascensor',
					fill: false,
					data: a[1]
				}
			]
		},
		options: {
			scales: {
				xAxes: [
					{
						display: true,
						ticks: {
							min: 0
						}
					}
				]
			}
		}
	};
}

function proceso2(e) {
	var grafica = (document.getElementById('grafica2').innerHTML =
		"<canvas id='canvas2' height='450' width='600'></canvas>");
	var ctx1 = document.getElementById('canvas2').getContext('2d');
	var capacidad = parseInt($('#capacidad').val(15));
	var pisos = parseInt($('#pisos').val(10));
	console.log(15, 10, e);
	result = simularAscensor(e, 15, 10);
	var config1 = configuracion2([ result[0], result[1] ]);
	console.log(result[2]);
	$('#inicial').val(result[2]);
	window.myLine2 = new Chart(ctx1, config1);
}

function ascensor(capMax, canPisos) {
	let personasAscensor = Math.floor(Math.random() * capMax) + 1;
	const personasInicial = personasAscensor;
	let cont = 0;
	// console.log('El ascensor comenzo con:', personasAscensor, 'personas.');
	let pisoBajan = [];
	let bajanPorPiso = [];
	let pasajerosPiso = [];
	let labels = [];

	//arreglo que contiene el piso donde se va a bajar cada persona
	for (let i = 0; i < canPisos; i++) {
		if (cont < personasInicial) {
			const pisoBaja = Math.floor(Math.random() * canPisos) + 1;
			cont += 1;
			pisoBajan.push(pisoBaja);
		} else {
			pisoBajan.push(0);
		}
	}

	//arreglo que tiene la cantidad de personas que se van a bajar por piso
	for (let i = 1; i <= canPisos; i++) {
		// console.log('Piso ', i);
		const personas = pisoBajan.filter((x) => x === i).length;
		personasAscensor -= personas;
		// console.log('Se bajaron', personas, 'personas y quedan', personasAscensor);
		labels.push('Piso ' + i.toString());
		pasajerosPiso.push(personasAscensor);
		bajanPorPiso.push(personas);
	}

	// console.log('Piso en el que se baja cada pasajero', pisoBajan);
	// console.log('Cantidad de pasajeros que se baja por piso', bajanPorPiso);

	return [ labels, pasajerosPiso, personasInicial ];
}

function simularAscensor(e, capMax, canPisos) {
	let pip = 0;
	let ppp = 0;
	let resultadosSimulacion = [ [], [], [ 0 ] ];

	for (i = 0; i < e; i++) {
		let simulacion = ascensor(capMax, canPisos);
		// console.log(simulacion);
		resultadosSimulacion[0] = simulacion[0];
		resultadosSimulacion[2] = parseInt(resultadosSimulacion[2]) + parseInt(simulacion[2]);

		if (resultadosSimulacion[1].length == 0) {
			for (let j = 0; j < canPisos; j++) {
				resultadosSimulacion[1].push(0);
			}
		}

		for (let j = 0; j < canPisos; j++) {
			resultadosSimulacion[1][j] += simulacion[1][j];
			// console.log(resultadosSimulacion[1]);
		}
	}

	for (let j = 0; j < canPisos; j++) {
		resultadosSimulacion[1][j] /= e;
	}

	resultadosSimulacion[2] /= e;

	// console.log('===================================================');
	// console.log(resultadosSimulacion);
	console.log(resultadosSimulacion);
	return [ resultadosSimulacion[0], resultadosSimulacion[1], resultadosSimulacion[2] ];
}
/**FIN METODOS ASCENSOR */
