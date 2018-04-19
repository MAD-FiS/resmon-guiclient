import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

const SignIn = ({ dispatch }) => (
    <div>
        <p>SignIn page</p>
        <Button onClick={() => dispatch(
            authActions.signIn({ testParam: 'test_value' })
        )}>Zaloguj się</Button>
    </div>
);

export default connect()(SignIn);