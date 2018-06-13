import { connect } from 'react-redux';
import { getMonitorsHostsInvalidated } from '../../reducers';
import * as actions from '../../actions/sync';
import RefreshHostsButton from '../../components/RefreshHostsButton';

const mapStateToProps = (state) => ({
    invalidated: getMonitorsHostsInvalidated(state)
});

const mapDispatchToProps = {
    refresh: actions.getHostsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshHostsButton);
