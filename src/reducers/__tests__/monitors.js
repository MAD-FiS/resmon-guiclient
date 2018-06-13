import reducer from '../index';
import * as types from '../../actions/types';

const monitor1Payload = {
    address: 'moitor1_address',
    description: 'monitor1_description'
};

const monitor2Payload = {
    address: 'moitor2_address',
    description: 'monitor2_description'
};

it('reacts to ADD_MONITOR', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            }
        }
    };
    state = reducer(state, {
        type: types.ADD_MONITOR,
        payload: monitor2Payload
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        [monitor2Payload.address]: {
            ...monitor2Payload,
            hostsRequested: false
        }
    });
});

it('reacts to SET_MONITOR_ADDRESS', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: false
            }
        }
    };
    state = reducer(state, {
        type: types.SET_MONITOR_ADDRESS,
        payload: {
            address: 'changed!'
        },
        meta: {
            monitor: monitor2Payload.address
        }
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        'changed!': {
            ...monitor2Payload,
            hostsRequested: false,
            address: 'changed!'
        }
    });
});

it('reacts to SET_MONITOR_DESCRIPTION', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: false
            }
        }
    };
    state = reducer(state, {
        type: types.SET_MONITOR_DESCRIPTION,
        payload: {
            description: 'bbbb'
        },
        meta: {
            monitor: monitor2Payload.address
        }
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        [monitor2Payload.address]: {
            ...monitor2Payload,
            hostsRequested: false,
            description: 'bbbb'
        }
    });
});

it('reacts to REMOVE_MONITOR', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: false
            }
        }
    };
    state = reducer(state, {
        type: types.REMOVE_MONITOR,
        meta: {
            monitor: monitor2Payload.address
        }
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        }
    });
});

it('reacts to GET_HOSTS_REQUEST', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: false
            }
        }
    };
    state = reducer(state, {
        type: types.GET_HOSTS_REQUEST,
        meta: {
            monitor: monitor2Payload.address
        }
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        [monitor2Payload.address]: {
            ...monitor2Payload,
            hostsRequested: true
        }
    });
});

it('reacts to GET_HOSTS_SUCCESS', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: true
            }
        }
    };
    state = reducer(state, {
        type: types.GET_HOSTS_SUCCESS,
        payload: [],
        meta: {
            monitor: monitor2Payload.address
        }
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        [monitor2Payload.address]: {
            ...monitor2Payload,
            hostsRequested: false
        }
    });
});

it('reacts to GET_HOSTS_FAILURE', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: false
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: true
            }
        }
    };
    state = reducer(state, {
        type: types.GET_HOSTS_FAILURE,
        payload: {},
        error: true,
        meta: {
            monitor: monitor2Payload.address
        }
    });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        [monitor2Payload.address]: {
            ...monitor2Payload,
            hostsRequested: false
        }
    });
});

it('reacts to REMOVE_TOKEN', () => {
    let state = {
        monitors: {
            [monitor1Payload.address]: {
                ...monitor1Payload,
                hostsRequested: true
            },
            [monitor2Payload.address]: {
                ...monitor2Payload,
                hostsRequested: false
            }
        }
    };
    state = reducer(state, { type: types.REMOVE_TOKEN });
    expect(state.monitors).toEqual({
        [monitor1Payload.address]: {
            ...monitor1Payload,
            hostsRequested: false
        },
        [monitor2Payload.address]: {
            ...monitor2Payload,
            hostsRequested: false
        }
    });
});
