import React from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import SignUp from './components/Authentication/SignUp/SignUp';
// import Login from './components/Authentication/Login/Login'; 
import Layout from './layout/Layout';

import './App.css';
import Main from './components/Main/Main';

const App = ({isAuthenticated}) => {
  let routes = (
    <Switch>
      <Route path='/signup' render={props => <SignUp {...props} />}/>
      <Redirect to='/signup' />
    </Switch>
  )
  
  if(isAuthenticated){
    routes = (
      <Switch>
        <Route path='/' component={Main}/>
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <Layout>
      {routes}
    </Layout>
  );
}

const mapState = state => {
  return {
    isAuthenticated: state.authReducer.isAuth
  }
}

export default withRouter(connect(mapState)(App));
