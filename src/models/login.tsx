export interface LoginState {
    token: string;
    email: string;
    name: string;
};

export interface ILoginModel {
    state: LoginState;
};

const LoginModel = {
    namespace: 'login',
    state: {
        token: '',
        email: '',
        name: 'Guest'
    },
    reducers: {}
};

export default LoginModel;
