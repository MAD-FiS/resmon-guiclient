import React from 'react';
import { Select, Input, Button } from 'antd';
const { Option } = Select;

class MetadataFilter extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            value: ''
        };
    }

    onChangeType = (type) => {
        this.setState({
            type
        });
    };

    onChangeValue = (value) => {
        this.setState({
            value
        });
    };

    onClear = () => {
        this.setState({
            type: null,
            value: ''
        });
        this.props.onClear();
    };

    onSelect = () => {
        this.props.onSelect(this.state.type, this.state.value);
    };

    componentDidMount() {
        window.addEventListener('click', this.props.onDismiss);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.props.onDismiss);
    }

    render() {
        const { metadata } = this.props;
        return (
            <div className="metadata-filter-select" onClick={e => e.stopPropagation()}>
                <Select
                    showSearch={true}
                    placeholder="Wybierz metadane"
                    optionFilterProp="children"
                    onChange={this.onChangeType}
                    value={this.state.type}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {Object.entries(metadata).map(([id, singleMetadata]) => <Option key={id}>{singleMetadata.name}</Option>)}
                </Select>
                <Input onChange={(e) => this.onChangeValue(e.target.value)} onPressEnter={this.onSelect} placeholder="Podaj szukaną wartość" />
                <Button type="primary" onClick={this.onSelect}>Wybierz</Button>
                {
                    this.props.filtered ? <Button type="default" onClick={this.onClear}>Wyczyść</Button> : null
                }
            </div>
        );
    }
}

export default MetadataFilter;
