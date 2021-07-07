import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/ru';

export function formatDateTime(dateTime: string): string {
  const dateTo = new Date(dateTime);
  const dateFrom = new Date();
  const diffTime = dateFrom.getTime() - dateTo.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  const day = moment().subtract(diffDays, 'days').calendar();
  const formatDay = day.split(",")[0];
  const time = moment(dateTo).format('HH:mm');
  const zone = dateTo.toString().split(" ")[5];
  return `${formatDay}, ${time} i-${zone}`;
}