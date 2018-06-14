import reducer from '../index';
import * as types from '../../actions/types';

const chart1Payload = {
    id: 'test_id',
    metric: 'test1_metric'
};

const chart2Payload = {
    id: 'test2_id',
    metric: 'test2_metric'
};

const hosts1Payload = [
    'host1a',
    'host1b'
];

const hosts2Payload = [
    'host2a',
    'host2b'
];

const chart1MeasurementsPayload = {
    'host1a': [
        {
            time: '2018-06-09T16:21:30Z',
            value: 32
        },
        {
            time: '2018-06-09T16:26:30Z',
            value: 21
        }
    ],
    'host1b': [
        {
            time: '2018-06-09T16:21:00Z',
            value: 12
        },
        {
            time: '2018-06-09T16:26:00Z',
            value: 63
        }
    ]
};

it('reacts to ADD_LIVE_CHART', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: [],
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.ADD_LIVE_CHART,
        payload: chart2Payload
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart1Payload.id]: {
                ...chart1Payload,
                hosts: [],
                invalidated: false,
                measurements: {}
            },
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: [],
                invalidated: false,
                measurements: {}
            }
        },
        allIds: [
            chart1Payload.id,
            chart2Payload.id
        ]
    });
});

it('reacts to REMOVE_LIVE_CHART', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: [],
                    invalidated: false,
                    measurements: {}
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: [],
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.REMOVE_LIVE_CHART,
        meta: {
            id: chart1Payload.id
        }
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: [],
                invalidated: false,
                measurements: {}
            }
        },
        allIds: [
            chart2Payload.id
        ]
    });
});

it('reacts to SET_LIVE_CHART_METRIC', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: hosts1Payload,
                    invalidated: false,
                    measurements: {}
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: hosts2Payload,
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.SET_LIVE_CHART_METRIC,
        payload: {
            metric: 'test3_metric'
        },
        meta: {
            id: chart1Payload.id
        }
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart1Payload.id]: {
                ...chart1Payload,
                metric: 'test3_metric',
                hosts: [],
                invalidated: false,
                measurements: {}
            },
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: hosts2Payload,
                invalidated: false,
                measurements: {},
            }
        },
        allIds: [
            chart1Payload.id,
            chart2Payload.id
        ]
    });
});

it('reacts to ADD_LIVE_CHART_HOST', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: hosts1Payload,
                    invalidated: false,
                    measurements: {}
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: hosts2Payload,
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.ADD_LIVE_CHART_HOST,
        payload: {
            host: 'host3'
        },
        meta: {
            id: chart1Payload.id
        }
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart1Payload.id]: {
                ...chart1Payload,
                hosts: [
                    ...hosts1Payload,
                    'host3'
                ],
                invalidated: false,
                measurements: {}
            },
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: hosts2Payload,
                invalidated: false,
                measurements: {}
            }
        },
        allIds: [
            chart1Payload.id,
            chart2Payload.id
        ]
    });
});

it('reacts to REMOVE_LIVE_CHART_HOST', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: hosts1Payload,
                    invalidated: false,
                    measurements: {}
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: hosts2Payload,
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.REMOVE_LIVE_CHART_HOST,
        meta: {
            id: chart1Payload.id,
            host: 'host1b'
        }
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart1Payload.id]: {
                ...chart1Payload,
                hosts: hosts1Payload.filter(h => h !== 'host1b'),
                invalidated: false,
                measurements: {}
            },
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: hosts2Payload,
                invalidated: false,
                measurements: {}
            }
        },
        allIds: [
            chart1Payload.id,
            chart2Payload.id
        ]
    });
});

it('reacts to GET_LIVE_MEASUREMENTS_REQUEST', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: hosts1Payload,
                    invalidated: false,
                    measurements: {}
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: hosts2Payload,
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.GET_LIVE_MEASUREMENTS_REQUEST,
        meta: {
            id: chart1Payload.id
        }
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart1Payload.id]: {
                ...chart1Payload,
                hosts: hosts1Payload,
                invalidated: true,
                measurements: {}
            },
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: hosts2Payload,
                invalidated: false,
                measurements: {}
            }
        },
        allIds: [
            chart1Payload.id,
            chart2Payload.id
        ]
    });
});

it('reacts to GET_LIVE_MEASUREMENTS_SUCCESS', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: hosts1Payload,
                    invalidated: true,
                    measurements: {}
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: hosts2Payload,
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.GET_LIVE_MEASUREMENTS_SUCCESS,
        payload: {
            measurements: chart1MeasurementsPayload
        },
        meta: {
            id: chart1Payload.id
        }
    });
    expect(state.liveCharts).toEqual({
        byId: {
            [chart1Payload.id]: {
                ...chart1Payload,
                hosts: hosts1Payload,
                invalidated: false,
                measurements: chart1MeasurementsPayload
            },
            [chart2Payload.id]: {
                ...chart2Payload,
                hosts: hosts2Payload,
                invalidated: false,
                measurements: {}
            }
        },
        allIds: [
            chart1Payload.id,
            chart2Payload.id
        ]
    });
});

it('reacts to REMOVE_TOKEN', () => {
    let state = {
        liveCharts: {
            byId: {
                [chart1Payload.id]: {
                    ...chart1Payload,
                    hosts: hosts1Payload,
                    invalidated: true,
                    measurements: chart1MeasurementsPayload
                },
                [chart2Payload.id]: {
                    ...chart2Payload,
                    hosts: hosts2Payload,
                    invalidated: false,
                    measurements: {}
                }
            },
            allIds: [
                chart1Payload.id,
                chart2Payload.id
            ]
        }
    };
    state = reducer(state, {
        type: types.REMOVE_TOKEN,
    });
    expect(state.liveCharts).toEqual({
        byId: {},
        allIds: []
    });
});
