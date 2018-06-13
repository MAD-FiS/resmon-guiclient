import reducer from '../index';
import * as types from '../../actions/types';

it('reacts to SIGN_IN_REQUEST', () => {
    let state = {
        auth: {
            token: null,
            tokenRequested: false,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.SIGN_IN_REQUEST });
    expect(state.auth).toEqual({
        token: null,
        tokenRequested: true,
        authServer: 'junk'
    });
});

it('reacts to SIGN_IN_SUCCESS', () => {
    let state = {
        auth: {
            token: null,
            tokenRequested: true,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.SIGN_IN_SUCCESS, payload: { access_token: 'xxx' }});
    expect(state.auth).toEqual({
        token: 'xxx',
        tokenRequested: false,
        authServer: 'junk'
    });
});

it('reacts to SIGN_IN_FAILURE', () => {
    let state = {
        auth: {
            token: null,
            tokenRequested: true,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.SIGN_IN_FAILURE });
    expect(state.auth).toEqual({
        token: null,
        tokenRequested: false,
        authServer: 'junk'
    });
});

it('reacts to SIGN_UP_REQUEST', () => {
    let state = {
        auth: {
            token: null,
            tokenRequested: false,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.SIGN_UP_REQUEST });
    expect(state.auth).toEqual({
        token: null,
        tokenRequested: true,
        authServer: 'junk'
    });
});

it('reacts to SIGN_UP_SUCCESS', () => {
    let state = {
        auth: {
            token: null,
            tokenRequested: true,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.SIGN_UP_SUCCESS, payload: { access_token: 'xxx' }});
    expect(state.auth).toEqual({
        token: 'xxx',
        tokenRequested: false,
        authServer: 'junk'
    });
});

it('reacts to SIGN_UP_FAILURE', () => {
    let state = {
        auth: {
            token: null,
            tokenRequested: true,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.SIGN_UP_FAILURE });
    expect(state.auth).toEqual({
        token: null,
        tokenRequested: false,
        authServer: 'junk'
    });
});

it('reacts to REMOVE_TOKEN', () => {
    let state = {
        auth: {
            token: 'xxx',
            tokenRequested: false,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.REMOVE_TOKEN });
    expect(state.auth).toEqual({
        token: null,
        tokenRequested: false,
        authServer: 'junk'
    });
});

it('reacts to CHANGE_AUTH_SERVER', () => {
    let state = {
        auth: {
            token: 'xxx',
            tokenRequested: false,
            authServer: 'junk'
        }
    };
    state = reducer(state, { type: types.CHANGE_AUTH_SERVER, payload: { address: 'junk2' }});
    expect(state.auth).toEqual({
        token: 'xxx',
        tokenRequested: false,
        authServer: 'junk2'
    });
});
