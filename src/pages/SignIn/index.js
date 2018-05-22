import React from 'react';
import LoginForm from '../../containers/LoginForm';
import AuthServer from '../../containers/AuthServer';

const SignIn = () => (
    <div className="centered-page">
        <h1>Panel logowania</h1>
        <LoginForm />
        <AuthServer />
    </div>
);

export default SignIn;