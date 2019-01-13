import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const AuthContext = React.createContext();

class AuthenticateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: undefined,
      userFirstName: undefined,
      userLastName: undefined
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('stylistToken');

    if(!token) {
      this.props.history.push('/login');
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if(currentTime > decodedToken.exp) {
        localStorage.removeItem('stylistToken');
        this.props.history.push('/login');
      } else {
        this.setState({
          userId: decodedToken.id,
          userFirstName: decodedToken.firstName,
          userLastName: decodedToken.lastName
        });
      }
    }
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}

export default withRouter(AuthenticateUser);