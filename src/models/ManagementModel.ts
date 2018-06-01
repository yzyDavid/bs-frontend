import { authFetch, checkAuthedOrLogout } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { ManagementState, Wordbook, Word } from '../types/entities';

const ManagementModel = {
    namespace: 'management',
    state: {
        myWords: [],
        wordbooks: [],
        loading: true
    },
    effects: {
        * getWordbooks(payload: null | undefined, { call, put }) {
            const response = yield call(authFetch, '/wordbook/all', 'GET');
            yield checkAuthedOrLogout(response, put);
            const bodyText = yield call(response.text.bind(response));
            const body = JSON.parse(bodyText);
            const { wordbooks } = body;
            yield put({type: 'setWordbooks', payload: wordbooks});
        },
        * getWords(payload: undefined, { call, put }) {
            const response = yield call(authFetch, '/word/my', 'GET');
            yield checkAuthedOrLogout(response, put);
            const bodyText = yield call(response.text.bind(response));
            const body = JSON.parse(bodyText);
            const { words } = body;
            yield put({type: 'setWords', payload: words});
        },
        * addWordbookToStudy(payload: { payload: { wordbook: string } }, { call, put }) {
            const response = yield call(authFetch, '/study/wordbook', 'PUT', payload.payload);
            yield checkAuthedOrLogout(response, put);
            yield put({ type: 'setLoading' });
            yield put({ type: 'getWords' });
            yield put({ type: 'getWordbooks' });
        },
        * jumpToMe(payload: undefined, { put }) {
            yield put(routerRedux.push('/management'));
        }
    },
    reducers: {
        setWordbooks(state: ManagementState, payload: {payload: Wordbook[]}): ManagementState {
            return { ...state, wordbooks: payload.payload };
        },
        setWords(state: ManagementState, payload: {payload: Word[]}): ManagementState {
            console.log(payload.payload);
            return { ...state, myWords: payload.payload, loading: false };
        },
        setLoading(state: ManagementState): ManagementState {
            return { ...state, loading: true };
        }
    }
};

export default ManagementModel;
