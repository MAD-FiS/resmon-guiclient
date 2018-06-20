import React from 'react';
import { Icon } from 'antd';
import './index.less';

const NoCharts = () => (
    <div className="no-charts">
        <div className="no-charts-inner">
            <Icon className="no-charts-icon" type="line-chart" />
            <p>Brak wykresów</p>
        </div>
    </div>
);

export default NoCharts;
