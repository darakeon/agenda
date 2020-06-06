function main() {
	var year = 2008

	printCalendar(year)

	return 0
}

function printCalendar(year) {
	var firstWeekday = firstWeekdayOf(year)

	print(`            ${year}\n`)

	var lastDay = printMonth('January', firstWeekday, 31)
	printMonth('February', lastDay, 28 + isLeap(year))
}

function firstWeekdayOf(year) {
	var eastern = easternDate(year)

	var januaryDays = 31
	var februaryDays = 28 + isLeap(year)
	var marchDays = 31

	var daysUntilEastern = eastern.day
		+ januaryDays + februaryDays

	if (eastern.month == 4)
		daysUntilEastern += marchDays

	var firstSunday = daysUntilEastern % 7

	switch (firstSunday) {
		case 1: return SUNDAY
		case 2: return SATURDAY
		case 3: return FRIDAY
		case 4: return THURSDAY
		case 5: return WEDNESDAY
		case 6: return TUESDAY
		default: return MONDAY
	}
}

function easternDate(year) {
	var date = {}
	date.year = year

	var days = easternDayCountingFromFirstDayOfMarch(year)

	if (days > 31) {
		date.day = days - 31
		date.month = 4
	} else {
		date.day = days
		date.month = 3
	}

	return date
}

function easternDayCountingFromFirstDayOfMarch(year) {
	var g = year % 19 + 1
	var c = year / 100 + 1
	var x = 3 * c / 4 - 12
	var z = (8 * c + 5) / 25 - 5
	var e = (11 * g + 20 + z - x) % 30
	var d = 5 * year / 4 - (x + 10)

	if ((e == 25 && g < 11) || e == 24)
		e++

	var n = 44 - e

	if (n < 21)
		n += 30

	return n + 7 - ((d + n) % 7)
}

function isLeap(year) {
	if (year % 100 == 0)
		year /= 100

	return year % 4 == 0
}

function printMonth(name, firstWeekday, days) {
	var week = 0

	printSeparator()

	print('|&nbsp;')

	for (d = 0; d < name.length; d++) {
		print(name[d])
	}

	for (d = name.length; d < 26; d++) {
		print('&nbsp;')
	}

	print('&nbsp;|\n|')

	// print spaces to fill not used days
	for (d = 0; d < firstWeekday; d++) {
		week = printDay(week, '-', '-')
	}

	// print days that need a zero at its side
	for (d = 1; d < 10; d++) {
		week = printDay(week, '0', d)
	}

	// print all the other days
	for (d = 10; d <= days; d++) {
		week = printDay(week, d)
	}

	var lastWeekday = week % 7

	var lines = 7 * 6 - (firstWeekday + days)

	for (d = 0; d < lines; d++) {
		week = printDay(week, '-', '-')
	}

	print('|\n')

	return lastWeekday
}

function printSeparator() {
	print('| ')
	for (d = 0; d < 26; d++) {
		print('-')
	}
	print(' |\n')
}

function printDay(week, day1, day2) {
	print(`&nbsp;${day1}${day2??''}&nbsp;`)
	week++

	if (week % 7 == 0 && week < 7 * 6) {
		print('|\n|')
	}

	return week
}

function print(text) {
	var html = $('#body').html()
	text = text.replace('\n', '<br />')
	$('#body').html(html + text)
}

var SUNDAY = 0
var MONDAY = 1
var TUESDAY = 2
var WEDNESDAY = 3
var THURSDAY = 4
var FRIDAY = 5
var SATURDAY = 6
