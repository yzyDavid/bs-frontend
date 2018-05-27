import { authFetch } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { StudyState, Word } from '../types/entities';

const StudyModel = {
    namespace: 'study',
    state: {
        word: 'Fuck',
        meaning: 'here is the meaning of the word above.',
        todays: []
    },
    effects: {
        * getTodayWords(payload: null | undefined, { call, put }) {
            const response = yield call(authFetch, '/study/today', 'GET', null);
            if (response.status !== 200) {
                message.error('发生错误，请重新登录');
                yield put(routerRedux.push('/'));
            }
            const bodyText = yield call(response.text.bind(response));
            const body = JSON.parse(bodyText);
            console.log(body);
            const { words } = body;
            yield put({ type: 'setTodays', payload: words });
        },
        * finishCurrentWord(payload: null | undefined, { call, put, select }) {
            const curWord = yield select(state => state.study.word);
            const response = yield call(authFetch, '/study/finish_word', 'POST', { curWord });
            if (response.status !== 200) {
                message.error(`发生错误，记录已学习单词 ${curWord} 状态失败`);
                return;
            }
            // TODO: update to study list.
        },
        // user recognize the word.
        recall(payload: null | undefined, { }) { },
    },
    reducers: {
        forget() { },
        switchWord(state: StudyState): StudyState {
            message.info('switchWord');
            //TODO: implement
            return { ...state };
        },
        setTodays(state: StudyState, words: Word[]): StudyState {
            return { ...state, todays: words };
        }
    }
};

export default StudyModel;
