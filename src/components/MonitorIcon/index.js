import React from 'react';
import { Icon, Tooltip } from 'antd';
import strToColor from '../../utils/strToColor';

const MonitorIcon = ({ children }) => (
    <Tooltip title={children}>
        <Icon className="monitor-icon" type="database" style={{ color: strToColor(children) }} />
    </Tooltip>
);

export default MonitorIcon;
