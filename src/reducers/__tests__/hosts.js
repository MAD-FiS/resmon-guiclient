import reducer from '../index';
import * as types from '../../actions/types';

const junkMetadata = [
    {
        id: 'OS',
        name: 'Operating System',
        value: 'Ubuntu 18.04'
    }
];

const metric1Payload = {
    description: 'RAM usage in percentage',
    hosts: [
        'not_used'
    ],
    id: 'RAM_USAGE',
    interval: null,
    moving_window_duration: null,
    parent_id: null,
    removable: null,
    unit: '%'
};

const metric2Payload = {
    description: 'CPU usage in percentage',
    hosts: [
        'not_used'
    ],
    id: 'CPU_USAGE',
    interval: null,
    moving_window_duration: null,
    parent_id: null,
    removable: null,
    unit: '%'
};

const metric1ComplexPayload = {
    description: 'Complex 1 Description',
    hosts: [
        'not_used'
    ],
    id: 'cpx_CPU_USAGE_240_120',
    interval: 120,
    moving_window_duration: 240,
    parent_id: 'CPU_USAGE',
    removable: false,
    unit: '%'
};

const metric2ComplexPayload = {
    description: 'Complex 2 Description',
    hosts: [
        'not_used'
    ],
    id: 'cpx_RAM_USAGE_120_60',
    interval: 60,
    moving_window_duration: 120,
    parent_id: 'RAM_USAGE',
    removable: true,
    unit: '%'
};

const metric3ComplexPayload = {
    description: 'Complex 3 Description',
    id: 'cpx_RAM_USAGE_60_60',
    interval: 60,
    moving_window_duration: 60,
    parent_id: 'RAM_USAGE',
    unit: '%'
};

const host1Payload = {
    hostname: 'host1_address',
    metadata: junkMetadata,
    metrics: [
        metric1Payload,
        metric2Payload,
        metric1ComplexPayload
    ]
};

const host2Payload = {
    hostname: 'host2_address',
    metadata: junkMetadata,
    metrics: [
        metric1Payload,
        metric2Payload,
        metric2ComplexPayload
    ]
};

const host3Payload = {
    hostname: 'host3_address',
    metadata: junkMetadata,
    metrics: [
        metric1Payload,
        metric2Payload,
        metric1ComplexPayload,
        metric2ComplexPayload
    ]
};

const convertMetric = state => {
    const { hosts, ...rest } = state; // eslint-disable-line no-unused-vars
    return rest;
};

const convertHost = state => {
    return {
        metricsInvalidated: false,
        ...state,
        metrics: state.metrics.reduce((c, m) => ({
            ...c,
            [m.id]: convertMetric(m)
        }), {})
    };
};

it('reacts to SET_MONITOR_ADDRESS', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2'
            })
        }
    };
    state = reducer(state, {
        type: types.SET_MONITOR_ADDRESS,
        payload: {
            address: 'monitor3'
        },
        meta: {
            monitor: 'monitor1'
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor3'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2'
        })
    });
});

it('reacts to REMOVE_MONITOR', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2'
            })
        }
    };
    state = reducer(state, {
        type: types.REMOVE_MONITOR,
        meta: {
            monitor: 'monitor2'
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        })
    });
});

it('reacts to GET_HOSTS_SUCCESS', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2'
            })
        }
    };
    state = reducer(state, {
        type: types.GET_HOSTS_SUCCESS,
        payload: [
            host3Payload
        ],
        meta: {
            monitor: 'monitor2'
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host3Payload.hostname]: convertHost({
            ...host3Payload,
            monitor: 'monitor2'
        })
    });
});

it('reacts to REMOVE_TOKEN', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2'
            })
        }
    };
    state = reducer(state, { type: types.REMOVE_TOKEN });
    expect(state.hosts).toEqual({});
});

it('reacts to ADD_COMPLEX_METRIC_REQUEST', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2'
            })
        }
    };
    state = reducer(state, {
        type: types.ADD_COMPLEX_METRIC_REQUEST,
        meta: {
            host: host2Payload.hostname
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2',
            metricsInvalidated: true
        })
    });
});

it('reacts to ADD_COMPLEX_METRIC_SUCCESS', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2',
                metricsInvalidated: true
            })
        }
    };
    state = reducer(state, {
        type: types.ADD_COMPLEX_METRIC_SUCCESS,
        payload: metric3ComplexPayload,
        meta: {
            host: host2Payload.hostname
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2',
            metrics: [
                ...host2Payload.metrics,
                {
                    ...metric3ComplexPayload,
                    removable: true
                }
            ]
        })
    });
});

it('reacts to ADD_COMPLEX_METRIC_FAILURE', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2',
                metricsInvalidated: true
            })
        }
    };
    state = reducer(state, {
        type: types.ADD_COMPLEX_METRIC_FAILURE,
        payload: {},
        error: true,
        meta: {
            host: host2Payload.hostname
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2'
        })
    });
});

it('reacts to REMOVE_COMPLEX_METRIC_REQUEST', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2'
            })
        }
    };
    state = reducer(state, {
        type: types.REMOVE_COMPLEX_METRIC_REQUEST,
        meta: {
            host: host2Payload.hostname
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2',
            metricsInvalidated: true
        })
    });
});

it('reacts to REMOVE_COMPLEX_METRIC_SUCCESS', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2',
                metricsInvalidated: true
            })
        }
    };
    state = reducer(state, {
        type: types.REMOVE_COMPLEX_METRIC_SUCCESS,
        meta: {
            id: metric2ComplexPayload.id,
            host: host2Payload.hostname
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2',
            metrics: host2Payload.metrics.filter(m => m !== metric2ComplexPayload)
        })
    });
});

it('reacts to REMOVE_COMPLEX_METRIC_FAILURE', () => {
    let state = {
        hosts: {
            [host1Payload.hostname]: convertHost({
                ...host1Payload,
                monitor: 'monitor1'
            }),
            [host2Payload.hostname]: convertHost({
                ...host2Payload,
                monitor: 'monitor2',
                metricsInvalidated: true
            })
        }
    };
    state = reducer(state, {
        type: types.REMOVE_COMPLEX_METRIC_FAILURE,
        meta: {
            host: host2Payload.hostname
        }
    });
    expect(state.hosts).toEqual({
        [host1Payload.hostname]: convertHost({
            ...host1Payload,
            monitor: 'monitor1'
        }),
        [host2Payload.hostname]: convertHost({
            ...host2Payload,
            monitor: 'monitor2'
        })
    });
});
