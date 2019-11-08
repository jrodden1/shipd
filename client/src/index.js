import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; //not sure I need this line
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

import { Container } from 'react-bootstrap'

//A helpful link on making Thunk and Redux Dev Tools work:
//https://medium.com/@e_himmelfarb/implement-redux-devtools-extension-with-thunk-and-other-async-middleware-20e97100b2b0
const store = createStore(
   rootReducer,
   compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )
)


ReactDOM.render(
   <Provider store={store}>
         <App />
   </Provider>,
   document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
