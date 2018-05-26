import { httpMethod } from '../types/httpMethods';
import { getAuthTokenFromLocalStorage } from './localStorage';
import { apiBaseUrl } from '../configs/config';

// TODO
const isAuthed = () => true;

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
