export const CHANGE_MONITOR_ADDRESS = 'CHANGE_MONITOR_ADDRESS';
export const CHANGE_MONITOR_DESCRIPTION = 'CHANGE_MONITOR_DESCRIPTION';
export const CHANGE_MONITOR = 'CHANGE_MONITOR';
export const ADD_MONITOR = 'ADD_MONITOR';
export const REMOVE_MONITOR = 'REMOVE_MONITOR';

export const changeMonitorAddress = (address, newAddress) => ({
    type: CHANGE_MONITOR_ADDRESS,
    address,
    newAddress
});

export const changeMonitorDescription = (address, newDescription) => ({
    type: CHANGE_MONITOR_DESCRIPTION,
    address,
    newDescription
});

export const changeMonitor = (address, payload) => ({
    type: CHANGE_MONITOR,
    address,
    payload
});

export const addMonitor = (payload) => ({
    type: ADD_MONITOR,
    payload
});

export const removeMonitor = (address) => ({
    type: REMOVE_MONITOR,
    address
});
