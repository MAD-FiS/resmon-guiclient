import { connect } from 'react-redux';
import { getHostsArray } from '../../reducers';
import HostList from '../../components/HostList';
import * as actions from '../../actions/sync';

const mapStateToProps = (state) => ({
    hosts: getHostsArray(state)
});

const mapDispatchToProps = {
    onAddMetric: (payload, host) => actions.addComplexMetricRequest(host, payload),
    onRemoveMetric: (host, id) => actions.removeComplexMetricRequest(id, host)
};

export default connect(mapStateToProps, mapDispatchToProps)(HostList);
