import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ru';

export function strToDate(dtStr) {
  let dateParts = dtStr.split(".");
  let timeParts = dateParts[2].split(" ")[1].split(":");
  dateParts[2] = dateParts[2].split(" ")[0];
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]); 
}

export function formatDateTime(dateTime) {
  const dateTo = strToDate(dateTime);
  const dateFrom = new Date("06/24/2021");
  const diffTime = dateFrom.getTime() - dateTo.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  const day = moment().subtract(diffDays, 'days').calendar();
  const formatDay = day.split(",")[0];
  const time = moment(strToDate(dateTime)).format('HH:MM');
  const zone = strToDate(dateTime).toString().split(" ")[5];
  const formatZone = Math.round(zone.split("+")[1]).toString().split('')[0];
  return `${formatDay}, ${time} i-${zone.split("+")[0]}+${formatZone}`;
}