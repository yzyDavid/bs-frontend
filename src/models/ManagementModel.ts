import { authFetch, checkAuthedOrLogout } from '../utils/auth';
import { message } from 'antd';

const ManagementModel = {
    namespace: 'management',
    state: {
        myWords: [],
        wordbooks: []
    },
    effects: {
        * getWordbooks(payload: null | undefined, { call }) {
            const response = yield call(authFetch, '/wordbook/all', 'GET');
            // TODO:
        }
    },
    reducers: {
        setWordbooks(state) {
            // TODO:
            return null;
        }
    }
};

export default ManagementModel;
