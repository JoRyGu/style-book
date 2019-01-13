import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/SignIn/Login';
import AuthenticateUser from './components/Authentication/AuthenticateUser';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    }
  }

  render() {
    return (
      <Router className="App">
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/login" component={ Login } />
          <Route path="/signup" component={ Login } />
          <AuthenticateUser>
            <Route path="/dashboard" component={Dashboard} />
          </AuthenticateUser>
        </Switch>
      </Router>
    );
  }
}

export default App;
