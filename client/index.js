import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, push } from 'react-router-redux'
import thunk from 'redux-thunk'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import * as reducers from './reducers'

import Home from './containers/home'
import Main from './containers/main'
import Styles from './containers/styles'
import Signup from './components/signup'

import './styles/scss/main.scss';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore)


const store = finalCreateStore(reducer)
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Home} >
          <IndexRoute component={Main}/>
          <Route path="styles" component={Styles}/>
          <Route path="signup" component={Signup}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

//      <DevTools />