import React from 'react';

import { Tag, Icon } from 'antd';
import SingleMetric from './SingleMetric';

/**
 * This component displays single metric cell in host list table
 * @reactProps {!object} host - data of single host
 * @reactProps {!function} onShowModal - method executed when "new complex metric" modal should be shown
 * @reactProps {!function} onRemove - method executed when complex metric should be removed
 */
const MetricCell = ({host, onShowModal, onRemove}) => {
    const invalidatedClass = host.metricsInvalidated === true ? ' metrics-invalidated' : '';
    return (
        <div className={`ant-tag-wrapper${invalidatedClass}`}>
            {
                host.metrics.map(metric => <SingleMetric
                    hostname={host.hostname} key={metric.id} metric={metric}
                    onRemove={onRemove} found={host.found}
                />)
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
