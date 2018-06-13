import reducer from '../index';

it('initializes properly', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
        auth: {
            token: null,
            tokenRequested: false,
            authServer: ''
        },
        monitors: {},
        hosts: {},
        liveCharts: {
            byId: {},
            allIds: []
        },
        historicalCharts: {
            byId: {},
            allIds: []
        }
    });
});
