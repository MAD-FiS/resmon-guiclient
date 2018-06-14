import React from 'react';
import { Tooltip, Tag } from 'antd';

import MetricInfo from './MetricInfo';
import RemoveMetric from './RemoveMetric';

const SingleMetric = ({hostname, metric, onRemove, found}) => {
    //const removable = metric.interval !== null;
    return (<Tooltip placement="bottom" title={<MetricInfo metric={metric}/>}>
        <Tag
            color={found ? 'red' : (metric.interval === null ? '#87d068' : '#2db7f5')}
        >{metric.id}
            {
                <RemoveMetric onConfirm={(e) => {
                    e.preventDefault();
                    onRemove(hostname, metric.id);
                }}/>
            }
        </Tag>
    </Tooltip>);
};

export default SingleMetric;

//{/*removable && metric.removable ?*/} 
//{/* : null */}
