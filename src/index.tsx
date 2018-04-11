import dva, { connect } from 'dva';
import { browserHistory, Router, Route, Switch } from 'dva/router';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/login';
import LoginPageComponent from './components/LoginPageComponent';

const app = dva({
    history: browserHistory
});

app.model(LoginModel);

const LoginPage = connect(state => {})(LoginPageComponent);

app.router(({ history }) => (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={LoginPage} />
        </Switch>
    </Router>
));

app.start('#root');

registerServiceWorker();
