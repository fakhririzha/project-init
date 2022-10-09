import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');
dayjs.locale('id');

const formatDate = (date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') =>
    dayjs(date).format(format);

export default formatDate;
