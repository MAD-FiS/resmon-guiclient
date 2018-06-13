import { connect } from 'react-redux';
import * as actions from '../../actions/sync';
import { getTokenRequested } from '../../reducers';
import RegisterForm from '../../components/RegisterForm';

const mapStateToProps = (state) => ({
    indeterminate: getTokenRequested(state)
});

const mapDispatchToProps = {
    signUp: actions.signUpRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
