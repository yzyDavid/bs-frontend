import * as React from 'react';
import { Component } from 'react';
import { Route, Redirect } from 'dva/router';
import { isAuthed } from '../utils/auth';

interface AuthRouteProps {
    component: any
}

export default class AuthRoute extends Component<AuthRouteProps> {
    render(): any {
        const Component = this.props.component;
        return (
            <Route
                render={(props) =>
                    isAuthed() ? (
                        <div><Component {...props} /></div>
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
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
