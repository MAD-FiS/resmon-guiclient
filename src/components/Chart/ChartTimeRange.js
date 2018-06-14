import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ChartTimeRange = ({ from, to, onChange }) => (
    <div className="chart-time-range">
        Przedział czasu: <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={[ moment(from), moment(to) ]}
            onOk={([ from, to ]) => onChange(from.format(), to.format())}
        />
    </div>
);

export default ChartTimeRange;