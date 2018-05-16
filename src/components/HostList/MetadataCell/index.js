import React from 'react';

import { Collapse, List, Col} from 'antd';
const Panel = Collapse.Panel;

const MetadataCell = ({metadata}) => {
    return (
        <Collapse bordered={false}>
            <Panel header={<span>{metadata.length} metadanych <em>(kliknij aby rozwinąć)</em></span>} key="1">
                <List
                    dataSource={metadata}
                    renderItem={item => (<List.Item>
                        <Col span={12}><b>{item.name}</b></Col>
                        <Col span={12}>{item.value}</Col>
                    </List.Item>)}
                />
            </Panel>
        </Collapse>
    );
};

export default MetadataCell;
