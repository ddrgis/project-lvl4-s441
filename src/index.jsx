import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';

import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const { channels } = gon;
ReactDOM.render(<App channels={channels} />, document.getElementById('root'));
