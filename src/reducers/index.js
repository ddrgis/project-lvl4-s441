import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import domain from './domain';
import ui from './ui';
import app from './appStateReducer';

export default combineReducers({ domain, ui, app, form: formReducer });