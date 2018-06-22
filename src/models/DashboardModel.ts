import { routerRedux } from 'dva/router';
import { authFetch, checkAuthedOrLogout } from '../utils/auth';
import { DashboardState } from '../types/entities';

const DashboardModel = {
    namespace: 'dashboard',
    state: {
        recordDays: 0,
        todayToStudy: 0,
        totalStudied: 0,
        totalToStudy: 0,
        totalWords: 0
    },
    effects: {
        * jumpToMe(payload: undefined, { put }) {
            yield put(routerRedux.push('/dashboard'));
        },
        * getStats(payload: undefined, { call, put }) {
            const response = yield call(authFetch, '/study/stats', 'GET');
            yield checkAuthedOrLogout(response, put);
            const bodyText = yield call(response.text.bind(response));
            const body = JSON.parse(bodyText);
            const updates: DashboardState = {
                recordDays: body.recordDays,
                todayToStudy: body.todayToStudyWords,
                totalStudied: body.studiedWords,
                totalToStudy: body.toStudyWords,
                totalWords: body.totalWords
            };
            yield put({ type: 'setStats', payload: updates });
        }
    },
    reducers: {
        setStats(state: DashboardState, payload: { payload: DashboardState }): DashboardState {
            return { ...state, ...payload.payload };
        }
    }
};

export default DashboardModel;
