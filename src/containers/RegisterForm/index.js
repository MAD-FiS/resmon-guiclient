import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';
import { getAuthTokenRequested } from '../../reducers';
import RegisterForm from '../../components/RegisterForm';

const mapStateToProps = (state) => ({
    indeterminate: getAuthTokenRequested(state)
})

const mapDispatchToProps = {
    signUp: authActions.signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
