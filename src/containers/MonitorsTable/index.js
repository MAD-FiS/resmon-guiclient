import { connect } from 'react-redux';
import { getMonitorsArray } from '../../reducers';
import * as actions from '../../actions/sync';
import MonitorsTable from '../../components/MonitorsTable';

const mapStateToProps = (state) => ({
    dataSource: getMonitorsArray(state)
});

const mapDispatchToProps = {
    changeMonitorAddress: actions.setMonitorAddress,
    changeMonitorDescription: actions.setMonitorDescription,
    changeMonitor: (payload, monitor) => {
        actions.setMonitorDescription(payload, monitor);
        actions.setMonitorAddress(payload, monitor);
    },
    addMonitor: actions.addMonitor,
    removeMonitor: actions.removeMonitor
};

export default connect(mapStateToProps, mapDispatchToProps)(MonitorsTable);
