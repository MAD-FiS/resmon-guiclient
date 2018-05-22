import React from 'react';
import RegisterForm from '../../containers/RegisterForm';
import AuthServer from '../../containers/AuthServer';

const SignUp = () => (
    <div className="centered-page">
        <h1>Panel rejestracji</h1>
        <RegisterForm />
        <AuthServer />
    </div>
);

export default SignUp;
