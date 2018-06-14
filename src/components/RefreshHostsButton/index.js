import React from 'react';
import { Button, Icon } from 'antd';
import './index.less';

const RefreshHostsButton = ({ invalidated, refresh }) => <Button
    type="primary"
    className="refresh-hosts-button"
    disabled={invalidated}
    onClick={refresh}
><Icon type="reload" />Odśwież listę hostów</Button>;

export default RefreshHostsButton;
