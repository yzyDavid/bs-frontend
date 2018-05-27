import { authFetch } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

const StudyModel = {
    namespace: 'study',
    state: {
        word: 'Fuck',
        meaning: 'here is the meaning of the word above.',
        todays: []  // TODO
    },
    effects: {
        * getTodayWords(payload: null | undefined, { call, put }) {
            const response = yield call(authFetch, 'study/today', 'GET', null);
            if (response.status !== 200) {
                message.error('发生错误，请重新登录');
                yield put(routerRedux.push('/'));
            }
            const body = yield call(response.json.bind(response));
            console.log(body);
            // TODO
        }
    },
    reducers: {
        forget() { },
        recall() { }
    }
};

export default StudyModel;
