function imprimirCalendario(ano) {
	var primeiroDiaDeSemana = primeiroDiaDeSemanaDe(ano)

	imprimir(`            ${ano}\n`)

	var ultimoDia = imprimirMes('Janeiro', primeiroDiaDeSemana, 31)
	imprimirMes('Fevereiro', ultimoDia, 28 + eBissexto(ano))
}

function primeiroDiaDeSemanaDe(ano) {
	var pascoa = dataPascoa(ano)

	var diasJaneiro = 31
	var diasFevereiro = 28 + eBissexto(ano)
	var diasMarco = 31

	var diasAteAPascoa = pascoa.dia
		+ diasJaneiro + diasFevereiro

	if (pascoa.mes == 4)
		diasAteAPascoa += diasMarco

	var primeiroDomingoAno = diasAteAPascoa % 7

	switch (primeiroDomingoAno) {
		case 1: return DOMINGO
		case 2: return SABADO
		case 3: return SEXTA
		case 4: return QUINTA
		case 5: return QUARTA
		case 6: return TERCA
		default: return SEGUNDA
	}
}

function dataPascoa(ano) {
	var data = {ano}

	var dias = diaDaPascoaAPartirDeMarco(ano)

	if (dias > 31) {
		data.dia = dias - 31
		data.mes = 4
	} else {
		data.dia = dias
		data.mes = 3
	}

	return data
}

function diaDaPascoaAPartirDeMarco(ano) {
	var g = ano % 19 + 1
	var c = inteiro(ano / 100) + 1
	var x = inteiro(3 * c / 4) - 12
	var z = inteiro((8 * c + 5) / 25) - 5
	var e = (11 * g + 20 + z - x) % 30
	var d = 5 * inteiro(ano / 4) - (x + 10)

	if ((e == 25 && g < 11) || e == 24)
		e++

	var n = 44 - e

	if (n < 21)
		n += 30

	return n + 7 - ((d + n) % 7)
}

function eBissexto(ano) {
	if (ano % 100 == 0)
		ano = inteiro(ano / 100)

	return ano % 4 == 0
}

function imprimirMes(nome, primeiroDiaDeSemana, dias) {
	var semana = 0

	imprimirSeparador()

	imprimir('|&nbsp;')

	for (d = 0; d < nome.length; d++) {
		imprimir(nome[d])
	}

	for (d = nome.length; d < 26; d++) {
		imprimir('&nbsp;')
	}

	imprimir('&nbsp;|\n|')

	// imprimir spaces to fill not used dias
	for (d = 0; d < primeiroDiaDeSemana; d++) {
		semana = imprimirDia(semana, '--')
	}

	// imprimir dias that need a zero at its side
	for (d = 1; d <= dias; d++) {
		semana = imprimirDia(semana, d)
	}

	var ultimoDiaSemana = semana % 7

	var linhas = 7 * 6 - (primeiroDiaDeSemana + dias)

	for (d = 0; d < linhas; d++) {
		semana = imprimirDia(semana, '--')
	}

	imprimir('|\n')

	return ultimoDiaSemana
}

function imprimirSeparador() {
	imprimir('| ')
	for (d = 0; d < 26; d++) {
		imprimir('-')
	}
	imprimir(' |\n')
}

function imprimirDia(semana, dia) {
	if (dia < 10)
		dia = '0' + dia
	
	imprimir(`&nbsp;${dia}&nbsp;`)
	semana++

	if (semana % 7 == 0 && semana < 7 * 6) {
		imprimir('|\n|')
	}

	return semana
}

function imprimir(text) {
	var html = $('#calendario').html()
	text = text.replace('\n', '<br />')
	$('#calendario').html(html + text)
}

function inteiro(number) {
	return Math.floor(number)
}

var DOMINGO = 0
var SEGUNDA = 1
var TERCA = 2
var QUARTA = 3
var QUINTA = 4
var SEXTA = 5
var SABADO = 6
