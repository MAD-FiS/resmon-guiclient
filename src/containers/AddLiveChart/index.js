import { connect } from 'react-redux';
import { getMetricsAll } from '../../reducers';
import * as actions from '../../actions/sync';
import AddChart from '../../components/AddChart';

const mapStateToProps = (state) => ({
    metrics: getMetricsAll(state)
});

const mapDispatchToProps = {
    onAdd: actions.addLiveChart
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChart);
