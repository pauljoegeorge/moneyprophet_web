import moment from "moment";

export function getReportingPeriod(selectedMonth, now = moment()) {
  const month = moment(selectedMonth, "YYYY-MM-DD", true).startOf("month");
  if (!selectedMonth || !month.isValid()) {
    return { daysElapsed: 0, daysInMonth: 0 };
  }
  const daysInMonth = month.daysInMonth();
  let daysElapsed = 0;
  if (month.isBefore(now, "month")) daysElapsed = daysInMonth;
  else if (month.isSame(now, "month")) daysElapsed = moment(now).date();
  return { daysElapsed, daysInMonth };
}
