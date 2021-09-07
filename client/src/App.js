import React, { useEffect } from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import * as actions from './redux/actions/index';
import './App.css';
import Main from './components/Main/Main';
import Authentication from './components/Authentication/Authentication';

const App = ({isAuthenticated, autoLogin}) => {
  const screenWidth = window.innerWidth
  let routes = (
    <Switch>
      <Route path='/authentication' render={props => <Authentication {...props} />}/>
      <Redirect to='/authentication' />
    </Switch>
  )
  
    useEffect(() => {
      autoLogin();
    }, [])

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

const mapDispatch = dispatch => {
  return {
    autoLogin: () => dispatch(actions.autoSignIn())
  }
}

export default withRouter(connect(mapState, mapDispatch)(App));
