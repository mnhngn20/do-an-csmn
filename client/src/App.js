import React from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import SignUp from './components/Authentication/SignUp/SignUp';
// import Login from './components/Authentication/Login/Login'; 
import Layout from './layout/Layout';

import './App.css';
import Main from './components/Main/Main';
import Login from './components/Authentication/Login/Login';

const App = ({isAuthenticated}) => {
  const screenWidth = window.innerWidth
  let routes = (
    <Switch>
      <Route path='/signup' render={props => <SignUp {...props} />}/>
      {screenWidth > 900 ? null :<Route path='/login' render={props => <Login {...props} />}/>}
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
