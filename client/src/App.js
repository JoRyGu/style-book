import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/SignIn/Login';
import AuthenticateUser, { AuthContext } from './components/Authentication/AuthenticateUser';
import Dashboard from './components/Dashboard/Dashboard';
import Client from './components/Client/Client';
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
          <Redirect exact from="/" to="/app/dashboard" />
          <Route path="/app/login" component={ Login } />
          <Route path="/app/signup" component={ Login } />
          <AuthenticateUser>
            <Route path="/app/dashboard" component={ Dashboard } />
            <Route path="/app/clients" 
                   render={() => 
                   <AuthContext.Consumer>
                     {context => <Client context={context} />}
                   </AuthContext.Consumer> } />
          </AuthenticateUser>
        </Switch>
      </Router>
    );
  }
}

export default App;
