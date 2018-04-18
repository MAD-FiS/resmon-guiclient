import { push } from 'react-router-redux';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const signIn = (form) => (dispatch) => {
    dispatch({ type: SIGN_IN, form });
    dispatch(push('/'));
}

export const signOut = () => (dispatch) => {
    dispatch({ type: SIGN_OUT });
    dispatch(push('/sign-in'));
}
