import { connect } from 'react-redux';
import { getLocation, getToken } from '../../reducers';
import * as actions from '../../actions/sync';
import AppLayout from '../../components/AppLayout';

const mapStateToProps = (state) => ({
    location: getLocation(state),
    auth: getToken(state)
});

const mapDispatchToProps = {
    signOut: actions.removeToken
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
