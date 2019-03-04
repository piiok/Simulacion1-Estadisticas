/**Apenas carga la pagina y todas las librerias estan cargadas se ejcuta */
window.onload = function() {
	//Colas
	$('#iteraciones').val('1000');
	proceso(1000);

	//Ascensor
	// var cantidad = getRandomInt();
	// $('#capacidad').val('' + cantidad);
	// var pisos = getRandomInt();
	// $('#pisos').val('' + pisos);
	// proceso2();
	// proceso3();
};

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min = 1, max = 100) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**  METODOS COLAS */
function proceso(e) {
	var qp=0;
	var p1p=0;
	var p2p=0;
	var tsp1p=0;
	var tsp2p=0;
	var stepsp=0;

	for(i=0;i<e;i++){
		var q = getRandomInt();
		qp+=q;
		var p1 = getRandomInt();
		p1p+=p1;
		var p2 = getRandomInt();
		p2p+=p2
		var config1 = roundRobin(q, p1, p2);
		stepsp+=config1[1];
		tsp1p+=config1[0][0];
		tsp2p+=config1[0][1];
		console.log("q="+q+", p1="+p1+", p2="+p2+", steps="+config1[1]+", Tsp1="+config1[0][0]+", Tsp2="+config1[0][1]);
	}

	qp/=e;
	p1p/=e;
	p2p/=e;
	tsp1p/=e;
	tsp2p/=e;
	stepsp/=e;

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
	return [ [tiempos[2][tiempos[0].length-1],tiempos[3][tiempos[0].length-1]], tiempos[0].length];
}
/**FIN METODOS COLAS */

/** METODOS ASCENSOR */
function proceso2() {
	// var grafica = (document.getElementById('grafica1').innerHTML =
	// 	"<canvas id='canvas2' height='450' width='600'></canvas>");
	// var ctx1 = document.getElementById('canvas2').getContext('2d');
	// var capacidad = parseInt($('#capacidad').val());
	// var pisos = parseInt($('#pisos').val());
	// result = ascensor(capacidad, pisos);
	// var config1 = configuracion2([ result[0], result[1] ]);
	// $('#inicial').val(result[2]);
	// window.myLine2 = new Chart(ctx1, config1);
}

function ascensor(capMax, canPisos) {
	personasAscensor = Math.floor(Math.random() * capMax) + 1;
	personasInicial = personasAscensor;
	console.log('El ascensor comenzo con:', personasAscensor, 'personas.');
	labels = [];
	pasajerosPiso = [];

	for (i = 1; i <= canPisos; i++) {
		numeroPiso = i.toString();
		labels.push('Piso ' + i);
		if (personasAscensor !== 0) {
			quedanAscensor = Math.floor(Math.random() * personasAscensor);
			console.log('Quedan:', quedanAscensor);
			bajanPorPiso = personasAscensor - quedanAscensor;
			personasAscensor = quedanAscensor;
		}
		console.log('Se bajaron', bajanPorPiso, 'en el piso', i, 'quedan:', personasAscensor);
		pasajerosPiso.push(personasAscensor);
	}
	console.log(labels);
	console.log(pasajerosPiso);

	return [ labels, pasajerosPiso, personasInicial ];
}
/**FIN METODOS ASCENSOR */






