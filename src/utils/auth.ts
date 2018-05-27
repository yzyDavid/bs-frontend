import { httpMethod } from '../types/httpMethods';
import { getAuthTokenFromLocalStorage } from './localStorage';
import { apiBaseUrl, sessionStorageKey } from '../configs/config';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

// TODO:
const isAuthed = () => {
    const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
    return values.token !== '' && values.token !== null && values.token !== undefined;
};

const checkAuthedOrLogout = function* (response: Response, put: any) {
    if (response.status !== 401) {
        return;
    }
    message.error('登录状态失效，请重新登录');
    yield put({ type: 'login/updateSession', payload: { token: '', email: '', username: 'Guest' } });
    yield put({ type: 'login/saveSession' });
    yield put(routerRedux.push('/'));
};

const authFetch = (url: string, method: httpMethod, body: object | null): Promise<Response> => {
    const authToken = getAuthTokenFromLocalStorage();
    // should HEAD method with a body?
    const fetchBody: any = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': authToken
        }
    }
    if (method !== 'GET' && method !== 'HEAD') {
        fetchBody.body = JSON.stringify(body); 
    }
    return fetch(apiBaseUrl + url, fetchBody);
};

export { isAuthed, authFetch };
