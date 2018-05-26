import dva, { connect } from 'dva';
import { Layout } from 'antd';
import { browserHistory, Router, Route, Switch, Redirect } from 'dva/router';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/LoginModel';
import RegisterModel from './models/RegisterModel';
import DashboardModel from './models/DashboardModel';
import StudyModel from './models/StudyModel';
import ManagementModel from './models/ManagementModel';
import AuthRoute from './components/AuthRoute';
import { PublicHeader, PublicFooter } from './components/PublicComponents';
import LoginPageComponent from './components/LoginPageComponent';
import RegisterPageComponent from './components/RegisterPageComponent';
import DashboardPageComponent from './components/DashboardPageComponent';
import ManagementPageComponent from './components/ManagementPageComponent';
import StudyPageComponent from './components/StudyPageComponent';

const { Content } = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(RegisterModel);
app.model(DashboardModel);
app.model(StudyModel);
app.model(ManagementModel);

const LoginPage = connect(state => { return {}; })(LoginPageComponent);
const RegisterPage = connect(state => { return {}; })(RegisterPageComponent);
const DashboardPage = connect(state => { return {
    ...state.dashboard
}; })(DashboardPageComponent);
const ManagementPage = connect(state => { return {}; })(ManagementPageComponent);
const StudyPage = connect(state => {return {}; })(StudyPageComponent);

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
                    <AuthRoute path="/study" component={StudyPage} />
                    <AuthRoute path="/management" component={ManagementPage} />
                </Switch>
            </Content>
            <PublicFooter />
        </Layout>
    </Router>
));

app.start('#root');

registerServiceWorker();
