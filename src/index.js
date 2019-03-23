import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import store from './store';
import './index.css';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

function render() {

  ReactDOM.render(
    <Provider store={store}>
      <App/>,
    </Provider>,
    document.getElementById('root')
  );

}

store.subscribe(render);
render();

registerServiceWorker();
