import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from '@/serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

render(<div>Welcome to PWA</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

if (!serviceWorker.isLocalhost) {
  serviceWorker.register();
}
