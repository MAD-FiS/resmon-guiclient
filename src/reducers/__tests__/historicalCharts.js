import moment from 'moment';
import reducer from '../index';
import * as types from '../../actions/types';

const chart1 = {
    id: 'test2_id',
    metric1: 'test2_metric',
    metric2: 'test3_metric'
};

const chart2 = {
    id: 'test_id',
    metric1: 'test1_metric',
    metric2: null
};

const hosts1 = [
    'host1a',
    'host1b'
];

const hosts2 = [
    'host1a',
    'host1b',
    'host2b'
];

const hosts3 = [
    'host2a',
    'host2b'
];

const chart2Measurements = {
    'host2a': [
        {
            time: '2018-06-09T16:21:30Z',
            value: 32
        },
        {
            time: '2018-06-09T16:26:30Z',
            value: 21
        }
    ],
    'host2b': [
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

const chartStart1 = moment('2018-03-02').toISOString();
const chartEnd1 = moment('2018-03-10').toISOString();
const chartStart2 = moment('2017-03-02').toISOString();
const chartEnd2 = moment('2017-03-10').toISOString();

it('reacts to ADD_HISTORICAL_CHART', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id
            ]
        }
    };
    state = reducer(state, {
        type: types.ADD_HISTORICAL_CHART,
        payload: {
            id: chart2.id,
            metric: chart2.metric1,
            start: chartStart2,
            end: chartEnd2
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: [],
                hosts2: null,
                invalidated: false,
                measurements1: {},
                measurements2: null,
                start: chartStart2,
                end: chartEnd2
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to REMOVE_HISTORICAL_CHART', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.REMOVE_HISTORICAL_CHART,
        meta: {
            id: chart2.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id
        ]
    });
});

it('reacts to SET_HISTORICAL_CHART_RANGE', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.SET_HISTORICAL_CHART_RANGE,
        payload: {
            start: chartStart2,
            end: chartEnd2
        },
        meta: {
            id: chart2.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart2,
                end: chartEnd2
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to SET_HISTORICAL_CHART_METRIC1', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.SET_HISTORICAL_CHART_METRIC1,
        payload: {
            metric: 'test_metric'
        },
        meta: {
            id: chart2.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: [],
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1,
                metric1: 'test_metric'
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to SET_HISTORICAL_CHART_METRIC2 (remove null)', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.SET_HISTORICAL_CHART_METRIC2,
        payload: {
            metric: 'test_metric'
        },
        meta: {
            id: chart2.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: [],
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: {},
                start: chartStart1,
                end: chartEnd1,
                metric2: 'test_metric'
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to SET_HISTORICAL_CHART_METRIC2 (set null)', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: [],
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1,
                    metric2: 'test_metric'
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.SET_HISTORICAL_CHART_METRIC2,
        payload: {
            metric: null
        },
        meta: {
            id: chart2.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to ADD_HISTORICAL_CHART_HOST1', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.ADD_HISTORICAL_CHART_HOST1,
        payload: {
            host: 'new_host'
        },
        meta: {
            id: chart2.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: [
                    ...hosts3,
                    'new_host'
                ],
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to ADD_HISTORICAL_CHART_HOST2', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.ADD_HISTORICAL_CHART_HOST2,
        payload: {
            host: 'new_host'
        },
        meta: {
            id: chart1.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: [
                    ...hosts2,
                    'new_host'
                ],
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});
/*
it('reacts to REMOVE_HISTORICAL_CHART_HOST1', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.REMOVE_HISTORICAL_CHART_HOST1,
        payload: {
            host: 'host1a'
        },
        meta: {
            id: chart1.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1.filter(h => h !== 'host1a'),
                hosts2: hosts2,
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to REMOVE_HISTORICAL_CHART_HOST2', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.REMOVE_HISTORICAL_CHART_HOST2,
        payload: {
            host: 'host1b'
        },
        meta: {
            id: chart1.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2.filter(h => h !== 'host1b'),
                invalidated: false,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});
*/
it('reacts to GET_HISTORICAL_MEASUREMENTS_REQUEST', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: false,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.GET_HISTORICAL_MEASUREMENTS_REQUEST,
        meta: {
            id: chart1.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: true,
                measurements1: {},
                measurements2: {},
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});

it('reacts to GET_HISTORICAL_MEASUREMENTS_SUCCESS', () => {
    let state = {
        historicalCharts: {
            byId: {
                [chart1.id]: {
                    ...chart1,
                    hosts1: hosts1,
                    hosts2: hosts2,
                    invalidated: true,
                    measurements1: {},
                    measurements2: {},
                    start: chartStart1,
                    end: chartEnd1
                },
                [chart2.id]: {
                    ...chart2,
                    hosts1: hosts3,
                    hosts2: null,
                    invalidated: false,
                    measurements1: chart2Measurements,
                    measurements2: null,
                    start: chartStart1,
                    end: chartEnd1
                }
            },
            allIds: [
                chart1.id,
                chart2.id
            ]
        }
    };
    state = reducer(state, {
        type: types.GET_HISTORICAL_MEASUREMENTS_SUCCESS,
        payload: {
            measurements1: chart2Measurements,
            measurements2: chart2Measurements
        },
        meta: {
            id: chart1.id,
        }
    });
    expect(state.historicalCharts).toEqual({
        byId: {
            [chart1.id]: {
                ...chart1,
                hosts1: hosts1,
                hosts2: hosts2,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: chart2Measurements,
                start: chartStart1,
                end: chartEnd1
            },
            [chart2.id]: {
                ...chart2,
                hosts1: hosts3,
                hosts2: null,
                invalidated: false,
                measurements1: chart2Measurements,
                measurements2: null,
                start: chartStart1,
                end: chartEnd1
            }
        },
        allIds: [
            chart1.id,
            chart2.id
        ]
    });
});
