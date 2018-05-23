import { connect } from 'react-redux';
import { getMonitorsHostsInvalidated } from '../../reducers';
import { refreshHosts } from '../../actions/hosts';
import RefreshHostsButton from '../../components/RefreshHostsButton';

const mapStateToProps = (state) => ({
    invalidated: getMonitorsHostsInvalidated(state)
})

const mapDispatchToProps = {
    refresh: refreshHosts
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshHostsButton);
