import { connect } from 'react-redux';
import { getLocation, isAuthTokenSet } from '../../reducers';
import { signOut } from '../../actions/auth';
import AppLayout from '../../components/AppLayout'

const mapStateToProps = (state) => ({
    location: getLocation(state),
    auth: isAuthTokenSet(state)
})

const mapDispatchToProps = {
    signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
