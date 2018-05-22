import { connect } from 'react-redux';
import { getMonitorsArray } from '../../reducers';
import { changeMonitorAddress, changeMonitorDescription, changeMonitor, addMonitor, removeMonitor } from '../../actions/monitors';
import MonitorsTable from '../../components/MonitorsTable';

const mapStateToProps = (state) => ({
    dataSource: getMonitorsArray(state)
})

const mapDispatchToProps = {
    changeMonitorAddress,
    changeMonitorDescription,
    changeMonitor,
    addMonitor,
    removeMonitor
};

export default connect(mapStateToProps, mapDispatchToProps)(MonitorsTable);
