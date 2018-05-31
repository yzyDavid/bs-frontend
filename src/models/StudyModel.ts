import { authFetch, checkAuthedOrLogout } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { StudyState, Word } from '../types/entities';

/**
 * the state of StudyModel:
 * todays holds all words should be studied today.
 * no matter if it is recited by user.
 * 
 * server side only record if a word is finished, only client keeps how many times 
 * should a word recalled, according to how many times the user `forget` the word.
 */

const StudyModel = {
    namespace: 'study',
    state: {
        word: 'Fuck',
        meaning: 'here is the meaning of the word above.',
        todays: [],
        showMeaning: false,
        buttonEnabled: true  // TODO: binding this.
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
            yield checkAuthedOrLogout(response, put);

            const { words } = body;
            yield put({ type: 'setTodays', payload: words });
        },
        /**
         * network request only.
         * @param payload 
         * @param saga_params 
         */
        * finishCurrentWord(payload: null | undefined, { call, put, select }) {
            const curWord = yield select(state => state.study.word);
            const response = yield call(authFetch, '/study/finish_word', 'POST', { curWord });
            if (response.status !== 200) {
                message.error(`发生错误，记录已学习单词 ${curWord} 状态失败`);
                return;
            }
            yield checkAuthedOrLogout(response, put);
            // TODO: update to study list.
        },
        // user recognize the word.
        * recall(payload: null | undefined, { put, select }) {
            yield put({type: 'minusOne'});
            const curWord = yield select(state => state.study.word);
            const todays = yield select(state => state.study.todays);
            // assume only one `word` matches current word must exist in todays list.
            const remains = todays.filter(w => w.word === curWord)[0].remainTimes;
            if (remains === 0) {
                yield put({type: 'finishCurrentWord'});
            }
            yield put({type: 'switchWord'});
        },
        * forget(payload: null | undefined, { put }) {
            yield put({type: 'plusOne'});
            yield put({type: 'switchWord'});
        }
    },
    reducers: {
        switchWord(state: StudyState): StudyState | null {
            const words = state.todays.filter(word => (word.remainTimes || 0) > 0);
            const len = words.length;
            let idx: number = parseInt(<any>(Math.random() * len));
            if (idx === 0) {
                return null;
            }
            if (len > 1 && words[idx].word === state.word) {
                idx = (idx + 1) % len;
            }
            const w = words[idx];
            return { ...state, word: w.word, meaning: w.meaning, showMeaning: false };
        },
        setTodays(state: StudyState, payload: {payload: Word[]}): StudyState {
            const wordsList = payload.payload.map(word => { return { ...word, remainTimes: 1 }; });
            console.log(wordsList);
            return { ...state, todays: wordsList };
        },
        minusOne(state: StudyState): StudyState {
            const modified = state.todays
                .map(w => { return w.word === state.word ? { ...w, remainTimes: Math.max((w.remainTimes || 0) - 1, 0) } : w; });
            return { ...state, todays: modified };
        },
        plusOne(state: StudyState): StudyState {
            const modified = state.todays
                .map(w => { return w.word === state.word ? { ...w, remainTimes: Math.max((w.remainTimes || 0) + 1, 0) } : w; });
            return { ...state, todays: modified };
        }
    }
};

export default StudyModel;
