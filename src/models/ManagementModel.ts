import { authFetch, checkAuthedOrLogout } from '../utils/auth';
import { message } from 'antd';
import { ManagementState, Wordbook } from '../types/entities';

const ManagementModel = {
    namespace: 'management',
    state: {
        myWords: [],
        wordbooks: []
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
        getWords(payload: undefined, { call, put }) {
        }
    },
    reducers: {
        setWordbooks(state: ManagementState, payload: {payload: Wordbook[]}): ManagementState {
            return { ...state, wordbooks: payload.payload };
        }
    }
};

export default ManagementModel;
