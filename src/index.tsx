import dva, {connect} from 'dva';
import {browserHistory} from 'dva/router';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const app = dva({
    history: browserHistory
});

app.start('#root');

registerServiceWorker();
