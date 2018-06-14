import { connect } from 'react-redux';
import { getHostsArray } from '../../reducers';
import HostList from '../../components/HostList';

const mapStateToProps = (state) => ({
    hosts: getHostsArray(state)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HostList);
