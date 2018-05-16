import React from 'react';
import { Table } from 'antd';
import NewMetricModal from './NewMetricModal';
import MetadataCell from './MetadataCell';
import MetricCell from './MetricCell';

import {Hostname as HostnameFiltered} from "./FilteredTable/Hostname";
import {Metrics as MetricsFiltered} from "./FilteredTable/Metrics";
import {Metadata as MetadataFiltered} from "./FilteredTable/Metadata";

import './index.less';

class HostList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        hostToAddMetric: null
    });

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
            this.setState(this.getInitialState());
        }
    }

    showModal = (hostname) => {
        const hostToAddMetric = this.props.hosts.find(host => host.hostname === hostname);
        if(typeof hostToAddMetric !== 'undefined') {
            this.setState({
                hostToAddMetric
            })
        }
    };

    closeModal = () => {
        this.setState({
            hostToAddMetric: null
        })
    };

    allMetadata = (hosts) => {
        const metadata = {};
        hosts.forEach((host) => {
            host.metadata.forEach((singleMetadata) => {
                metadata[singleMetadata.id] = singleMetadata;
            });
        });
        return metadata;
    };

    allMetrics = (hosts) => {
        const base = {}, complex = {};
        hosts.forEach((host) => {
            host.metrics.forEach((metric) => {
                if(metric.parent_id === null) {
                    base[metric.id] = metric.id;
                } else {
                    complex[metric.id] = metric.id;
                }
            });
        });
        return {
            base,
            complex
        };
    };

    render() {
        const columns = [{
            title: 'Host',
            dataIndex: 'displayName',
            key: 'hostname',
            width: '26%',
        }, {
            title: 'Metadane',
            dataIndex: 'metadata',
            key: 'metadata',
            width: '37%',
            render: (metadata, host) => <MetadataCell metadata={metadata}/>,
        }, {
            title: 'Metryki',
            dataIndex: 'metrics',
            key: 'metrics',
            width: '37%',
            render: (metrics, host) => <MetricCell onShowModal={this.showModal} onRemove={this.props.onRemoveMetric} host={host}/>,
        }];

        const hosts = this.props.hosts.map(host=> {host.key=host.hostname;host.displayName=host.hostname;return host});

        return (
            <div className="host-list">
                <NewMetricModal host={this.state.hostToAddMetric} onAddMetric={this.props.onAddMetric} onClose={this.closeModal}/>
                <HostnameFiltered dataSource={hosts} columns={columns}>
                    <MetricsFiltered metrics={this.allMetrics(this.props.hosts)}>
                        <MetadataFiltered metadata={this.allMetadata(this.props.hosts)}>
                            <Table size="middle" bordered />
                        </MetadataFiltered>
                    </MetricsFiltered>
                </HostnameFiltered>
            </div>
        );
    }
}

export default HostList;
