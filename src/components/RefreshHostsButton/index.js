import React from 'react';
import { Button } from 'antd';
import './index.less';

const RefreshHostsButton = ({ invalidated, refresh }) => <Button
    type="primary"
    className="refresh-hosts-button"
    disabled={invalidated}
    onClick={refresh}
>Odśwież listę hostów</Button>

export default RefreshHostsButton;
