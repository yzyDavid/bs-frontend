import dva, { connect } from 'dva';
import { browserHistory, Router, Route, Switch, Redirect } from 'dva/router';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/LoginModel';
import RegisterModel from './models/RegisterModel';
import DashboardModel from './models/DashboardModel';
import AuthRoute from './components/AuthRoute';
import LoginPageComponent from './components/LoginPageComponent';
import RegisterPageComponent from './components/RegisterPageComponent';
import DashboardPageComponent from './components/DashboardPageComponent';
import { PublicHeader, PublicFooter } from './components/PublicComponents';
import { Layout } from 'antd';

const { Content } = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(RegisterModel);
app.model(DashboardModel);

const LoginPage = connect(state => { })(LoginPageComponent);
const RegisterPage = connect(state => { })(RegisterPageComponent);
const DashboardPage = connect(state => { })(DashboardPageComponent);

app.router(({ history }) => (
    <Router history={history}>
        <Layout style={{ minHeight: '600px' }}>
            <PublicHeader />
            <Content style={{ minHeight: '100%' }}>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/login" />} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <AuthRoute path="/dashboard" component={DashboardPage} />
                </Switch>
            </Content>
            <PublicFooter />
        </Layout>
    </Router>
));

app.start('#root');

registerServiceWorker();
