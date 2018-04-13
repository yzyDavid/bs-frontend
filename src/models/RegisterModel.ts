import { RegisterFormData } from '../components/RegisterForm';
import { authFetch } from '../utils/auth';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

const RegisterModel = {
    namespace: 'register',
    state: {},
    effects: {
        * register(payload: {payload: RegisterFormData}, { call, put }): {} {
            const requestBody = payload.payload;
            const result = yield call(authFetch, '/user', 'PUT', requestBody);
            if (result.status === 400) {
                message.error('注册失败，用户名或邮箱有重复！');
                return;
            }
            if (result.status !== 201) {
                message.error('未知错误！');
                return;
            }
            const jsonBody = yield call(result.text.bind(result));
            const response = JSON.parse(jsonBody);
            message.success('注册成功！');
            yield put(routerRedux.push('/login'));
        }
    },
    reducers: {}
};

export default RegisterModel;
