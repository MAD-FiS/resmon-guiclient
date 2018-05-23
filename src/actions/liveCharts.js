import guid from '../utils/guid';

export const ADD_LIVE_CHART = 'ADD_LIVE_CHART';
export const REMOVE_LIVE_CHART = 'REMOVE_LIVE_CHART';

export const addLiveChart = (metric) => ({
    type: ADD_LIVE_CHART,
    metric,
    id: guid()
});
