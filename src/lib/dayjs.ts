import day from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

day.extend(utc);
day.extend(weekday);
day.extend(updateLocale);
day.updateLocale('en', {
	weekStart: 1
});

export const dayjs = day;
export {Dayjs} from 'dayjs';