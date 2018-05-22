import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { getAuthTokenRequested } from '../../reducers';
import LoginForm from '../../components/LoginForm';

const mapStateToProps = (state) => ({
    indeterminate: getAuthTokenRequested(state)
})

const mapDispatchToProps = {
    signIn: authActions.signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
