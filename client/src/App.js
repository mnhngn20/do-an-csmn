import React from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import SignUp from './components/Authentication/SignUp/SignUp';
// import Login from './components/Authentication/Login/Login'; 
import Layout from './layout/Layout';

import './App.css';
import Main from './components/Main/Main';

let routes = (
  <Switch>
    <Route path='/signup' component={SignUp}/>
    {/* <Route path='/login' component={Login}/> */}
    <Route path='/' component={Main}/>
    <Redirect to='/' />
  </Switch>
)


const App = (props) => {
  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default withRouter(App);
