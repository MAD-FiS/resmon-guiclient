import { connect } from 'react-redux';
import { getMonitorsArray } from '../../reducers';
import * as actions from '../../actions/sync';
import MonitorsTable from '../../components/MonitorsTable';

const mapStateToProps = (state) => ({
    dataSource: getMonitorsArray(state)
});

const mapDispatchToProps = {
    changeMonitorAddress: (monitor, address) => actions.setMonitorAddress({ address }, monitor),
    changeMonitorDescription: (monitor, description) => actions.setMonitorDescription({ description }, monitor),
    addMonitor: actions.addMonitor,
    removeMonitor: actions.removeMonitor
};

export default connect(mapStateToProps, mapDispatchToProps)(MonitorsTable);
