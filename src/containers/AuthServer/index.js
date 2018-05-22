import { connect } from 'react-redux';
import { getAuthServer } from '../../reducers';
import * as authActions from '../../actions/auth';
import AuthServer from '../../components/AuthServer'

const mapStateToProps = (state) => ({
    authServer: getAuthServer(state)
})

const mapDispatchToProps = {
    changeAuthServer: authActions.changeAuthServer
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthServer);
