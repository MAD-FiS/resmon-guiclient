import React from 'react';
import { Modal } from 'antd';

import MetricForm from './MetricForm';

class NewMetricModal extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            validated: true,
            newMetric: this.getNewMetricValues(),
            baseMetrics: this.getBaseMetrics(props)
        };
        this.form = null;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.host !== nextProps.host) {
            this.setState({
                baseMetrics: this.getBaseMetrics(nextProps),
                newMetric: this.getNewMetricValues()
            });
        }
    }

    getNewMetricValues() {
        return {
            description: '',
            parent_id: null,
            moving_window_duration: '',
            interval: ''
        };
    }

    getBaseMetrics = (props) => {
        let baseMetrics = [];
        if(props.host !== null) {
            const { metrics } = props.host;
            if(typeof metrics !== 'undefined') {
                metrics.forEach(metric => {
                    if(metric.parent_id === null) {
                        baseMetrics.push({
                            name: `${metric.id} (${metric.description})`,
                            value: metric.id
                        });
                    }
                });
            }
        }
        return baseMetrics;
    };

    onChange = (key, value) => {
        let newMetric = Object.assign({}, this.state.newMetric);
        newMetric[key] = value;
        this.setState({
            newMetric
        });
    };

    onClear = (key) => {
        let newMetric = Object.assign({}, this.state.newMetric);
        newMetric[key] = '';
        this.setState({
            newMetric
        });
    };

    clearModal = () => {
        this.setState({
            newMetric: this.getNewMetricValues(),
        });
        this.props.onClose();
    };

    addMetric = () => {
        if(this.form !== null) {
            this.form.validateFields(err => {
                if (!err) {
                    this.props.onAddMetric(this.props.host.hostname, this.state.newMetric);
                    this.form.setFieldsValue(this.getNewMetricValues());
                }
            });
        }
    };

    setFormRef = (form) => {
        this.form = form;
    };

    render() {
        const {host} = this.props;
        return (
            <Modal
                title="Nowa metryka złożona"
                visible={this.props.host !== null}
                onOk={this.addMetric}
                onCancel={this.clearModal}
                okText="Dodaj metrykę"
                cancelText="Anuluj"
                confirmLoading={this.props.host && this.props.host.metricsInvalidated}
            >
                <MetricForm
                    host={host} metrics={this.state.baseMetrics} newMetric={this.state.newMetric}
                    setFormRef={this.setFormRef} onChange={this.onChange} onClear={this.onClear}
                />
            </Modal>
        );
    }
}

export default NewMetricModal;
