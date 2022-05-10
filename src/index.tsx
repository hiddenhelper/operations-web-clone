import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';

import { ENV } from './constants';
import { AuthService } from './modules/services/AuthService';
import registerServiceWorker from './registerServiceWorker';
import AppRoot from './modules/AppRoot';

import './assets/styles/reset.css';

TagManager.initialize(ENV.GOOGLE_TAG_MANAGER);
AuthService.configure();
ReactDOM.render(<AppRoot />, document.getElementById('root'));
registerServiceWorker();
