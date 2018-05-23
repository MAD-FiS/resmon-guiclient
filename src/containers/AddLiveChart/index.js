import { connect } from 'react-redux';
import { getMetricsArray } from '../../reducers';
import { addLiveChart } from '../../actions/liveCharts';
import AddChart from '../../components/AddChart';

const mapStateToProps = (state) => ({
    metrics: getMetricsArray(state)
});

const mapDispatchToProps = {
    onAdd: addLiveChart
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChart);
