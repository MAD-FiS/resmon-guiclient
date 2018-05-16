import React from 'react';
import { Row, Col } from 'antd';

const MetricInfo = ({metric}) => (
    <div>
        {
            metric.parent_id !== null ? <div>
                <Row>
                    <Col span={12}>Opis:</Col>
                    <Col span={12}>{metric.description}</Col>
                </Row>
                <Row>
                    <Col span={12}>Metryka bazowa:</Col>
                    <Col span={12}>{metric.parent_id}</Col>
                </Row>
                <Row>
                    <Col span={12}>Szer. okna:</Col>
                    <Col span={12}>{metric.moving_window_duration}</Col>
                </Row>
                <Row>
                    <Col span={12}>Częstotliwość:</Col>
                    <Col span={12}>{metric.interval}</Col>
                </Row>
            </div> : metric.description
        }
    </div>
);

export default MetricInfo;
