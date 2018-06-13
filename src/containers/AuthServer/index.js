import { connect } from 'react-redux';
import { getAuthServer } from '../../reducers';
import * as actions from '../../actions/sync';
import AuthServer from '../../components/AuthServer';

const mapStateToProps = (state) => ({
    authServer: getAuthServer(state)
});

const mapDispatchToProps = {
    changeAuthServer: actions.changeAuthServer
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthServer);
