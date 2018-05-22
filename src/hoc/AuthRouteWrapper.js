import React from 'react';
import { connect } from 'react-redux';
import { isAuthTokenSet } from '../reducers';

const mapStateToProps = (state) => ({
    tokenSet: isAuthTokenSet(state)
});

const mapDispatchToProps = ({});

const withAuth = (component) => connect(mapStateToProps, mapDispatchToProps)(

    class AuthRouteWrapper extends React.PureComponent {

        render() {
            const { tokenSet } = this.props;
            return tokenSet ? React.createElement(component) : (
                <div>
                    <h1>Trwa przywracanie sesji...</h1>
                </div>
            );
        }

    }

);

export default withAuth;