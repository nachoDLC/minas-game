var delay, totalCasillas, casillasDestapadas;
var imprimeMarcas = document.getElementById('marcas');
var tablero = [];

var bombas = 5;
var totalFilas = totalColumnas = 5;
var timeDelay = 400; //milisegundos

function random ( min, max ) {
	return Math.floor( Math.random() * ( max - min ) + min );
}

function asignartablero ( x, y ) {
	if ( x - 1 > -1 ) {
		if ( y - 1 > -1 ){
			if ( tablero[x - 1][y - 1] != 'mina' ) {
				tablero[x - 1][y - 1]++;
			}
		}

			if ( tablero[x - 1][y] != 'mina' ) {
				tablero[x - 1][y]++;
			}

		if ( y + 1 < totalColumnas ){
			if ( tablero[x - 1][y + 1] != 'mina' ) {
				tablero[x - 1][y + 1]++;
			}
		}
	}

	if ( y - 1 > -1 ){
		if ( tablero[x][y - 1] != 'mina' ) {
			tablero[x][y - 1]++;
		}
	}

	if ( y + 1 < totalColumnas ){
		if ( tablero[x][y + 1] != 'mina' ) {
			tablero[x][y + 1]++;
		}
	}

	if ( x + 1 < totalFilas ) {
		if ( y - 1 > -1 ){
			if ( tablero[x + 1][y - 1] != 'mina' ) {
				tablero[x + 1][y - 1]++;
			}
		}

			if ( tablero[x + 1][y] != 'mina' ) {
				tablero[x + 1][y]++;
			}

		if ( y + 1 < totalColumnas ){
			if ( tablero[x + 1][y + 1] != 'mina' ) {
				tablero[x + 1][y + 1]++;
			}
		}
	}
}

function agregaBombas () {
	var usadas = [];
	var counter = 0;
	do{
		var xRand = random( 0, totalFilas );
		var yRand = random( 0, totalColumnas );

		var casillaUsada = false;
		for (var i in usadas) {
			if ( usadas[i] == xRand + '-' + yRand ) {
				casillaUsada = true;
			}
		}
		if ( !casillaUsada ) {
			usadas.push( xRand + '-' + yRand );
// document.getElementById( 'cell' + xRand + yRand ).innerHTML = 'X';
// document.getElementById( 'cell' + xRand + yRand ).classList.add('mina');
			tablero[xRand][yRand] = 1;
			tablero[xRand][yRand] = 'mina';

			asignartablero( xRand, yRand );
			counter++;
		}
	} while( counter < bombas );
// console.log(tablero);
}

function dibujaMatriz () {
	totalCasillas = totalFilas * totalColumnas;
	imprimeMarcas.innerHTML = bombas;

	for ( var x = 0; x < totalFilas; x++ ) {
		tablero[x] = tablero[x] = [];
		var div = document.createElement( 'div' );
		document.getElementById( 'tablero' ).appendChild( div );
		div.id = 'row' + x;
		for ( var y = 0; y < totalColumnas; y++ ) {
			tablero[x][y] = 0;
			var div = document.createElement( 'div' );
// div.innerHTML = '-';
			document.getElementById( 'row' + x ).appendChild( div );
			div.id = 'cell' + x  + y;
			div.setAttribute('data-x', x);
			div.setAttribute('data-y', y);

			div.addEventListener('click', marcas, false);
			div.addEventListener('dblclick', verificaCasilla, false);
		}
	}
}

function marcas (e) {
	var casilla = e.currentTarget;
	window.clearTimeout(delay);
	delay = window.setTimeout( function () {
		if ( casilla.classList.contains('mark') ) {
			casilla.classList.remove('mark');
			imprimeMarcas.innerHTML = Number(imprimeMarcas.innerHTML) + 1;
		}else{
			casilla.classList.add('mark');
			imprimeMarcas.innerHTML = Number(imprimeMarcas.innerHTML) - 1;
		}
	}, timeDelay );
}
function verificaCasilla (e) {
	window.clearTimeout(delay);
	var casilla = e.currentTarget;
	if ( casilla.classList.contains('mark') ) {
		casilla.classList.remove('mark');
		imprimeMarcas.innerHTML = Number(imprimeMarcas.innerHTML) + 1;
	}else{
		destapaCasilla( casilla.getAttribute('data-x'), casilla.getAttribute('data-y') );
	}
}
function destapaCasilla (x, y) {
	x = Number(x);
	y = Number(y);
	var casilla = document.getElementById('cell' + x + y);
	// console.log(casilla);
	casilla.removeEventListener('click', marcas, false);
	casilla.removeEventListener('dblclick', verificaCasilla, false);
	if ( !casilla.classList.contains('destapado') ) {
		casillasDestapadas++;
	}
	casilla.classList.add('destapado');
	if ( tablero[x][y] != 'mina' ) {
		if ( tablero[x][y] == 0 ) {
				if ( x - 1 > -1 ) {
					if ( y - 1 > -1 ) {
						if ( tablero[x - 1][y - 1] != 'mina'
							&& tablero[x - 1][y - 1] > 0
							&& !document.getElementById('cell' + (x - 1) + (y - 1)).classList.contains('mark') ) {
								destapaCasilla(x - 1, y - 1);
						}
					}
						if ( tablero[x - 1][y] != 'mina'
							&& !document.getElementById('cell' + (x - 1) + (y)).classList.contains('mark') ) {
								destapaCasilla(x - 1, y);
						}
					if ( y + 1 < totalColumnas ) {
						if ( tablero[x - 1][y + 1] != 'mina'
							&& tablero[x - 1][y + 1] > 0
							&& !document.getElementById('cell' + (x - 1) + (y + 1)).classList.contains('mark') ) {
								destapaCasilla(x - 1, y + 1);
						}
					}
				}
				if ( y - 1 > -1 ) {
					if ( tablero[x][y - 1] != 'mina'
						&& !document.getElementById('cell' + (x) + (y - 1)).classList.contains('mark') ) {
							destapaCasilla(x, y - 1);
					}
				}
				if ( y + 1 < totalColumnas
					&& !document.getElementById('cell' + x + (y + 1)).classList.contains('destapado')
					&& !document.getElementById('cell' + x + (y + 1)).classList.contains('mark') ){
						if ( tablero[x][y + 1] != 'mina' ) {
							destapaCasilla(x, y + 1);
						}
				}
				if ( x + 1 < totalFilas ) {
					if ( y - 1 > -1
						&& !document.getElementById('cell' + (x + 1) + (y - 1)).classList.contains('destapado')
						&& !document.getElementById('cell' + (x + 1) + (y - 1)).classList.contains('mark') ){
							if ( tablero[x + 1][y - 1] != 'mina'
								&& tablero[x + 1][y - 1] > 0 ) {
								destapaCasilla(x + 1, y - 1);
							}
					}
						if ( tablero[x + 1][y] != 'mina'
							&& !document.getElementById('cell' + (x + 1) + (y)).classList.contains('destapado')
							&& !document.getElementById('cell' + (x + 1) + (y)).classList.contains('mark') ) {
								destapaCasilla(x + 1, y);
						}
					if ( y + 1 < totalColumnas
						&& !document.getElementById('cell' + (x + 1) + (y + 1)).classList.contains('destapado')
						&& !document.getElementById('cell' + (x + 1) + (y + 1)).classList.contains('mark') ){
							if ( tablero[x + 1][y + 1] != 'mina'
								&& tablero[x + 1][y + 1] > 0 ) {
								destapaCasilla(x + 1, y + 1);
							}
					}
				}
		}else{
			casilla.innerHTML = tablero[x][y];
		}

		if( casillasDestapadas == totalCasillas - bombas ) {
			terminaJuego( 'Ganaste!!' );
		}
	}else{
		// document.getElementById('cell' + x + y).innerHTML = 'X';
		document.getElementById( 'cell' + x + y ).classList.add('explosion');
		terminaJuego( 'Ya perdiste :(' );
	}
}

function terminaJuego (msg) {
	muestraMinas();
	document.getElementById('mensaje').innerHTML = msg;
	document.getElementById('jugar').classList.remove('oculto');
	document.getElementById('jugar').addEventListener('click', iniciaJuego, false);
}

function muestraMinas () {
	for (var x = 0; x < totalFilas; x++) {
		for (var y = 0; y < totalColumnas; y++) {
			var div = document.getElementById( 'cell' + x + y );
			div.removeEventListener('click', marcas, false);
			div.removeEventListener('dblclick', verificaCasilla, false);

			if ( tablero[x][y] == 'mina' ) {
				if ( !div.classList.contains('explosion') ) {
					div.classList.add('mina');
				}
			}
		};
	}
}

function recopilaDatos () {
	document.getElementById('mensaje').innerHTML = '';
	delay, totalCasillas, casillasDestapadas = 0;

	yRand = prompt( 'Cuántas casillas tendrá el tablero de ancho?\nEl número mínimo es 5\nEl número máximo es 20', totalColumnas );
	if ( yRand == null ) { xRand = totalColumnas; }
	if ( yRand > 20 ) { yRand = 20; } else if ( yRand < 5 ) { yRand = 5; }
	xRand = prompt( 'Cuántas casillas tendrá el tablero de alto?\nEl número mínimo es 5\nEl número máximo es 10', totalFilas );
	if ( xRand == null ) { xRand = totalFilas; }
	if ( xRand > 10 ) { xRand = 10; } else if ( xRand < 5 ) { xRand = 5; }
	var maximoBombas = ( xRand * yRand ) - Math.floor( ( xRand * yRand ) / 4 );
	totalFilas = xRand;
	totalColumnas = yRand;
	bombas = prompt('Con cuántas minas quieres jugar?\nEntre más minas más dificil será\nNo pueden ser más de ' + maximoBombas, bombas );
	if ( bombas == null ) { xRand = bombas; }
}

function iniciaJuego(){
	document.getElementById('jugar').removeEventListener('clicl', iniciaJuego, false);
	document.getElementById('jugar').classList.add('oculto');
	document.getElementById( 'tablero' ).innerHTML = '';

	recopilaDatos();
	dibujaMatriz();
	agregaBombas();
}

iniciaJuego();