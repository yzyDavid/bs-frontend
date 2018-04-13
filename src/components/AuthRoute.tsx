import * as React from 'react';
import { Component } from 'react';
import { Route, Redirect } from 'dva/router';
import { isAuthed } from '../utils/auth';

interface AuthRouteProps {
    component: any,
    path: string,
    exact?: boolean
}

export default class AuthRoute extends Component<AuthRouteProps> {
    render(): any {
        const Component = this.props.component;
        return (
            <Route
                path={this.props.path}
                exact={this.props.exact || false}
                render={(props) =>
                    isAuthed() ? (
                        <div><Component {...props} /></div>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        )
    }
}

export { AuthRouteProps };
