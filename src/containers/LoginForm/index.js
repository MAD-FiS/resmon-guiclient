import { connect } from 'react-redux';
import * as actions from '../../actions/sync';
import { getTokenRequested } from '../../reducers';
import LoginForm from '../../components/LoginForm';

const mapStateToProps = (state) => ({
    indeterminate: getTokenRequested(state)
});

const mapDispatchToProps = {
    signIn: actions.signInRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
