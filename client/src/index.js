import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk';
//route
import { BrowserRouter } from 'react-router-dom'

const rootReducer = combineReducers({

});

const composeEnhancers = process.env.NODE_ENV === 'development'  
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();
