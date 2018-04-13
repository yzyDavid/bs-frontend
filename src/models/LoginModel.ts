import { sessionStorageKey } from '../configs/config';
import { LoginFormData } from '../components/LoginForm';
import { authFetch } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export interface LoginState {
    token: string;
    email: string;
    username: string;
};

export interface ILoginModel {
    state: LoginState;
};

const LoginModel = {
    namespace: 'login',
    state: {
        token: '',
        email: '',
        username: 'Guest'
    },
    effects: {
        * login(payload: { payload: LoginFormData }, { call, put }) {
            const msg = payload.payload;
            const response = yield call(authFetch, '/session/login', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('用户名或密码错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({ type: 'updateSession', payload: { email: body.email, username: body.username, token: body.token } });
            message.success('登录成功');
            yield put(routerRedux.push('/dashboard'));
            return;
        }
    },
    reducers: {
        saveSession(state: LoginState): null {
            const { email, token, username } = state;
            const values = JSON.stringify({ email, token, username });
            localStorage.setItem(sessionStorageKey, values);
            return null;
        },
        loadSession(state: LoginState): LoginState {
            const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
            return { ...state, ...values };
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        }
    }
};

export default LoginModel;
