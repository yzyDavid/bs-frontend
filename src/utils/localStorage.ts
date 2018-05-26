// import GlobalState from '../types/globalState';
import {sessionStorageKey} from '../configs/config';

type GlobalState = any;

const saveSession = (state: GlobalState): null => {
    const {uid, token, username} = state;
    const values = JSON.stringify({uid, token, username});
    localStorage.setItem(sessionStorageKey, values);
    return null;
};

const loadSession = (state: GlobalState): GlobalState => {
    const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
    return {...state, ...values};
};

const getAuthTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{"token": ""}').token;
};

export {saveSession, loadSession, getAuthTokenFromLocalStorage};
