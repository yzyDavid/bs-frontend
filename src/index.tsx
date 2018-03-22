import dva, {connect} from 'dva';
import * as React from 'react';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const app = dva();

registerServiceWorker();
