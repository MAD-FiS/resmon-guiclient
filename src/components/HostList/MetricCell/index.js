import React from 'react';

import { Tag, Icon } from 'antd';
import SingleMetric from './SingleMetric';

const MetricCell = ({host, onShowModal, onRemove}) => {
    const invalidatedClass = host.metricsInvalidated === true ? ' metrics-invalidated' : '';
    return (
        <div className={`ant-tag-wrapper${invalidatedClass}`}>
            {
                host.metrics.map(metric => <SingleMetric hostname={host.hostname} key={metric.id} metric={metric} onRemove={onRemove} found={host.found}/>)
            }
            <Tag
                onClick={() => onShowModal(host.hostname)}
                style={{ background: '#fff', borderStyle: 'dashed' }}
            >
                <Icon type="plus" /> Dodaj metrykę złożoną
            </Tag>
        </div>
    );
};

export default MetricCell;
