import React from 'react';
import EditableCell from '../EditableTable/EditableCell';
import './index.less'

class AuthServer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            authServer: this.props.authServer
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.props.authServer !== newProps.authServer) {
            this.setState({ authServer: newProps.authServer });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.editMode && !prevState.editMode) {
            this.refs.root.getElementsByTagName('input')[0].focus();
        }
    }

    onEditStart = () => {
        this.setState({ editMode: true });
    }

    onEditCancel = () => {
        this.setState({ editMode: false, authServer: this.props.authServer });
    }

    onHandleChange = (a, b, authServer) => {
        this.setState({ authServer });
    }

    onSave = () => {
        this.props.changeAuthServer(this.state.authServer);
        this.setState({ editMode: false });
    }

    render() {
        const { authServer, editMode } = this.state;
        return (
            <div className="auth-server" ref="root">
                <span>Server autoryzacyjny:&nbsp;</span>
                <EditableCell
                    value={authServer}
                    editable={true}
                    onHandleChange={this.onHandleChange}
                    editMode={editMode}
                    onEditStart={this.onEditStart}
                    onEditCancel={this.onEditCancel}
                    onSave={this.onSave}
                />
            </div>
        );
    }

}

export default AuthServer;
