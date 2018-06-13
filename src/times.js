import moment from 'moment';

export const getStartTimeForLiveCharts = () => moment().subtract(15, 'minutes').toISOString();
export const getCurrentTime = () => moment().toISOString();
