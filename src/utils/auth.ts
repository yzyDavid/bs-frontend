import { httpMethod } from '../types/httpMethods';
import { getAuthTokenFromLocalStorage } from './localStorage';
import { apiBaseUrl, sessionStorageKey } from '../configs/config';

// TODO
const isAuthed = () => {
    const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
    return values.token !== '' && values.token !== null && values.token !== undefined;
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
