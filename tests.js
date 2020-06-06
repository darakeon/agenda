void testLeap() {
  if (isLeap(1986))
    printf("error leap\n");
  if (!isLeap(2000))
    printf("error leap\n");
  if (isLeap(2001))
    printf("error leap\n");
  if (isLeap(2100))
    printf("error leap\n");
  if (!isLeap(2400))
    printf("error leap\n");
}

void testEastern() {
  struct Date date;

  date = easternDate(1986);
  if (date.day != 30 || date.month != 3)
    printf(
      "eastern error %d-%d-%d\n"
      , date.year, date.month, date.day
    );

  date = easternDate(1990);
  if (date.day != 15 || date.month != 4)
    printf(
      "eastern error %d-%d-%d\n"
      , date.year, date.month, date.day
    );

  date = easternDate(2020);
  if (date.day != 12 || date.month != 4)
    printf(
      "eastern error %d-%d-%d\n"
      , date.year, date.month, date.day
    );
}

void testFirstWeekDay() {
  int weekDay;

  weekDay = firstWeekdayOf(1986);
  if (weekDay != WEDNESDAY)
    printf("first weekday error %d\n", weekDay);

  weekDay = firstWeekdayOf(1990);
  if (weekDay != MONDAY)
    printf("first weekday error %d\n", weekDay);

  weekDay = firstWeekdayOf(2020);
  if (weekDay != WEDNESDAY)
    printf("first weekday error %d\n", weekDay);
}
