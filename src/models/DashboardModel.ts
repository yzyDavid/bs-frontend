import { routerRedux } from 'dva/router';

const DashboardModel = {
    namespace: 'dashboard',
    state: {
        recordDays: 42,
        todayToStudy: 23,
        totalStudied: 233
    },
    effects: {
        * jumpToMe(payload: undefined, { put }) {
            yield put(routerRedux.push('/dashboard'));
        }
    },
    reducers: {}
};

export default DashboardModel;
