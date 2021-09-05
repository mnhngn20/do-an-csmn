import React, {useEffect} from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'

import Layout from './layout/Layout';

import './App.css';

let routes = (
  <Switch>
    <Route path='/' />
    <Redirect to='/' />
  </Switch>
)


const App = (props) => {
  useEffect(() => {
    setTimeout(function(){
      document.body.className="";
  },500);
    
  }, []);

  return (
    <Layout />
  );
}

export default withRouter(App);
