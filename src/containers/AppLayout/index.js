import { connect } from 'react-redux';
import { getLocation, getAuth } from '../../reducers';
import * as authActions from '../../actions/auth';
import AppLayout from '../../components/AppLayout'

const mapStateToProps = (state) => ({
    location: getLocation(state),
    auth: getAuth(state)
})

const mapDispatchToProps = {
    signOut: authActions.signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
